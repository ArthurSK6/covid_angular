import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { VaccinationService } from '../services/vaccination.service';
import { VaccinationCenter } from '../model/vaccination-center';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  searchQuery: string = '';

  constructor(private centerService: VaccinationService) { }

  @Output()
  search: EventEmitter<VaccinationCenter[]> = new EventEmitter<VaccinationCenter[]>();

  searchCenter(){
    this.centerService.getAllVaccinationCenters().subscribe(centers => {
      const filteredCenters = centers.filter(center => 
        center.city.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        center.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        center.postalCode.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.search.emit(filteredCenters);
    });    
  }
}
