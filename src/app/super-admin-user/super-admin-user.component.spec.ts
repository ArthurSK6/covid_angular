import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminUserComponent } from './super-admin-user.component';

describe('SuperAdminUserComponent', () => {
  let component: SuperAdminUserComponent;
  let fixture: ComponentFixture<SuperAdminUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperAdminUserComponent]
    });
    fixture = TestBed.createComponent(SuperAdminUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
