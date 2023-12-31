import { Component } from '@angular/core';
import { VaccinationCenter } from '../model/vaccination-center';
import { User } from '../model/user';
import { ActivatedRoute } from '@angular/router';
import { VaccinationService } from '../services/vaccination.service';

@Component({
  selector: 'app-super-admin-centres',
  templateUrl: './super-admin-centres.component.html',
  styleUrls: ['./super-admin-centres.component.scss']
})
export class SuperAdminCentresComponent {
  centers: VaccinationCenter[] = [];
  newCenter = {name: '', city: '', address: ''};
  selected?: VaccinationCenter;
  searchedCenters: VaccinationCenter[] = [];
  id: string = '';

  admins: User[] = [];
  newAdmin = {login: '', password: '', center_id: 0};
  selectedA?: User;
  searchedAdmins: User[] = [];

  constructor(private service: VaccinationService, 
              private route: ActivatedRoute) {  }

  ngOnInit(): void {
    this.service.getAllVaccinationCenters().subscribe(resultCenters=>{
      this.centers=resultCenters;
    });
    this.id = String(this.route.snapshot.paramMap.get('id'));
  }

  selectCenter(center: VaccinationCenter){
    this.selected=center;
  }

  handleSearch(event: VaccinationCenter[]){
    this.searchedCenters = event;
  }

  addCenter() {
 
  }

  deleteVaccinationCenter(center: VaccinationCenter){
  this.service.deleteVaccinationCenter(center.name).subscribe(response => {
    this.service.getAllVaccinationCenters().subscribe(resultCenters => {
      this.centers = resultCenters;
    })
    console.log('Connexion réussie :', response);
  }, error => {
    // Gérer les erreurs si la connexion échoue
    console.error('Erreur lors de la connexion :', error);
    this.service.getAllVaccinationCenters().subscribe(resultCenters => {
      this.centers = resultCenters;
    })
  });
  }


  selectAdmin(admin: User){
    this.selectedA=admin;
  }

  handleSearchAdmin(event: User[]){
    this.searchedAdmins = event;
  }

  addAdmin() {
   
  }

  deleteAdmin(center: VaccinationCenter){
  this.service.deleteVaccinationCenter(center.name).subscribe(response => {
    this.service.getAllVaccinationCenters().subscribe(resultCenters => {
      this.centers = resultCenters;
    })
    console.log('Connexion réussie :', response);
  }, error => {
    // Gérer les erreurs si la connexion échoue
    console.error('Erreur lors de la connexion :', error);
    this.service.getAllVaccinationCenters().subscribe(resultCenters => {
      this.centers = resultCenters;
    })
  });
  }
}
