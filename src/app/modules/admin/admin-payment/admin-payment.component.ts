import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/service/admin.service';

@Component({
  selector: 'app-admin-payment',
  templateUrl: './admin-payment.component.html',
  styleUrls: ['./admin-payment.component.css']
})
export class AdminPaymentComponent implements OnInit {

  listpayment: any;
  
  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.paymant();
  }
  
  paymant(){
    this.adminService.getAllInvoice().subscribe(   
      (res) => {
        console.log('Log Paymentall >>::',res)
        this.listpayment = res;
      },
      (error) => {
        console.log('error Paymentall >>::',error);
      }
    );
  }
 
}
