import { Injectable } from '@angular/core';
import { VaccinationCenter } from '../model/vaccination-center.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VaccinationService {

  private apiUrlpublic = "/api/public/centre";
  private apiUrladmin = "/api/admin/centre";
  private apiUrlsuperadmin = "/api/superadmin/centre";
  
  constructor(private http: HttpClient) { }

  // Récupérer tous les centres
  getAllVaccinationCenters() : Observable<VaccinationCenter[]>{
    return this.http.get<VaccinationCenter[]>(`${this.apiUrlpublic}/all`, {
      withCredentials: true,
      responseType: 'json'
    });
  }

  // Récupérer tous les centres par id
  getVaccinationCenterById(id :Number) : Observable<VaccinationCenter | undefined>{
    return this.http.get<VaccinationCenter>(`${this.apiUrlpublic}/id/${id}`, {
      withCredentials: true,
      responseType: 'json'
    });
  }

  // Récupérer tous les centres par nom
  getVaccinationCenterByName(name :String) : Observable<VaccinationCenter | undefined>{
    return this.http.get<VaccinationCenter>(`${this.apiUrlpublic}/name/${name}`, {
      withCredentials: true,
      responseType: 'json'
    });
  }

  // Récupérer tous les centres par ville
  getAllVaccinationCentersByCity(city: string): Observable<VaccinationCenter[] | undefined> {
    return this.http.get<VaccinationCenter[]>(`${this.apiUrlpublic}/city/${city}`, {
      withCredentials: true,
      responseType: 'json'
    });
  }

  // Lier un utilisateur à un centre
  linkUserToCenter(idUser: number, idCenter: number): Observable<boolean> {
    const params = new HttpParams()
      .set('idUser', idUser.toString())
      .set('idCenter', idCenter.toString());
  
    return this.http.put<boolean>(`${this.apiUrladmin}/utilisateur/add`, null, { params, withCredentials: true, responseType: 'json' });
  }
  
  // Récupérer tous les utilisateurs d'un centre de vaccination
  getAllUsersByCenter(name: string): Observable<VaccinationCenter | undefined> {
    return this.http.get<VaccinationCenter>(`${this.apiUrladmin}/utilisateur/${name}`, {
      withCredentials: true,
      responseType: 'json'
    });
  }

  // Ajouter un centre
  addVaccinationCenter(center: VaccinationCenter): Observable<VaccinationCenter> {
    return this.http.post<VaccinationCenter>(`${this.apiUrlsuperadmin}/add`, center, {
      withCredentials: true,
      responseType: 'json'
    });
  }

  // Supprimer un centre
  deleteVaccinationCenter(idCenter : number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrlsuperadmin}/delete/${idCenter}`, {
      withCredentials: true,
      responseType: 'json'
    });
  }

  // Modifier un centre
  updateVaccinationCenter(center: VaccinationCenter): Observable<VaccinationCenter | undefined> {
    return this.http.put<VaccinationCenter>(`${this.apiUrlsuperadmin}/update`, center, {
      withCredentials: true,
      responseType: 'json'
    });
  }
}
