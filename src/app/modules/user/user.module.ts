import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserPageComponent } from './user-page/user-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserContractComponent } from './user-contract/user-contract.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    UserPageComponent,
    UserProfileComponent,
    UserContractComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    PdfViewerModule
  ]
})
export class UserModule { }
