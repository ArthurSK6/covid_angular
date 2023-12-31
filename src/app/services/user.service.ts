import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "/api/user";
  
  constructor(private http: HttpClient) { }

  // Obtenir tous les Users
  getAllUsers() : Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/all`);
  }

  // Obtenir un utilisateur par son id
  getUserById(id :Number) : Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/id/${id}`);
  }

  // Obtenir tous les utilisateurs par rôle
  getAllUsersByRole(role :String) : Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/role/${role}`);
  }

  // Supprimer un utilisateur par son id s'il existe
  deleteUserById(id :Number) : Observable<User>{
    return this.http.delete<User>(`${this.apiUrl}/delete/${id}`);
  }

  // Ajouter un utilisateur
  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/add`, user);
  }
}
