import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAlertComponent } from './admin-alert/admin-alert.component';
import { AdminBarangsewaComponent } from './admin-barangsewa/admin-barangsewa.component';
import { AdminEdituserComponent } from './admin-edituser/admin-edituser.component';
import { AdminManageComponent } from './admin-manage/admin-manage.component';
import { AdminModelComponent } from './admin-model/admin-model.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminRegisinvoiceComponent } from './admin-regisinvoice/admin-regisinvoice.component';
import { AdminRegisroomComponent } from './admin-regisroom/admin-regisroom.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { AdminRentalComponent } from './admin-rental/admin-rental.component';
import { AdminReportsComponent } from './admin-reports/admin-reports.component';
import { AdminRoomComponent } from './admin-room/admin-room.component';
import { AdminRoomeditComponent } from './admin-roomedit/admin-roomedit.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent, 
  },
  {
    path: 'admin',
    component: AdminPageComponent
  },
  {
    path: 'manage',
    component: AdminManageComponent
  },
  {
    path: 'register',
    component: AdminRegisterComponent
  },
  {
    path: 'room',
    component: AdminRoomComponent
  },
  {
    path: 'reports',
    component: AdminReportsComponent
  },
  {
    path: 'barangsewa',
    component: AdminBarangsewaComponent
  },
  {
    path: 'model',
    component: AdminModelComponent
  },
  {
    path: 'roomedit',
    component: AdminRoomeditComponent
  },
  {
    path: 'regisroom',
    component: AdminRegisroomComponent
  },
  {
    path: 'edituser',
    component: AdminEdituserComponent
  },
  {
    path: 'edituser/:id',
    component: AdminEdituserComponent
  },
  {
    path: 'alertadmin',
    component: AdminAlertComponent
  },
  {
    path: 'rental',
    component: AdminRentalComponent
  },
  {
    path: 'regisinvoice',
    component: AdminRegisinvoiceComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
