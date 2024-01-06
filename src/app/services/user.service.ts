import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrladmin = "/api/admin/user";
  private apiUrlsuperadmin = "/api/superadmin/user";
  private apiUrldoctor = "/api/doctor/user";

  
  constructor(private http: HttpClient) { }

  // Obtenir tous les Users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrlsuperadmin}/all`, {
      withCredentials: true,
      responseType: 'json'
    });
  }
  

  // Obtenir un utilisateur par son id
  getUserById(idUser :Number) : Observable<User | undefined>{
    return this.http.get<User>(`${this.apiUrldoctor}/id/${idUser}`, {
      withCredentials: true,
      responseType: 'json'
    });
  }

  // Obtenir tous les utilisateurs par rôle
  getAllUsersByRole(role :String) : Observable<User[] | undefined>{
    return this.http.get<User[]>(`${this.apiUrladmin}/role/${role}`, {
      withCredentials: true,
      responseType: 'json'
    });
  }

  // Obtenir tous les utilisateurs par role et par nom du centre
  getAllUsersByRoleAndCenter(role :String, idCenter :Number) : Observable<User[] | undefined>{
    return this.http.get<User[]>(`${this.apiUrladmin}/role/${role}/${idCenter}`, {
      withCredentials: true,
      responseType: 'json'
    });
  }

  // Supprimer un utilisateur par son id s'il existe
  deleteUserById(idUser :Number) : Observable<boolean>{
    return this.http.delete<boolean>(`${this.apiUrladmin}/delete/${idUser}`, {
      withCredentials: true,
      responseType: 'json'
    });
  }

  // Supprimer le centre de vaccination d'un utilisateur
  deleteCenterToUser(idUser: number): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrladmin}/deletecenter/${idUser}`,null, {
      withCredentials: true,
      responseType: 'json'
    });
  }

  // Ajouter un utilisateur DOCTEUR
  addUserDoctor(user: User): Observable<User | undefined> {
    return this.http.post<User>(`${this.apiUrladmin}/register`, user, {
      withCredentials: true,
      responseType: 'json'
    });
  }

  // Ajouter un utilisateur configuré
  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrlsuperadmin}/register`, user, {
      withCredentials: true,
      responseType: 'json'
    });
  }

  // Modifier un utilisateur
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrladmin}/update`, user, {
      withCredentials: true,
      responseType: 'json'
    });
  }
}
