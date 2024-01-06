import { Injectable } from '@angular/core';
import { Rdv } from '../model/rdv.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RdvService {

  private apiUrlpublic = "/api/public/rdv";
  private apiUrldoctor = "/api/doctor/rdv";
  
  constructor(private http: HttpClient) { }

  // Obtenir tous les rendez-vous d'un centre pour une date précise
  getAllRdvByCenterAndDate(date: string, idCenter: number): Observable<Rdv[] | undefined> {
    const params = new HttpParams()
    .set('date', date.toString())
    .set('idCenter', idCenter.toString());
    return this.http.get<Rdv[]>(`${this.apiUrldoctor}/date`, { params, withCredentials: true, responseType: 'json' });
  }
    
  // Obtenir un rendez-vous par son id
  getRdvById(id :Number) : Observable<Rdv | undefined>{
    return this.http.get<Rdv>(`${this.apiUrldoctor}/id/${id}`, {
      withCredentials: true,
      responseType: 'json'
    });
  }

  // Valider un rendez-vous en le mettant vacciné
  validateRdvByID(id :Number) : Observable<Rdv | undefined>{
    return this.http.put<Rdv>(`${this.apiUrldoctor}/validate/${id}`, null, {
      withCredentials: true,
      responseType: 'json'
    });
  }

  // Supprimer un rendez-vous par son id s'il existe
  deleteRdvById(id :Number) : Observable<Rdv | undefined>{
    return this.http.delete<Rdv>(`${this.apiUrldoctor}/delete/${id}`, {
      withCredentials: true,
      responseType: 'json'
    });
  }
  
  // Ajouter un rendez-vous
  addRdv(rdv: Rdv, idCenter: number ): Observable<Rdv> {
    const params = new HttpParams()
    .set('idCenter', idCenter.toString());
    return this.http.post<Rdv>(`${this.apiUrlpublic}/add`, rdv, { params, withCredentials: true, responseType: 'json' });
  }
}
