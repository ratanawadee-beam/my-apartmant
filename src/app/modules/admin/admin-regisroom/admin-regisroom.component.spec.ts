import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegisroomComponent } from './admin-regisroom.component';

describe('AdminRegisroomComponent', () => {
  let component: AdminRegisroomComponent;
  let fixture: ComponentFixture<AdminRegisroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRegisroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRegisroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
