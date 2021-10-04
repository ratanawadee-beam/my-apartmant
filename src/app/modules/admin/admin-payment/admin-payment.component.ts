import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/service/admin.service';

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

   pageChanged(event: any) {
    this.page = event;
    this.paymant();
  }
}
