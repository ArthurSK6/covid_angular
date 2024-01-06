import { Component } from '@angular/core';
import { VaccinationCenter } from '../model/vaccination-center.model';
import { VaccinationService } from '../services/vaccination.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-super-admin-centres',
  templateUrl: './super-admin-centres.component.html',
  styleUrls: ['./super-admin-centres.component.scss']
})
export class SuperAdminCentresComponent {

  centers!: VaccinationCenter[];
  selected?: VaccinationCenter;
  citySearch: string = "";

  addCenteStat: boolean = false;
  modifyCenterStat: boolean = false;
  modifyPersonnelStat: boolean = false;

  nbcenters: number = 0;

  idCenter: number = 0;
  name: string = '';
  address: string = '';
  postalCode: string = '';
  city: string = '';

  administators: User[] = [];

  constructor(private service: VaccinationService) { }

  ngOnInit(): void {
    this.service.getAllVaccinationCenters().subscribe(resultCenters => {
      this.centers = resultCenters;
      this.nbcenters = 4 + resultCenters.length*2;
    });
  }

  // Recherche des centres de vaccination par nom, ville ou code postal
  handleSearch(event: VaccinationCenter[]){
    this.centers = event;
  }  
}
