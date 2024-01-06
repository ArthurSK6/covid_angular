import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { VaccinationService } from '../services/vaccination.service';
import { VaccinationCenter } from '../model/vaccination-center.model';

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

  // Recherche des centres de vaccination par nom, ville ou code postal
  searchCenter() {
    this.centerService.getAllVaccinationCenters().subscribe(centers => {
      const filteredCenters = this.filterCenters(centers);
      this.emitFilteredCenters(filteredCenters);
    });
  }
  
  // Filtrage des centres de vaccination
  private filterCenters(centers: VaccinationCenter[]): VaccinationCenter[] {
    return centers.filter(center =>
      center.city.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      center.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      center.postalCode.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  
  // Emission des centres de vaccination filtrés
  private emitFilteredCenters(filteredCenters: VaccinationCenter[]): void {
    this.search.emit(filteredCenters);
  }
}
