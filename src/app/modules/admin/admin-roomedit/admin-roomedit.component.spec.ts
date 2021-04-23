import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoomeditComponent } from './admin-roomedit.component';

describe('AdminRoomeditComponent', () => {
  let component: AdminRoomeditComponent;
  let fixture: ComponentFixture<AdminRoomeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRoomeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRoomeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
