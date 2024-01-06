import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../model/user.model';
import { VaccinationCenter } from '../model/vaccination-center.model';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VaccinationService } from '../services/vaccination.service';
import { AuthService } from "../services/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent {

  AuthUserSub! : Subscription;
  idUserCenter?: number;
  idUser?: number;

  user!: User;

  id?: number;
  nom: string = '';
  prenom: string = '';
  email: string = '';
  password: string = '';
  role: string = 'Docteur';
  vaccinationCenter?: VaccinationCenter | null;

  hide = true;  // Permet de masquer le mot de passe

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private vaccinationService: VaccinationService,
    private router: Router,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.AuthUserSub = this.authService.AuthenticatedUser$.subscribe({
      next : user => {
        if(user) {
          this.idUser = user.id;
        }

        if (this.idUser) {
          this.userService.getUserById(this.idUser).subscribe(resultUser => {
            if(resultUser) {          
              this.idUserCenter = resultUser.vaccinationCenter?.id;
            }

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
                }

                // Redirection vers la page des centres si l'utilisateur n'est pas un docteur ou si le centre de vaccination n'est pas le bon
                if (this.vaccinationCenter?.id != this.idUserCenter || this.role != 'Docteur') {
                  this.router.navigate(['center']);
                }
              }); 
            }
          });
        }
      }
    });
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

    if (this.idUserCenter) {
      // Récupération du centre de vaccination
      this.vaccinationService.getVaccinationCenterById(this.idUserCenter).subscribe(resultCenter => {
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
          this.userService.addUserDoctor(formulaire).subscribe(() => {
            this.location.back();
            });
        }
      });
    }
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