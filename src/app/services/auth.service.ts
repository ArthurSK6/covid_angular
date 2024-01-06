import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "../model/user.model";
import { StorageService } from "./storage.service";
import { Router } from "@angular/router";
import { UserService } from '../services/user.service';

export interface AuthResponseData {
  id : number,
  email : string,
  roles : string[],
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  utilisateur: User = {
    id: 0,
    nom: '',
    prenom: '',
    email: '',
    password: '',
    role: '',
    vaccinationCenter: null
  };

  AuthenticatedUser$  = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private userService: UserService
  ) { }

  login(email : string, password: string) {
    return this.http.request<AuthResponseData>('post','http://localhost:8081/api/public/user/authenticate',
      {
        body : {email, password},
        withCredentials : true
      }).pipe(
        catchError(err => {
          console.log(err);
          let errorMessage = 'Une erreure est survenue!';
          if(err.error.message === 'Bad credentials') {
            errorMessage = 'Adresse mail ou mot de passe incorrect'
          }
            return throwError(() =>  new Error(errorMessage))
        }),
        tap(
          user => {
            this.userService.getUserById(user.id).subscribe(resultUser => {
              if(resultUser) {
                this.utilisateur = resultUser;
              }
            }); 
            const extractedUser : User = {
              email: user.email,
              id: user.id,
              nom: this.utilisateur.nom,
              prenom: this.utilisateur.prenom,
              password: this.utilisateur.password,
              vaccinationCenter: this.utilisateur.vaccinationCenter,
              role : user.roles.find(role => role.includes('ROLE')) || '',
            }
            this.storageService.saveUser(extractedUser);
            this.AuthenticatedUser$.next(extractedUser);
          }
        )
      );
  }

  autoLogin() {
    const userData = this.storageService.getSavedUser();
    if (!userData) {
      return;
    }
    this.AuthenticatedUser$.next(userData);
  }

  logout(){
    this.http.request('post','http://localhost:8081/api/doctor/user/logout',{
      withCredentials: true
    }).subscribe({
      next: () => {
        this.storageService.clean();
        this.AuthenticatedUser$.next(null);
        location.reload();
      }
    })
  }

  refreshToken(){
    return this.http.request('post', 'http://localhost:8081/api/public/user/refresh-token-cookie', {
      withCredentials: true
    })
  }
}
