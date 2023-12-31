import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminConfigComponent } from './super-admin-config.component';

describe('SuperAdminConfigComponent', () => {
  let component: SuperAdminConfigComponent;
  let fixture: ComponentFixture<SuperAdminConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperAdminConfigComponent]
    });
    fixture = TestBed.createComponent(SuperAdminConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
