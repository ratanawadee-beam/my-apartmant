import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedsService } from 'src/app/shared/service/shareds.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-admin-barangsewaedit',
  templateUrl: './admin-barangsewaedit.component.html',
  styleUrls: ['./admin-barangsewaedit.component.css']
})
export class AdminBarangsewaeditComponent implements OnInit {
  Provinces: any;
  Amphurs: any;
  Districts: any;

  rentId: any;
  roomId: any
  // barangForm = new FormGroup({
  //   rentId: new FormControl(''),
  //   userTitle: new FormControl(''),
  //   userName: new FormControl(''),
  //   userLasname: new FormControl(''),
  //   userIdcard: new FormControl(''),
  //   userBirthday: new FormControl(''),
  //   userGender: new FormControl(''),
  //   userPhone: new FormControl(''),
  //   userEmail: new FormControl(''),
  //   userAddress: new FormControl(''),
  //   districtNameTh: new FormControl(''),
  //   provinceNameTh: new FormControl(''),
  //   amphurNameTh: new FormControl(''),
  //   zipCode: new FormControl(''),
  //   roomName: new FormControl(''),
  //   roomTypename: new FormControl(''),
  //   roomPrice: new FormControl(''),
  //   rentStart: new FormControl(''),
  //   rentEnd: new FormControl(''),
  //   roomLight: new FormControl(''),
  //   roomWater: new FormControl(''),
  //   rentInsurance: new FormControl(''),
  //   rentOther: new FormControl(''),
  //   rentTotalprice: new FormControl(''),
  //   Provinceid: new FormControl(''),
  //   Amphurid: new FormControl(''),
  //   Districtid: new FormControl(''),
  // });
  barangForm = this.editberan.group({
    rentId: [0],
    userId: [''],
    roomId: ['', Validators.required],
    userTitle: ['', Validators.required],
    userName: ['', Validators.required],
    userLasname: ['', Validators.required],
    userIdcard: ['', Validators.required],
    userBirthday: [''],
    userPhone: [''],
    userEmail: ['', Validators.required],
    userGender: ['', Validators.required],
    userAddress: ['', Validators.required],
    zipCode: ['', Validators.required],

    districtId: [{ value: '', disabled: true },],
    amphur: [{ value: '', disabled: true },],
    province: [{ value: '', disabled: true },],

    districtinput: [''],
    amphurinput: [''],
    provinceinput: [''],

    roomTypename: ['', Validators.required],
    roomPrice: ['', Validators.required],
    rentStart: ['', Validators.required],
    rentEnd: ['', Validators.required],
    rentLi: ['', Validators.required],
    rentWa: ['', Validators.required],
    rentInsurance: ['', Validators.required],
    rentOther: [''],
    rentTotalprice: ['', Validators.required],
  });

  constructor(
    private editberan: FormBuilder,
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private sharedsService: SharedsService,
    private userService: UserService,
  ) { }


  ngOnInit(): void {
    this.rentId = this._Activatedroute.snapshot.paramMap.get("id");
    console.log('!!!!!!!!!!this.rent!!!!!!!!!!!!!!', this.rentId)

    this.initDropdown();
    this._Activatedroute.params.subscribe((params) => {
      this.rentId = params.Id;
    }
    );
    this.getRentByRentId(this.rentId);
  }

  initDropdown() {
    this.barangForm.controls['districtId'].disable();
    // this.userService.getDistrictAll().subscribe(res => { this.Districts = res; this.Districts });
    this.userService.getAmphurAll().subscribe(res => { this.Amphurs = res; this.Amphurs; });
    this.userService.getProvinceAll().subscribe(res => { this.Provinces = res; this.Provinces })
  }

  getRentByRentId(rentId: any) {
    this.sharedsService.getRentByrentId(rentId).subscribe((res) => {
      this.userService.getAllDistrict(res.zipCode).subscribe(res => { this.Districts = res; console.log('data :', res) });
      console.log('!!!!!!!! res editrent !!!!!!!!!!', res[0])
      let listData = res[0];
      this.barangForm.patchValue({
        rentId: rentId,
        userId: listData.userId,
        roomId: listData.roomId,
        userTitle: listData.user.userTitle,
        userName: listData.user.userName,
        userLasname: listData.user.userLasname,
        userIdcard: listData.user.userIdcard,
        userBirthday: listData.user.userBirthday,
        userGender: listData.user.userGender,
        userPhone: listData.user.userPhone,
        userEmail: listData.user.userEmail,
        userAddress: listData.user.userAddress,

        // districtId: listData.district,
        // province: listData.province,
        // amphur: listData.amphur,

        zipCode: listData.user.zipCode,
        roomTypename: listData.room.roomTypename,
        roomPrice: listData.room.roomPrice,
        rentStart: listData.rentStart,
        rentEnd: listData.rentEnd,
        rentWa: listData.rentWa,
        rentLi: listData.rentLi,
        rentInsurance: listData.rentInsurance,
        rentOther: listData.rentOther,
        rentTotalprice: listData.rentTotalprice,

        districtinput: listData.district,
        amphurinput: listData.amphur,
        provinceinput: listData.province,
      });
      this.userZipCode(listData.user.districtId);
    },
      (error) => {
        console.log('!!!!! Error rent !!!!!', error);
      }
    );
  }

  save() {
    console.log(this.barangForm.value.rentId);
    let body = {
      "rentEnd": this.barangForm.value.rentEnd,
      "rentId": this.barangForm.value.rentId,
      "rentInsurance": this.barangForm.value.rentInsurance,
      "rentOther": this.barangForm.value.rentOther,
      "rentStart": this.barangForm.value.rentStart,
      "rentTotalprice": this.barangForm.value.rentTotalprice,
      "rentWa": this.barangForm.value.rentWa,
      "rentLi": this.barangForm.value.rentLi,
      "roomId": this.barangForm.value.roomId,
      "userId": this.barangForm.value.userId,
    }
    this.sharedsService.updateRent(body).subscribe(res => {
      console.log('LOG seveRent >>>::', res);
      if (res) {
        window.location.reload()
      }
    },
      (error) => console.log(error),
    );
  }

  back() {
    this.router.navigate(['admin/barangsewa']);
  }

  //zipCode
  userZipCode(event: any) {
    const DistrictId = event;
    console.log('zipCode' + DistrictId)
    this.userService.getDistrictByDistrictId(DistrictId).subscribe(res => {
        if (res) {
          this.barangForm.patchValue({
            districtId: res.districtId,
            amphur: res.amphur.amphurNameTh,
            province: res.province.provinceNameTh,

            districtinput: res.districtNameTh,
            amphurinput: res.amphur.amphurNameTh,
            provinceinput: res.province.provinceNameTh,

          }
          )
          console.log(' !!! res zip code !!! ', this.barangForm.value)
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

  pint() {
    this.sharedsService.generateBilldrugReport(this.rentId).subscribe(data => {
      console.log('report===>', data.url)
      if (data) {
        let url = data.url;
        window.open(url, "_blank");
      }
    });
  }


}
