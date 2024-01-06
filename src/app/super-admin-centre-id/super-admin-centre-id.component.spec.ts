import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminCentreIdComponent } from './super-admin-centre-id.component';

describe('SuperAdminCentreIdComponent', () => {
  let component: SuperAdminCentreIdComponent;
  let fixture: ComponentFixture<SuperAdminCentreIdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperAdminCentreIdComponent]
    });
    fixture = TestBed.createComponent(SuperAdminCentreIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
