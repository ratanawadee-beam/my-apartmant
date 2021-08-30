import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/shared/service/admin.service';
import { SharedsService } from 'src/app/shared/service/shareds.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-admin-regisinvoice',
  templateUrl: './admin-regisinvoice.component.html',
  styleUrls: ['./admin-regisinvoice.component.css']
})
export class AdminRegisinvoiceComponent implements OnInit {
  rentId: any;
  roomId: any;
  userId: any;
  invoiceId: any;

  invoiceForm = this.invoice.group({
    invoiceId: [''],
    rentId: [0],
    roomId: [''],
    userId: [''],
    deId: ['', Validators.required],
    roomName: ['', Validators.required],
    userName: ['', Validators.required],
    deStartdate: ['', Validators.required],
    deEnddate: ['', Validators.required],
    roomPrice: ['', Validators.required],
    roomWater: ['', Validators.required],
    deWaNew: ['', Validators.required],
    deTotalunitWa: [''],
    deTotalWa: ['', Validators.required],
    roomLight: ['', Validators.required],
    deLiNew: ['', Validators.required],
    deTotalunitLi: [''],
    deTotalLi: ['', Validators.required],
    deTotal: ['', Validators.required],
    deUnpaid: ['', Validators.required],
  });
  constructor(
    private router: Router,
    private invoice: FormBuilder,
    private sharedsService: SharedsService,
    private _Activatedroute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.rentId = this._Activatedroute.snapshot.paramMap.get("rentId");
    console.log('!!!!!!!!!!this.invoice!!!!!!!!!!!!!!', this.rentId)
    this.getRentByRentId(this.rentId);
  }

  getRentByRentId(rentId: any) {
    this.sharedsService.getRentByrentId(rentId).subscribe((res) => {
      console.log('LOG show invoice', res[0]);
      let listData = res[0];
      this.invoiceForm.patchValue({
        rentId: rentId,
        userId: listData.userId,
        roomId: listData.roomId,
        roomName: listData.room.roomName,
        userName: listData.user.userName,
        roomPrice: listData.room.roomPrice,
        roomWater: listData.room.roomWater,
        roomLight: listData.room.roomLight,
        // deId: listData.deId,
        // deWaNew: listData.deWaNew,
        // deTotalunitWa: listData.deTotalunitWa,
        // deTotalWa: listData.deTotalWa,
        // deLiNew: listData.deLiNew,
        // deTotalunitLi: listData.deTotalunitLi,
        // deTotalLi: listData.deTotalLi,
        // deTotal: listData.deTotal,
        // invoiceStart: res.invoiceStart,
        // invoiceEnd: res.invoiceEnd,
      });
    },
      (error) => {
        console.log('!!!!! Error invoce !!!!!', error);
      }
    );
  }


  save() {
    console.log(this.invoiceForm.value);
    let bady = {
      "deEnddate": this.invoiceForm.value.deEnddate,
      "deId": this.invoiceForm.value.deId,
      "deLiNew": this.invoiceForm.value.deLiNew,
      "deStartdate": this.invoiceForm.value.deStartdate,
      "deTotal": this.invoiceForm.value.deTotal,
      "deTotalLi": this.invoiceForm.value.deTotalLi,
      "deTotalWa": this.invoiceForm.value.deTotalWa,
      "deTotalunitLi": this.invoiceForm.value.deTotalunitLi,
      "deTotalunitWa": this.invoiceForm.value.deTotalunitWa,
      "deUnpaid": this.invoiceForm.value.deUnpaid,
      "deWaNew": this.invoiceForm.value.deWaNew,
      "rentId": this.invoiceForm.value.rentId,
    }
    this.sharedsService.saveInvoicedetail(bady).subscribe(
      (error) => console.log(error),
    );
    this.router.navigate(['admin/rental']);
  }

  back() {
    this.router.navigate(['admin/rental']);
  }

}
