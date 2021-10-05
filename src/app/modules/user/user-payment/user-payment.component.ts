import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/shared/service/admin.service';
import { SharedsService } from 'src/app/shared/service/shareds.service';
// import { NzTableComponent } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.css']
})
export class UserPaymentComponent implements OnInit {

  userId: any;
  taxInfo: any;
  displayList: any;


  paymentForm = this.paymentUser.group({
    roomId: [''],
    userUsername: [''],
    userPassword: [''],
    userTitle: ['', Validators.required],
    userName: ['', Validators.required],
    userLasname: ['', Validators.required],
    userIdcard: ['', Validators.required],
    userBirthday: [''],
    userPhone: [''],
    userGender: ['', Validators.required],
    userAddress: ['', Validators.required],
    userEmail: ['', Validators.required],
    zipCode: ['', Validators.required],
    district: [{ value: '', disabled: true },],
    amphur: [{ value: '', disabled: true },],
    province: [{ value: '', disabled: true },],
    userId: [0],
    roleId: ['user'],
  });

  constructor(
    private sharedsService: SharedsService,
    private adminService: AdminService,
    private _Activatedroute: ActivatedRoute,
    private paymentUser: FormBuilder,
  ) { }

  ngOnInit(): void {
    const tax: any = localStorage.getItem('taxInfo');
    this.taxInfo = JSON.parse(tax);
    console.log(this.taxInfo);
    this.invoiceData(this.taxInfo.userId);
    this.setDataForm(this.taxInfo)
  }

  invoiceData(userId: any) {
    this.adminService.getinvoiceByuserId(userId).subscribe(
      (res) => {
        console.log('Log invoice Data :: ', res)
        this.displayList = res;
      },
      (error) => {
        console.log('Error invoice Data :: ', error);
      }
    );
  }

  setDataForm(taxInfo: any) {
    console.log('LOG taxInfo', taxInfo)
    this.paymentForm.patchValue({
      userId: taxInfo.userId,
      roleId: taxInfo.roleId,
      roomId: taxInfo.roomId,
      userUsername: taxInfo.userUsername,
      userPassword: taxInfo.userPassword,
      userTitle: taxInfo.userTitle,
      userName: taxInfo.userName,
      userLasname: taxInfo.userLasname,
      userIdcard: taxInfo.userIdcard,
      userBirthday: taxInfo.userBirthday,
      userGender: taxInfo.userGender,
      userPhone: taxInfo.userPhone,
      userEmail: taxInfo.userEmail,
      userAddress: taxInfo.userAddress,
      zipCode: taxInfo.zipCode,
      amphur: taxInfo.amphur,
      district: taxInfo.district,
      province: taxInfo.province,
    });
  }
}
