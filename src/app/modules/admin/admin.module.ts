import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { AdminRoomComponent } from './admin-room/admin-room.component';
import { AdminBarangsewaComponent } from './admin-barangsewa/admin-barangsewa.component';
import { AdminReportsComponent } from './admin-reports/admin-reports.component';
import { AdminModelComponent } from './admin-model/admin-model.component';
import { AdminManageComponent } from './admin-manage/admin-manage.component';
import { AdminRoomeditComponent } from './admin-roomedit/admin-roomedit.component';




@NgModule({
  declarations: [
    AdminPageComponent,
    AdminRegisterComponent,
    AdminRoomComponent,
    AdminBarangsewaComponent,
    AdminReportsComponent,
    AdminModelComponent,
    AdminManageComponent,
    AdminRoomeditComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }