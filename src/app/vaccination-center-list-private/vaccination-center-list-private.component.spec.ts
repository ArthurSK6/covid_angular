import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationCenterListPrivateComponent } from './vaccination-center-list-private.component';

describe('VaccinationCenterListPrivateComponent', () => {
  let component: VaccinationCenterListPrivateComponent;
  let fixture: ComponentFixture<VaccinationCenterListPrivateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VaccinationCenterListPrivateComponent]
    });
    fixture = TestBed.createComponent(VaccinationCenterListPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
