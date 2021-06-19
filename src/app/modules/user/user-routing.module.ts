import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserContractComponent } from './user-contract/user-contract.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

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
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
