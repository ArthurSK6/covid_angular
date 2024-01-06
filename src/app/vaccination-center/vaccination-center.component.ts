import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VaccinationService } from '../services/vaccination.service';
import { VaccinationCenter } from '../model/vaccination-center.model';
import { RdvService } from '../services/rdv.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-vaccination-center',
  templateUrl: './vaccination-center.component.html',
  styleUrls: ['./vaccination-center.component.scss'],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'},],
})
export class VaccinationCenterComponent implements OnInit {

  center?: VaccinationCenter;
  @Output() deleted: EventEmitter<VaccinationCenter> = new EventEmitter();

   // Ajoutez ici les propriétés pour les champs de formulaire
  date: Date = new Date(); // Format yyyy-mm-dd
  email: string = '';
  telephone: string = '';
  prenom: string = '';
  nom: string = '';
  

  idCenter: number = 0; 

  constructor(
    private route: ActivatedRoute,
    private vaccinationService: VaccinationService,
    private router: Router,
    private RdvService: RdvService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.vaccinationService.getVaccinationCenterById(id).subscribe(result => {
      this.center = result;
      this.idCenter = id;
    });
  }

  // Ajoutez la logique pour soumettre le formulaire
  submitForm(): void {
    
    // Créez un objet pour stocker les données du formulaire
    const formulaire = {
      id: undefined,
      date: new Date(this.date),
      email: this.email,
      telephone: this.telephone,
      prenom: this.prenom,
      nom: this.nom,
      vaccinated: undefined,
      vaccinationCenter: undefined,
    };

    // Utilisez le service pour enregistrer le rendez-vous
    this.RdvService.addRdv(formulaire,this.idCenter).subscribe(() => {
      // Redirigez l'utilisateur vers la page des centres après l'envoi du formulaire
      this.router.navigate(['/center']);
    });
  }
  
  // Retour à la page précédente 
  cancel(): void {
    this.location.back();
  }
}


