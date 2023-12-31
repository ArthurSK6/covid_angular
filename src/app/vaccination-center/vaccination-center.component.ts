import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VaccinationService } from '../services/vaccination.service';
import { VaccinationCenter } from '../model/vaccination-center';

@Component({
  selector: 'app-vaccination-center',
  templateUrl: './vaccination-center.component.html',
  styleUrls: ['./vaccination-center.component.scss']
})
export class VaccinationCenterComponent implements OnInit {
  center?: VaccinationCenter;
  @Output() deleted: EventEmitter<VaccinationCenter> = new EventEmitter();

  // Ajoutez ici les propriétés pour les champs de formulaire
  appointmentDate: Date = new Date();
  email: string = '';
  phone: string = '';
  firstName: string = '';
  lastName: string = '';

  constructor(
    private route: ActivatedRoute,
    private vaccinationService: VaccinationService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.vaccinationService.getVaccinationCenterById(id).subscribe(result => {
      this.center = result;
    });
  }

  clearName(): void {
    if (this.center) {
      this.center.name = '';
    }
  }

  delete(): void {
    this.deleted.emit(this.center);
  }

  // Ajoutez la logique pour soumettre le formulaire
  submitForm(): void {
    // Créez un objet pour stocker les données du formulaire
    const formData = {
      appointmentDate: this.appointmentDate,
      email: this.email,
      phone: this.phone,
      firstName: this.firstName,
      lastName: this.lastName,
      // Ajoutez d'autres propriétés si nécessaire
    };

    // Ajoutez ici la logique pour envoyer les données à votre backend
    // Vous pouvez utiliser le service de vaccination pour cela
    // this.vaccinationService.submitAppointment(formData, this.center.id).subscribe(response => {
    //   // Gérez la réponse du backend si nécessaire
    // });
  }
}
