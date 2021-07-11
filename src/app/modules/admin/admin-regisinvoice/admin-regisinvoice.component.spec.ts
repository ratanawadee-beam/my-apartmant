import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegisinvoiceComponent } from './admin-regisinvoice.component';

describe('AdminRegisinvoiceComponent', () => {
  let component: AdminRegisinvoiceComponent;
  let fixture: ComponentFixture<AdminRegisinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRegisinvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRegisinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
