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
    this.paymant();
    // this.invoiceData() ;
  }

  paymant() {
    this.adminService.getAllPayment().subscribe(
      (res) => {
        console.log('Log payment Data >>::', res);
        this.adminService.getAllInvoice().subscribe(
          (res) => {
            console.log('Log invoice Data :: ', res)
            this.sharedsService.getRent().subscribe(res => {
              console.log('LOG showRent >>>::', res);
              this.sharedsService.getRentByUserId(res.userId).subscribe(res => {
                console.log('LOG getRentByUserId >>>::', res);
                this.listInvoice = res;
              },
                (error) => console.log(error),
              );
            },
              (error) => console.log(error),
            );
          },
          (error) => {
            console.log('Error invoice Data :: ', error);
          }
        );
      }
    );

  }

  // invoiceData() {
  //   this.adminService.getAllInvoice().subscribe(
  //     (res) => {
  //       console.log('Log invoice Data :: ', res)
  //       this.listInvoice = res;
  //     },
  //     (error) => {
  //       console.log('Error invoice Data :: ', error);
  //     }
  //   );
  // }
}
