import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../model/user.model';
import { VaccinationCenter } from '../model/vaccination-center.model';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VaccinationService } from '../services/vaccination.service';

@Component({
  selector: 'app-super-admin-user',
  templateUrl: './super-admin-user.component.html',
  styleUrls: ['./super-admin-user.component.scss']
})
export class SuperAdminUserComponent implements OnInit{

  user!: User;
  vaccinationCenterList?: VaccinationCenter | null;
  centers?: VaccinationCenter[];

  id?: number;
  nom: string = '';
  prenom: string = '';
  email: string = '';
  password: string = '';
  role?: string;
  vaccinationCenter?: VaccinationCenter | null;
  vaccinationCenterName?: string;

  // Liste des rôles possible
  roles = [
    { name: 'Super Administrateur' },
    { name: 'Administrateur' },
    { name: 'Docteur' },
  ];

  hide = true;  // Permet de masquer le mot de passe

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private vaccinationService: VaccinationService,
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Récupération des centres de vaccination
    this.vaccinationService.getAllVaccinationCenters().subscribe(resultCenters => {
      this.centers = resultCenters;
    });

      // Cas de la modification d'un utilisateur
      /* On met cette partie imbriqué afin que la liste des centres soit chargé
      et que le selecteur de centre mette bien le centre souhaité en sélectionné */
      if (id != 0) {
        // Récupération d'un utilisateur par son id
        this.userService.getUserById(id).subscribe(resultUser => {
          if(resultUser) {
            this.user = resultUser;
            this.id = this.user.id;
            this.nom = this.user.nom;
            this.prenom = this.user.prenom;
            this.email = this.user.email;
            this.role = this.convertRole(this.user.role);
            
            this.vaccinationCenter = this.user.vaccinationCenter;
            this.vaccinationCenterName = this.vaccinationCenter?.name;
          }
        }); 
    }  
  }
  
  // Retour à la page précédente 
  cancel(): void {
    this.location.back();
  }

  // Suppression d'un utilisateur
  supprimer(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id != 0) {
      this.userService.deleteUserById(id).subscribe(() => {
        this.location.back();
      });
    }
  }

  // Enregistrement d'un utilisateur
  enregistrer(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Récupération du centre de vaccination
    this.vaccinationService.getVaccinationCenterByName(this.vaccinationCenterName!).subscribe(resultCenter => {
      if(resultCenter && id!= 0 && this.role!="Super Administrateur") {this.vaccinationCenter = resultCenter;}
      else {this.vaccinationCenter = null;}

      // Créez un objet pour stocker les données du formulaire
      const formulaire = {
        id: this.id,
        nom: this.nom,
        prenom: this.prenom,
        email: this.email,
        password: this.password,
        role: this.convertRole(this.role),
        vaccinationCenter: this.vaccinationCenter,
      };

      // Mise à jour d'un utilisateur exitant
      if (id != 0) {
        this.userService.updateUser(formulaire).subscribe(() => {
          this.location.back();
        });
      }
      // Création d'un nouvel utilisateur
      else {
        this.userService.addUser(formulaire).subscribe(() => {
          this.location.back();
        });
      }
    });
  }

  // Convertir le role dans le bon format en string
  convertRole(role?: string): string {
    if (role === 'SUPERADMIN') {return 'Super Administrateur';}
    else if (role === 'ADMIN') {return 'Administrateur';}
    else if (role === 'DOCTOR') {return 'Docteur';}
    else if (role === 'Super Administrateur') {return 'SUPERADMIN';}
    else if (role === 'Administrateur') {return 'ADMIN';}
    else if (role === 'Docteur') {return 'DOCTOR';}
    else {return '';}
  }
}
