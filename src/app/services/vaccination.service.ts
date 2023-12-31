import { Injectable } from '@angular/core';
import { VaccinationCenter } from '../model/vaccination-center';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VaccinationService {

  private apiUrl = "/api/centre";
  
  constructor(private http: HttpClient) { }

  // Récupérer tous les centres
  getAllVaccinationCenters() : Observable<VaccinationCenter[]>{
    return this.http.get<VaccinationCenter[]>(`${this.apiUrl}/all`);
  }

  // Récupérer tous les centres par id
  getVaccinationCenterById(id :Number) : Observable<VaccinationCenter>{
    return this.http.get<VaccinationCenter>(`${this.apiUrl}/id/${id}`);
  }

  // Récupérer tous les centres par nom
  getAllVaccinationCentersByName(name :String) : Observable<VaccinationCenter>{
    return this.http.get<VaccinationCenter>(`${this.apiUrl}/name/${name}`);
  }

  // Récupérer tous les centres par ville
  getAllVaccinationCentersByCity(city: string): Observable<VaccinationCenter[]> {
    return this.http.get<VaccinationCenter[]>(`${this.apiUrl}/city/${city}`);
  }

  // Lier un utilisateur à un centre
  linkUserToCenter(idUser: number, nameCenter: string): Observable<VaccinationCenter> {
    const params = new HttpParams()
      .set('idUser', idUser.toString())
      .set('idCenter', nameCenter.toString());
  
    return this.http.put<VaccinationCenter>(`${this.apiUrl}/utilisateur/add`, null, { params });
  }
  
  // Récupérer tous les utilisateurs d'un centre de vaccination
  getAllUsersByCenter(name: string): Observable<VaccinationCenter> {
    return this.http.get<VaccinationCenter>(`${this.apiUrl}/utilisateur/${name}`);
  }

  // Ajouter un centre
  addVaccinationCenter(center: VaccinationCenter): Observable<VaccinationCenter> {
    return this.http.post<VaccinationCenter>(`${this.apiUrl}/add`, center);
  }

  // Supprimer un centre
  deleteVaccinationCenter(name: string): Observable<VaccinationCenter> {
    return this.http.delete<VaccinationCenter>(`${this.apiUrl}/delete/${name}`);
  }

  /*
  createBooking(book: Booking): Observable<Booking>{
    return this.http.post("api/public/booking",book);
  }*/
}
