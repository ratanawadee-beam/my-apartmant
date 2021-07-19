import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBarangsewaeditComponent } from './admin-barangsewaedit.component';

describe('AdminBarangsewaeditComponent', () => {
  let component: AdminBarangsewaeditComponent;
  let fixture: ComponentFixture<AdminBarangsewaeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBarangsewaeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBarangsewaeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
