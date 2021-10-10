import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from 'src/app/shared/service/home.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  userTitle: any = ['นาย', 'นาง', 'นางสาว'];
  userGender: any = ['ชาย', 'หญิง'];
  userId: any;

  Provinces: any;
  Amphurs: any;
  Districts: any;

  profileuserForm = this.profileuser.group({
    userUsername: [''],
    userPassword: [''],
    userTitle: ['', Validators.required],
    userName: ['', Validators.required],
    userLassname: ['', Validators.required],
    userIdcard: ['', Validators.required],
    userBirthday: [''],
    userPhone: [''],
    userGender: ['', Validators.required],
    userAddress: ['', Validators.required],
    userEmail: ['', Validators.required],
    zipCode: ['', Validators.required],

    districtId: [{ value: '', },],
    amphur: [{ value: '', disabled: true },],
    province: [{ value: '', disabled: true },],

    districtinput: [''],
    amphurinput: [''],
    provinceinput: [''],

    userId: [0],
    roleId: ['admin'],
    roomId: [''],

  });

  prouserForm = this.profileuser.group({
    userUsername: [''],
    userPassword: [''],
    userTitle: ['', Validators.required],
    userName: ['', Validators.required],
    userLassname: ['', Validators.required],
    userIdcard: ['', Validators.required],
    userBirthday: [''],
    userPhone: [''],
    userGender: ['', Validators.required],
    userAddress: ['', Validators.required],
    userEmail: ['', Validators.required],
    zipCode: ['', Validators.required],

    districtId: [{ value: '', },],
    amphur: [{ value: '', disabled: true },],
    province: [{ value: '', disabled: true },],

    districtinput: [''],
    amphurinput: [''],
    provinceinput: [''],

    userId: [0],
    roleId: ['admin'],
    roomId: [''],

  });
  // profileuserForm = new FormGroup({
  //   roomName: new FormControl(''),
  //   userUsername: new FormControl(''),
  //   userName: new FormControl(''),
  //   userLassname: new FormControl(''),
  //   userCardId: new FormControl(''),
  //   userBirthday: new FormControl(''),
  //   userGender: new FormControl(''),
  //   userPhone: new FormControl(''),
  //   userEmail: new FormControl(''),
  //   userAddress: new FormControl(''),
  //   zipCode: new FormControl(''),
  //   districtNameTh: new FormControl(''),
  //   provinceNameTh: new FormControl(''),
  //   amphurNameTh: new FormControl(''),
  //   userId: new FormControl(''),
  //   roleId: new FormControl(''),
  // });
  constructor(
    private profileuser: FormBuilder,
    private userService: UserService,
    private homeService: HomeService,
    private router: Router,
    private _Activatedroute: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    //ไม่ต้อวยิง api อีก
    const tax: any = localStorage.getItem('taxInfo');
    let taxInfo = JSON.parse(tax);
    console.log('Log  Useradmin  id >>>::', taxInfo);
    this.setDataForm(taxInfo);
    this.initDropdown();

    this.userId = this._Activatedroute.snapshot.paramMap.get("id");



  }

  initDropdown() {
    // this.userService.getDistrictAll().subscribe(res => { this.Districts = res; this.Districts });
    this.userService.getAmphurAll().subscribe(res => { this.Amphurs = res; this.Amphurs; });
    this.userService.getProvinceAll().subscribe(res => { this.Provinces = res; this.Provinces })
  }

  setDataForm(taxInfo: any) {
    console.log('LOG taxInfo', taxInfo)
    this.userService.getAllDistrict(taxInfo.zipCode).subscribe(res => { this.Districts = res; console.log('data!!!!!!!! :', res) });
    this.profileuserForm.patchValue({
      userId: taxInfo.userId,
      roleId: taxInfo.roleId,
      roomId: taxInfo.roomId,
      userUsername: taxInfo.userUsername,
      userPassword: taxInfo.userPassword,
      userTitle: taxInfo.userTitle,
      userName: taxInfo.userName,
      userLassname: taxInfo.userLasname,
      userIdcard: taxInfo.userIdcard,
      userBirthday: taxInfo.userBirthday,
      userGender: taxInfo.userGender,
      userPhone: taxInfo.userPhone,
      userEmail: taxInfo.userEmail,
      userAddress: taxInfo.userAddress,
      zipCode: taxInfo.zipCode,

      districtinput: taxInfo.district,
      amphurinput: taxInfo.amphur,
      provinceinput: taxInfo.province,

      // amphur: taxInfo.amphur,
      // district: taxInfo.district,
      // province: taxInfo.province,
    });
    this.loadUserZipCode(taxInfo.districtId);
  }



  //zipCode
  changeUserZipCode(event: any) {
    const zipCode = event.target.value;
    console.log('zipCode' + zipCode)
    this.userService.getAllDistrict(zipCode).subscribe(res => { this.Districts = res; console.log('data :', res) });
    this.userService.getDistricByZipCode(zipCode).subscribe(res => {
      console.log(res)
      if (res) {
        this.profileuserForm.patchValue({
          // district: res.districtNameTh,
          amphur: res.amphur.amphurNameTh,
          province: res.province.provinceNameTh
        }
        )
        console.log('!!! res zip code save !!!', this.profileuserForm.value)
      }
    },
      error => {
        this.profileuserForm.patchValue(
          {
            district: '',
            amphur: '',
            province: ''
          }
        )
      }
    );
  }

  loadUserZipCode(event: any) {
    const DistrictId = event;
    console.log('zipCode' + DistrictId)
    this.userService.getDistrictByDistrictId(DistrictId).subscribe(
      res => {
        if (res) {
          this.profileuserForm.patchValue(
            {
              districtId: res.districtId,
              amphur: res.amphur.amphurNameTh,
              province: res.province.provinceNameTh,

              districtinput: res.districtNameTh,
              amphurinput: res.amphur.amphurNameTh,
              provinceinput: res.province.provinceNameTh,

            }
          )
          console.log(' !!! res zip code sss !!! ', this.profileuserForm.value)
          console.log('tserrrrrr', res.districtId);

        }
      },
      error => {
        this.profileuserForm.patchValue(
          {
            district: '',
            amphur: '',
            province: ''
          }
        )
      }
    );
  }


  save() {
    console.log(this.profileuserForm.value.userId,
      this.profileuserForm.value.userUsername);
    let body = {
      "roleId": this.profileuserForm.value.roleId,
      "roomId": this.profileuserForm.value.roomId,
      "userAddress": this.profileuserForm.value.userAddress,
      "userBirthday": this.profileuserForm.value.userBirthday,
      "userEmail": this.profileuserForm.value.userEmail,
      "userGender": this.profileuserForm.value.userGender,
      "userId": this.profileuserForm.value.userId,
      "userIdcard": this.profileuserForm.value.userIdcard,
      "userLasname": this.profileuserForm.value.userLassname,
      "userName": this.profileuserForm.value.userName,
      "userPassword": this.profileuserForm.value.userPassword,
      "userPhone": this.profileuserForm.value.userPhone,
      "userTitle": this.profileuserForm.value.userTitle,
      "userUsername": this.profileuserForm.value.userUsername,
      "districtId": this.profileuserForm.value.districtId,
      "zipCode": this.profileuserForm.value.zipCode,
    }

    localStorage.setItem('taxInfo', JSON.stringify(body));
    this.userService.upDateUser(body).subscribe(res => {

    },
      (error) => console.log(error),
    );
    setTimeout(function () {window.location.reload(); }, 1 * 1000);
  }




}
