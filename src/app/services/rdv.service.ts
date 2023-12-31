import { Injectable } from '@angular/core';
import { Rdv } from '../model/rdv';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RdvService {

  private apiUrl = "/api/rdv";
  
  constructor(private http: HttpClient) { }

  // Obtenir tous les rendez-vous
  getAllRdvs() : Observable<Rdv[]>{
    return this.http.get<Rdv[]>(`${this.apiUrl}/all`);
  }

  // Obtenir un rendez-vous par son id
  getRdvById(id :Number) : Observable<Rdv>{
    return this.http.get<Rdv>(`${this.apiUrl}/id/${id}`);
  }



  
  // Ajouter un rendez-vous
  addRdv(rdv: Rdv): Observable<Rdv> {
    return this.http.post<Rdv>(`${this.apiUrl}/add`, rdv);
  }

  // Supprimer un rendez-vous par son id s'il existe
  deleteRdvById(id :Number) : Observable<Rdv>{
    return this.http.delete<Rdv>(`${this.apiUrl}/delete/${id}`);
  }

}
