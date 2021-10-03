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

  public tmMoney: number = 0;

  cartDrugs = new Array();

  rentId: any;
  roomId: any;
  userId: any;
  invoiceId: any;

  invoiceForm = this.invoice.group({
    inId: [0],
    payId: [0],
    rentId: [''],
    roomId: [''],
    roomTypename: ['', Validators.required],
    userId: [''],
    userName: ['', Validators.required],
    // userLasname: ['', Validators.required],

    deId: [0],
    deWaold: ['', Validators.required],
    deLiold: ['', Validators.required],
    deWanew: ['', Validators.required],
    deLinew: ['', Validators.required],
    totalunitWa: [''],
    totalunitLi: [''],
    totalRoom: ['', Validators.required],
    totalWa: ['150', Validators.required],
    totalLi: ['', Validators.required],
    deTotal: ['', Validators.required],
    inStart: ['', Validators.required],
    inEnd: ['', Validators.required],
  });


  constructor(
    private router: Router,
    private invoice: FormBuilder,
    private sharedsService: SharedsService,
    private adminService: AdminService,
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
        roomTypename: listData.room.roomTypename,
        userName: listData.user.userName,
        userLasname: listData.user.userLasname,
        totalRoom: listData.room.roomPrice,
        deWaold: listData.room.roomWater,
        deLiold: listData.room.roomLight,
      });
    },
      (error) => {
        console.log('!!!!! Error invoce !!!!!', error);
      }
    );
  }


  save() {
    console.log(' Log Saveinvoicedetail >>>::', this.invoiceForm.value);
    let saveinvoice = {
      "inId": this.invoiceForm.value.inId,
      "inStart": this.invoiceForm.value.inStart,
      "inEnd": this.invoiceForm.value.inEnd,
      "inStatus": "1",
      "rentId": this.invoiceForm.value.rentId,
      "roomId": this.invoiceForm.value.roomId,
      "userId": this.invoiceForm.value.userId,
    }
    console.log('Log saveinvoice 1111 >>::', saveinvoice);
    this.adminService.saveInvoice(saveinvoice).subscribe(res => {
      console.log('Log saveinvoice >>::', res.inId);
      let saveindeteil = {
        "deId": this.invoiceForm.value.deId,
        "deWaold": this.invoiceForm.value.deWaold,
        "deLiold": this.invoiceForm.value.deLiold,
        "deLinew": this.invoiceForm.value.deLinew,
        "deWanew": this.invoiceForm.value.deWanew,
        "totalunitLi": this.invoiceForm.value.totalunitLi,
        "totalunitWa": this.invoiceForm.value.totalunitWa,
        "totalRoom": this.invoiceForm.value.totalRoom,
        "totalLi": this.invoiceForm.value.totalLi,
        "totalWa": this.invoiceForm.value.totalWa,
        "deTotal": this.invoiceForm.value.deTotal,
        "inStart": this.invoiceForm.value.inStart,
        "inEnd": this.invoiceForm.value.inEnd,
        "inId": res.inId,
      }
      this.sharedsService.saveInvoicedetail(saveindeteil).subscribe(resInde => {
        console.log('LOG saveinvoice:: >>>::', resInde);
        let savepayment = {
          "payId": this.invoiceForm.value.payId,
          "payDate": this.invoiceForm.value.payDate,
          "payTotal": this.invoiceForm.value.deTotal,
          "inId": res.inId,
        }
        this.adminService.savePayment(savepayment).subscribe(respayment => {
          console.log('LOG savePayment >>::', respayment);
          let updateRoom = {
            "roomId": res.roomId,
            "roomWater": this.invoiceForm.value.deWanew,
            "roomLight": this.invoiceForm.value.deLinew,
          }
          this.sharedsService.updateLightAndWater(updateRoom).subscribe(resRoom => {
            console.log('LoG updateRoom >>::', resRoom);
          },
            (error) => console.log('error'),
          );
        },
          (error) => console.log('error'),
        );
      },
        (error) => console.log('error'),
      );
    },
      (error) => console.log('error'),
    );
    this.router.navigate(['admin/rental']);
  }

  back() {
    this.router.navigate(['admin/rental']);
  }

  waterBill() {
    let waterold = Number(this.invoiceForm.value.deWaold);
    let waterNew = Number(this.invoiceForm.value.deWanew);
    let totalunitWa;
    let totalWa;
    if (waterNew >= waterold) {
      this.invoiceForm.controls.totalunitWa.patchValue(waterNew - waterold);
      totalunitWa = Number(this.invoiceForm.value.totalunitWa);
      totalWa = totalunitWa * 25;
      if (totalWa > 150) {
        this.invoiceForm.controls.totalWa.patchValue(totalWa);
      } else {
        this.invoiceForm.controls.totalWa.patchValue('150');
      }
    } else {
      this.invoiceForm.controls.totalunitWa.patchValue(null);
      this.invoiceForm.controls.totalWa.patchValue('150');
    }
    this.totalAmount();
  }

  deLiBill() {
    let deLiold = Number(this.invoiceForm.value.deLiold);
    let deLinew = Number(this.invoiceForm.value.deLinew);
    let totalunitLi;
    let totalLi;
    if (deLinew >= deLiold) {
      this.invoiceForm.controls.totalunitLi.patchValue(deLinew - deLiold);
      totalunitLi = Number(this.invoiceForm.value.totalunitLi);
      totalLi = totalunitLi * 8;
      this.invoiceForm.controls.totalLi.patchValue(totalLi);
    } else {
      this.invoiceForm.controls.totalunitLi.patchValue(null);
      this.invoiceForm.controls.totalLi.patchValue(null);
    }
    this.totalAmount();
  }

  totalAmount() {
    let totalWa = Number(this.invoiceForm.value.totalWa);
    let totalLi = Number(this.invoiceForm.value.totalLi);
    let deTotal
    if (totalWa > 0 || totalLi > 0) {
      deTotal = totalWa + totalLi;
      this.invoiceForm.controls.deTotal.patchValue(deTotal);
    } else {
      this.invoiceForm.controls.deTotal.patchValue(null);
    }
  }
  // removeDrugCount(drug: any) {
  //   let item = this.cartDrugs.findIndex(i => i.key == drug.key);
  //   if (drug.drugCount > 1) {
  //     drug.drugCount = drug.drugCount - 1;
  //     drug.drugTotalPrice = drug.drugPrice * drug.drugCount;
  //   }
  //   this.cartDrugs[item] = drug;
  //   this.tmMoney = this.getTotalPrice();
  //   console.log('removeDrugCount key ->', drug.key)
  //   console.log('removeDrugCount ->', this.cartDrugs)
  //   debugger
  // }

  // getTotalPrice() {
  //   let tmMoney = 0;
  //   this.cartDrugs.map((a: any) => {
  //     tmMoney += (a.drugPrice * a.drugCount)
  //   })
  //   return tmMoney;
  // }

}
