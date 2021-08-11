import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedsService } from 'src/app/shared/service/shareds.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-admin-barangsewaedit',
  templateUrl: './admin-barangsewaedit.component.html',
  styleUrls: ['./admin-barangsewaedit.component.css']
})
export class AdminBarangsewaeditComponent implements OnInit {
  rentId: any;
  userId: any;
  dataUser: any;
  dataRoom: any;

  barangForm = new FormGroup({
    userTitle: new FormControl(''),
    userName: new FormControl(''),
    userLassname: new FormControl(''),
    userCardId: new FormControl(''),
    userBirthday: new FormControl(''),
    userGender: new FormControl(''),
    userPhone: new FormControl(''),
    userEmail: new FormControl(''),
    userAddress: new FormControl(''),
    districtNameTh: new FormControl(''),
    provinceNameTh: new FormControl(''),
    amphurNameTh: new FormControl(''),
    zipCode: new FormControl(''),
    roomName: new FormControl(''),
    roomTypename: new FormControl(''),
    roomPrice: new FormControl(''),
    rentStart: new FormControl(''),
    rentEnd: new FormControl(''),
    roomLight: new FormControl(''),
    roomWater: new FormControl(''),
    rentInsurance: new FormControl(''),
    rentOther: new FormControl(''),
    rentTotalprice: new FormControl(''),

  });

  constructor(
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private sharedsService: SharedsService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.rentId = this._Activatedroute.snapshot.paramMap.get("id");
    this.getRentByRentId(this.rentId);
  }
  getRentByRentId(rentId: any) {
    this.sharedsService.getRentByRentId(rentId).subscribe((res) => {
      console.log('!!!!!!!! Rent data !!!!!!!!!!', res)
      this.barangForm.patchValue({
        userTitle: res.userTitle,
        userName: res.userName,
        userLassname: res.userLassname,
        userCardId: res.userCardId,
        userBirthday: res.userBirthday,
        userGender: res.userGender,
        userPhone: res.userPhone,
        userEmail: res.userEmail,
        userAddress: res.userAddress,
        districtNameTh: res.districtNameTh,
        provinceNameTh: res.provinceNameTh,
        amphurNameTh: res.amphurNameTh,
        zipCode: res.zipCode,
        roomName: res.roomName,
        roomTypename: res.roomTypename,
        roomPrice: res.roomPrice,
        rentStart: res.rentStart,
        rentEnd: res.rentEnd,
        roomLight: res.roomLight,
        roomWater: res.roomWater,
        rentInsurance: res.rentInsurance,
        rentOther: res.rentOther,
        rentTotalprice: res.rentTotalprice,
      });
    },
      (error) => {
        console.log('!!!!! Error rent !!!!!');
      }
    );
  }
  
  save() {
    console.log(this.barangForm.value.rentId);
    let body = {
      "userTitle": this.barangForm.value.userTitle,
      "userName": this.barangForm.value.userName,
      "userLassname": this.barangForm.value.userLassname,
      "userCardId": this.barangForm.value.userCardId,
      "userBirthday": this.barangForm.value.userBirthday,
      "userGender": this.barangForm.value.userGender,
      "userPhone": this.barangForm.value.userPhone,
      "userEmail": this.barangForm.value.userEmail,
      "userAddress": this.barangForm.value.userAddress,
      "districtNameTh": this.barangForm.value.districtNameTh,
      "provinceNameTh": this.barangForm.value.provinceNameTh,
      "amphurNameTh": this.barangForm.value.amphurNameTh,
      "zipCode": this.barangForm.value.zipCode,
      "roomName": this.barangForm.value.roomName,
      "roomTypename": this.barangForm.value.roomTypename,
      "roomPrice": this.barangForm.value.roomPrice,
      "rentStart": this.barangForm.value.rentStart,
      "rentEnd": this.barangForm.value.rentEnd,
      "roomLight": this.barangForm.value.roomLight,
      "roomWater": this.barangForm.value.roomWater,
      "rentInsurance": this.barangForm.value.rentInsurance,
      "rentOther": this.barangForm.value.rentOther,
      "rentTotalprice": this.barangForm.value.rentTotalprice,
    }
    this.sharedsService.updateRent(body).subscribe(
      (error) => console.log(error),
    );
    this.router.navigate(['admin/barangsewa']);
  }
  back() {
    this.router.navigate(['admin/barangsewa']);
  }

  //zipCode
  userZipCode(event: any) {
    const zipCode = event.target.value;
    console.log('zipCode' + zipCode)
    this.userService.getDistricByZipCode(zipCode).subscribe(
      res => {
        console.log(res)
        if (res) {
          this.barangForm.patchValue(
            {
              district: res.districtNameTh,
              amphur: res.amphur.amphurNameTh,
              province: res.province.provinceNameTh
            }
          )
        }
      },
      error => {
        this.barangForm.patchValue(
          {
            district: '',
            amphur: '',
            province: ''
          }
        )
      }
    );
  }


}
