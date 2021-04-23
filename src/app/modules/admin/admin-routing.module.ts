import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBarangsewaComponent } from './admin-barangsewa/admin-barangsewa.component';
import { AdminManageComponent } from './admin-manage/admin-manage.component';
import { AdminModelComponent } from './admin-model/admin-model.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }