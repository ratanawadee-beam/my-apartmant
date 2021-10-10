import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
 
  paymentForm = new FormGroup({
    inStatus: new FormControl(''),
  })
  constructor(
    private adminService: AdminService,
    private _Activatedroute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.paymant();
    this.inId = this._Activatedroute.snapshot.paramMap.get("id");

  }

  paymant() {
    this.adminService.getAllPayment().subscribe(
      (res) => {
        console.log('Log Paymentall >>::', res)
        this.listpayment = res;
      },
      (error) => {
        console.log('error Paymentall >>::', error);
      }
    );
  }
  //ดูรายละเอียด
  gotobill(data: any) {
    this.adminService.generateBillPayment(data.invoice.inId).subscribe(data => {
      console.log('report===>', data.url)
      if (data) {
        let url = data.url;
        window.open(url, "_blank");
      }
    });
  }

  pageChanged(event: any) {
    this.page = event;
    this.paymant();
  }
  //โชว์สลิป
  gotodowload(data: any) {
    this.adminService.downLoadFile(data.invoice.inId).subscribe(data => {
      console.log('report===>', data.url)
      if (data) {
        let url = data.url;
        window.open(url, "_blank");
      }
    });
  }
  //อัพเดทสถานะ
  updateStatus(data: any) {
    console.log('data invoice',data);
    let saveinvoice = {
      inId: data.inId,
      inStart: data.invoice.inStart,
      inEnd: data.invoice.inEnd,
      inStatus: "3",
      inTotal: data.payTotal,
      rentId: data.invoice.rentId,
      roomId: data.invoice.roomId,
      userId: data.invoice.userId,
    }
    this.adminService.updateinvoice(saveinvoice).subscribe(res => {
      console.log('test' ,res);
      if (res) {
        window.location.reload()
      }
    },
    (error) => console.log('error',error),
    );
  }

}
