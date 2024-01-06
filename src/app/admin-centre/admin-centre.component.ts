import { Component } from '@angular/core';
import { VaccinationService } from '../services/vaccination.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VaccinationCenter } from '../model/vaccination-center.model';
import { User } from '../model/user.model';
import { AuthService } from "../services/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-admin-centre',
  templateUrl: './admin-centre.component.html',
  styleUrls: ['./admin-centre.component.scss']
})
export class AdminCentreComponent {

  AuthUserSub! : Subscription;
  idUserCenter?: number;
  idUser?: number;

  // On crée un centre de vaccination vide
  vaccinationCenter: VaccinationCenter = {
    id: undefined,
    name: '',
    address: '',
    postalCode: '',
    city: '',
    users: [],
    rdv: [],
  };

  docUsersCenter?: User[];

  docUsers?: User[];
  idUserToAdd?: number;

  constructor(
    private vaccinationService: VaccinationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authService : AuthService
    ) { }
  
  ngOnInit(): void {
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

            if (this.idUserCenter) {
              // Récupération d'un centre par son id
              this.vaccinationService.getVaccinationCenterById(this.idUserCenter).subscribe(resultCenter => {
                if(resultCenter) {
                  this.vaccinationCenter = resultCenter;
                }
              }); 

              // Récupération des utilisateurs par role 'ROLE_DOCTOR' pour le centre de vaccination selectionné
              this.userService.getAllUsersByRoleAndCenter('DOCTOR',this.idUserCenter).subscribe(resultUsers => {this.docUsersCenter = resultUsers;});

              // Récupération de tous les utilisateurs par role 'ROLE_DOCTOR'
              this.userService.getAllUsersByRole('DOCTOR').subscribe(resultUsers => {this.docUsers = resultUsers;});
            }
          }); 
        }  
      }     
    });
  }

  // Ajout d'un utilisateur au centre de vaccination
  addUserToCenter(): void {
    if (this.idUserCenter && this.idUserToAdd) {
      this.vaccinationService.linkUserToCenter(this.idUserToAdd, this.idUserCenter).subscribe(result => {
        location.reload();
      });    
    }
  }

  // Créer un nouvel utilisateur 
  addUser(): void {
    const url = "admin/user/0";
    this.router.navigate([url]);
  }
}
