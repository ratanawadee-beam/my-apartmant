import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBarangsewaComponent } from './admin-barangsewa.component';

describe('AdminBarangsewaComponent', () => {
  let component: AdminBarangsewaComponent;
  let fixture: ComponentFixture<AdminBarangsewaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBarangsewaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBarangsewaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
