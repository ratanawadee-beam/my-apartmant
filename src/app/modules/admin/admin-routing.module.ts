import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent
  },
  {
    path: 'register',
    component: AdminRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
