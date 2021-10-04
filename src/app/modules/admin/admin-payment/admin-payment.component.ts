import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/service/admin.service';
import { SharedsService } from 'src/app/shared/service/shareds.service';

@Component({
  selector: 'app-admin-payment',
  templateUrl: './admin-payment.component.html',
  styleUrls: ['./admin-payment.component.css']
})
export class AdminPaymentComponent implements OnInit {

  page = 1;
  count = 0;
  tableSize = 5;
  tableSizes = [3, 6, 9, 12];

  listpayment: any;
  inId: any;
  
  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.paymant();
  }
  
  paymant(){
    this.adminService.getAllPayment().subscribe(   
      (res) => {
        console.log('Log Paymentall >>::',res)
        this.listpayment = res;
      },
      (error) => {
        console.log('error Paymentall >>::',error);
      }
    );
  }

  // show() {
  //   this.adminService.generateBillPayment(this.inId).subscribe(data => {
  //     console.log('report===>', data.url)
  //     if (data) {
  //       let url = data.url;
  //       window.open(url, "_blank");
  //     }
  //   });
  // }
   pageChanged(event: any) {
    this.page = event;
    this.paymant();
  }

}
