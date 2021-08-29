import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeLoginComponent } from './home-login/home-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TestComponent } from './test/test.component';
import { HomePage2Component } from './home-page2/home-page2.component';
import { HomeContactComponent } from './home-contact/home-contact.component';





@NgModule({
  declarations: [
    HomePageComponent,
    HomeLoginComponent,
    TestComponent,
    HomePage2Component,
    HomeContactComponent,
    
   
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
