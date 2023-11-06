import { Component, OnInit } from '@angular/core';
import { VaccinationCenter } from '../vaccination-center';
import { VaccinationService } from '../vaccination.service';

@Component({
  selector: 'app-vaccination-center-list',
  templateUrl: './vaccination-center-list.component.html',
  styleUrls: ['./vaccination-center-list.component.scss']
})
export class VaccinationCenterListComponent implements OnInit {

  centers!: VaccinationCenter[];

  selected?: VaccinationCenter;

  constructor(private service: VaccinationService) { }
    
  ngOnInit(): void{
    this.service.getAllVaccinationCenter().subscribe(resultCenters=>{
      this.centers = resultCenters;
    });
  }

  selectCenter(aCenter: VaccinationCenter) : void{
    this.selected = aCenter;
  }

  onDelete(aCenter: VaccinationCenter): void {
    delete this.selected;
    this.centers.splice(this.centers.indexOf(aCenter),1);
  }

  login() : void {
    
  }

}
