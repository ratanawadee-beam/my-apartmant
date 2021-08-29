import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { NgxPermissionsGuard } from 'ngx-permissions';
import { HomePageComponent } from './modules/home/home-page/home-page.component';



const routes: Routes = [
//  { path: 'login', component: LoginComponent },
 { path: '', redirectTo: 'home', pathMatch: 'full' },
 {
   path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
   
 }, {
   path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
 }, {
   path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
 },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
