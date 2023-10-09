import { Injectable } from '@angular/core';
import { VaccinationCenter } from './vaccination-center';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VaccinationService {
  
  constructor(private HttpClient: HttpClient) { }

  getAllVaccinationCenter() : Observable<VaccinationCenter[]>{
    return this.HttpClient.get<VaccinationCenter[]>("/api/center/");
  }

  getVaccinationCenterById(id :Number) : Observable<VaccinationCenter>{
    return this.HttpClient.get<VaccinationCenter>("api/center/"+id);
  }

  getVaccinationCenterByName(name :String) : Observable<VaccinationCenter>{
    return this.HttpClient.get<VaccinationCenter>("api/center/"+name);
  }

  /*
  createBooking(book: Booking): Observable<Booking>{
    return this.HttpClient.post("api/public/booking",book);
  }*/
}
