import { Component, OnInit } from '@angular/core';
import { VaccinationCenter } from '../model/vaccination-center';
import { VaccinationService } from '../services/vaccination.service';


@Component({
  selector: 'app-vaccination-center-list',
  templateUrl: './vaccination-center-list.component.html',
  styleUrls: ['./vaccination-center-list.component.scss']
})
export class VaccinationCenterListComponent implements OnInit {

  centers!: VaccinationCenter[];
  selected?: VaccinationCenter;
  citySearch: string = "";

  constructor(private service: VaccinationService) { }

  ngOnInit(): void {
    this.service.getAllVaccinationCenters().subscribe(resultCenters => {
      this.centers = resultCenters;
    });
  }

  selectCenter(aCenter: VaccinationCenter): void {
    this.selected = aCenter;
  }

  handleSearch(event: VaccinationCenter[]){
    this.centers = event;
  }
  
}
