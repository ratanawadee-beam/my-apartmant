import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAlertComponent } from './user-alert/user-alert.component';
import { UserContractComponent } from './user-contract/user-contract.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UserPaymentComponent } from './user-payment/user-payment.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserUploadComponent } from './user-upload/user-upload.component';
import { UsercontactComponent } from './usercontact/usercontact.component';

const routes: Routes = [
  {
    path: '',
    component: UserPageComponent
  },
  {
    path: 'home',
    component: UserPageComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent
  },
  {
    path: 'contract',
    component: UserContractComponent
  },
  {
    path: 'alertuser',
    component: UserAlertComponent
  },
  {
    path: 'payment',
    component: UserPaymentComponent
  },
  {
    path: 'contact',
    component: UsercontactComponent
  },
  {
    path: 'upload',
    component: UserUploadComponent
  },
  {
    path: 'upload/:id',
    component: UserUploadComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
