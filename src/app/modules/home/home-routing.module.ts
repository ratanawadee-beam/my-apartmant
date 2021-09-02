import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeContactComponent } from './home-contact/home-contact.component';
import { HomeLoginComponent } from './home-login/home-login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HomePage2Component } from './home-page2/home-page2.component';
import { HomePage3Component } from './home-page3/home-page3.component';
import { TestComponent } from './test/test.component';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'login',
    component: HomeLoginComponent
  },
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: 'page2',
    component: HomePage2Component
  },
  {
    path: 'page3',
    component: HomePage3Component
  },
  {
    path: 'contract',
    component: HomeContactComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
