import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/service/admin.service';

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.css']
})
export class UserPaymentComponent implements OnInit {

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
  }
  // paymant(){
  //   this.adminService.getAllPayment().subscribe(   
  //     (res) => {
  //       console.log('Log Paymentall >>::',res)
  //       this.listpayment = res;
  //     },
  //     (error) => {
  //       console.log('error Paymentall >>::',error);
  //     }
  //   );
  // }
}
