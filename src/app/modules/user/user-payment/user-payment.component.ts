import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/shared/service/admin.service';
import { SharedsService } from 'src/app/shared/service/shareds.service';

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.css']
})
export class UserPaymentComponent implements OnInit {

  userId: any;
  listInvoice: any;
  constructor(
    private sharedsService: SharedsService,
    private adminService: AdminService,
    private _Activatedroute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    
    this.userId = this._Activatedroute.snapshot.paramMap.get("id");
    this.invoiceData(this.userId);
    // this.invoiceData() ;
  }

  // paymant(userId: any) {
  //   this.adminService.geyinvoiceByuserId(userId).subscribe(res => {
  //     console.log('LOG showinvo >>>::', res);
  //   },
  //     (error) => {
  //       console.log('Error invoice Data :: ', error);
  //     }
  //   );

  // }

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
