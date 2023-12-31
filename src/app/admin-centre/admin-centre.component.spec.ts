import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCentreComponent } from './admin-centre.component';

describe('AdminCentreComponent', () => {
  let component: AdminCentreComponent;
  let fixture: ComponentFixture<AdminCentreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCentreComponent]
    });
    fixture = TestBed.createComponent(AdminCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
