import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserPageComponent } from './user-page/user-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserContractComponent } from './user-contract/user-contract.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { UserAlertComponent } from './user-alert/user-alert.component';
import { UserPaymentComponent } from './user-payment/user-payment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsercontactComponent } from './usercontact/usercontact.component';
import { UserUploadComponent } from './user-upload/user-upload.component';


@NgModule({
  declarations: [
    UserPageComponent,
    UserProfileComponent,
    UserContractComponent,
    UserAlertComponent,
    UserPaymentComponent,
    UsercontactComponent,
    UserUploadComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    PdfViewerModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
