import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { AdminRoomComponent } from './admin-room/admin-room.component';
import { AdminBarangsewaComponent } from './admin-barangsewa/admin-barangsewa.component';
import { AdminReportsComponent } from './admin-reports/admin-reports.component';
import { AdminManageComponent } from './admin-manage/admin-manage.component';
import { AdminRoomeditComponent } from './admin-roomedit/admin-roomedit.component';
import { AdminRegisroomComponent } from './admin-regisroom/admin-regisroom.component';
import { AdminEdituserComponent } from './admin-edituser/admin-edituser.component';
import { AdminAlertComponent } from './admin-alert/admin-alert.component';
import { AdminRentalComponent } from './admin-rental/admin-rental.component';
import { AdminRegisinvoiceComponent } from './admin-regisinvoice/admin-regisinvoice.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminBarangsewaeditComponent } from './admin-barangsewaedit/admin-barangsewaedit.component';
import { AdminInformationComponent } from './admin-information/admin-information.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AdminPaymentComponent } from './admin-payment/admin-payment.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';


@NgModule({
  declarations: [
    AdminPageComponent,
    AdminRegisterComponent,
    AdminRoomComponent,
    AdminBarangsewaComponent,
    AdminReportsComponent,
    AdminManageComponent,
    AdminRoomeditComponent,
    AdminRegisroomComponent,
    AdminEdituserComponent,
    AdminAlertComponent,
    AdminRentalComponent,
    AdminRegisinvoiceComponent,
    AdminBarangsewaeditComponent,
    AdminInformationComponent,
    AdminPaymentComponent,
    AdminProfileComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    PdfViewerModule,
   
  ]
})
export class AdminModule { }
