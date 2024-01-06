import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RdvService } from '../services/rdv.service';
import { Rdv } from '../model/rdv.model';
import { VaccinationCenter } from '../model/vaccination-center.model';
import { VaccinationService } from '../services/vaccination.service';
import { AuthService } from "../services/auth.service";
import { Subscription } from "rxjs";
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
})
export class PlanningComponent implements OnInit{

  AuthUserSub! : Subscription;
  idUserCenter?: number;
  idUser?: number;

  rdvList?: Rdv[];
  rdvListEmpty?: Rdv[];
  searchDate: Date = new Date();
  date: Date = new Date();
  searchQuery: string = '';
  vaccinationCenter?: VaccinationCenter | null;

  constructor(
    private rdvService: RdvService,
    private vaccinationService: VaccinationService,
    private authService : AuthService,
    private userService: UserService,
  ) {}

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
              // Récupération des rendez-vous par date
              this.rdvService.getAllRdvByCenterAndDate(this.formatSelectedDate(),this.idUserCenter).subscribe(resultRdv => {this.rdvList = resultRdv;});

              // Récupération du centre de vaccination
              this.vaccinationService.getVaccinationCenterById(this.idUserCenter).subscribe(resultCenter => {
                this.vaccinationCenter = resultCenter;
              });
            }
          });
        }
      }
    });
  }

  // Recherche des rendez-vous par date et par nom ou prénom
  rechercherRdv(): void {
    if (this.idUserCenter) {
      this.rdvService.getAllRdvByCenterAndDate(this.formatSelectedDate(),this.idUserCenter).subscribe(resultRdv => {
        this.rdvList = resultRdv;
        this.rdvList = this.rdvList?.filter(rdv =>
          rdv.prenom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          rdv.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
      this.date = this.searchDate;
    }
  }

  // Validation de la vaccination d'un rendez-vous
  valideRdv(id: number): void {
      this.rdvService.validateRdvByID(id).subscribe(result => {
        location.reload();
      });
    }

  // Formatage de la date
  formatSelectedDate(): string {
    if (this.searchDate) {
      const year = this.searchDate.getFullYear();
      const month = this.searchDate.getMonth() + 1; // Les mois sont indexés à partir de 0
      const day = this.searchDate.getDate();

      return `${year}-${this.padZero(month)}-${this.padZero(day)}`;
    }
    return '';
  }

  // Ajout d'un 0 devant les mois et jours < 10
  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
