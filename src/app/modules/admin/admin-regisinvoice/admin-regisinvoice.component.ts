import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/shared/service/admin.service';
import { SharedsService } from 'src/app/shared/service/shareds.service';

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
    invoiceId: [0],
    rentId: [''],
    roomId: [''],
    userId: [''],
    // deId: ['', Validators.required],
    roomName: ['', Validators.required],
    userName: ['', Validators.required],
    // invoiceStart: ['', Validators.required],
    // invoiceEnd: ['', Validators.required],
    roomPrice: ['', Validators.required],
    roomWater: ['', Validators.required],
    // deWaNew: ['', Validators.required],
    // deTotalunitWa: [''],
    // deTotalWa: ['', Validators.required],
    roomLight: ['', Validators.required],
    // deLiNew: ['', Validators.required],
    // deTotalunitLi: [''],
    // deTotalLi: ['', Validators.required],
    // deTotal: ['', Validators.required],
    
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
      console.log('LOG show invoice', res);
      // let listData = res[0];
      this.invoiceForm.patchValue({
        rentId: res.rentId,
        userId: res.userId,
        roomId: res.roomId,
        roomName: res.room.roomName,
        userName: res.user.userName,
        roomPrice: res.room.roomPrice,
        roomWater: res.room.roomWater,
        roomLight: res.room.roomLight,
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
  }

  back() {
    this.router.navigate(['admin/rental']);
  }

}
