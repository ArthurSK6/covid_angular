import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminCentresComponent } from './super-admin-centres.component';

describe('SuperAdminCentresComponent', () => {
  let component: SuperAdminCentresComponent;
  let fixture: ComponentFixture<SuperAdminCentresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperAdminCentresComponent]
    });
    fixture = TestBed.createComponent(SuperAdminCentresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
