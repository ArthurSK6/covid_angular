import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { VaccinationCenter } from '../model/vaccination-center.model';
import { VaccinationService } from '../services/vaccination.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-super-admin-centre-id',
  templateUrl: './super-admin-centre-id.component.html',
  styleUrls: ['./super-admin-centre-id.component.scss']
})
export class SuperAdminCentreIdComponent implements OnInit{

  // On crée un centre de vaccination vide
  vaccinationCenter: VaccinationCenter = {
    id: undefined,
    name: '',
    address: '',
    postalCode: '',
    city: '',
    users: undefined,
    rdv: undefined,
  };

  adUsersCenter?: User[];
  docUsersCenter?: User[];

  adUsers?: User[];
  docUsers?: User[];
  idUserToAdd?: number;

  constructor(
    private vaccinationService: VaccinationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    ) { }
  
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id != 0) {
      // Récupération d'un utilisateur par son id
      this.vaccinationService.getVaccinationCenterById(id).subscribe(resultCenter => {
        if(resultCenter) {
          this.vaccinationCenter.id = resultCenter.id;
          this.vaccinationCenter.name = resultCenter.name;
          this.vaccinationCenter.address = resultCenter.address;
          this.vaccinationCenter.postalCode = resultCenter.postalCode;
          this.vaccinationCenter.city = resultCenter.city;
        }
      }); 
    }  

    // Récupération des utilisateurs par role 'ROLE_ADMIN' pour le centre de vaccination selectionné
    this.userService.getAllUsersByRoleAndCenter('ADMIN',id).subscribe(resultUsers => {this.adUsersCenter = resultUsers;});

    // Récupération des utilisateurs par role 'ROLE_DOCTOR' pour le centre de vaccination selectionné
    this.userService.getAllUsersByRoleAndCenter('DOCTOR',id).subscribe(resultUsers => {this.docUsersCenter = resultUsers;});

    // Récupération de tous les utilisateurs par role 'ROLE_ADMIN'
    this.userService.getAllUsersByRole('ADMIN').subscribe(resultUsers => {this.adUsers = resultUsers;});

    // Récupération de tous les utilisateurs par role 'ROLE_DOCTOR'
    this.userService.getAllUsersByRole('DOCTOR').subscribe(resultUsers => {this.docUsers = resultUsers;});   
  }

  // Retour à la page précédente 
  cancelOperation(): void {
    this.location.back();
  }

  // Enregistrement d'un centre de vaccination
  enregistrer(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // Modification d'un centre de vaccination
    if (id != 0) {
      this.vaccinationService.updateVaccinationCenter(this.vaccinationCenter).subscribe(() => {
        this.location.back();
      });
    }
    // Création d'un centre de vaccination
    else {
      this.vaccinationService.addVaccinationCenter(this.vaccinationCenter).subscribe(() => {
        this.location.back();
      });
    }
  }

  // Suppression d'un centre de vaccination
  deleteCenter(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id != 0) {
      this.vaccinationService.deleteVaccinationCenter(id).subscribe(() => {
        this.location.back();
      });
    }
  }
  
  // Ajout d'un utilisateur au centre de vaccination
  addUserToCenter(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id != 0 && this.idUserToAdd) {
      this.vaccinationService.linkUserToCenter(this.idUserToAdd, id).subscribe(() => {
        location.reload();
      });
    }
  }
}
