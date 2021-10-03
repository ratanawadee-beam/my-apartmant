import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/service/admin.service';

@Component({
  selector: 'app-user-alert',
  templateUrl: './user-alert.component.html',
  styleUrls: ['./user-alert.component.css']
})
export class UserAlertComponent implements OnInit {
  
  taxInfo: any;
  listInvoice: any;

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    const tax: any = localStorage.getItem('taxInfo');
    this.taxInfo = JSON.parse(tax);
    console.log(this.taxInfo);
    this.invoiceData(this.taxInfo.userId);
  }
  invoiceData(userId: any) {
    this.adminService.geyinvoiceByuserId(userId).subscribe(
      (res) => {
        console.log('Log invoice Data :: ', res)
        this.listInvoice = res;
      },
      (error) => {
        console.log('Error invoice Data :: ', error);
      }
    );
  }

}
