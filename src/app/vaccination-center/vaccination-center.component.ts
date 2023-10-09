import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VaccinationCenter } from '../vaccination-center';
import { ActivatedRoute } from '@angular/router';
import { VaccinationService } from '../vaccination.service';

@Component({
  selector: 'app-vaccination-center',
  templateUrl: './vaccination-center.component.html',
  styleUrls: ['./vaccination-center.component.scss']
})
export class VaccinationCenterComponent implements OnInit{


  center?:VaccinationCenter;
  @Output() deleted: EventEmitter<VaccinationCenter> = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private VaccinationService: VaccinationService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
     this.VaccinationService.getVaccinationCenterById(id).subscribe((result=>{
      this.center = result;
    }));
  }

  clearName(): void{
    this.center!.name = "";
  }

  delete(): void{
    this.deleted.emit(this.center);
  }
}

