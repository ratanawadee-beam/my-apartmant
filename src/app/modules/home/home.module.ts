import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeLoginComponent } from './home-login/home-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TestComponent } from './test/test.component';





@NgModule({
  declarations: [
    HomePageComponent,
    HomeLoginComponent,
    TestComponent,
    
   
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
