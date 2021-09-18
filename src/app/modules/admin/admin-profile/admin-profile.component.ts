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
    roomId: [''],
    roomName: ['', Validators.required],
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
    district: [{ value: '', disabled: true },],
    amphur: [{ value: '', disabled: true },],
    province: [{ value: '', disabled: true },],
    userId: [0],
    roleId: ['admin'],
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

  }

  initDropdown() {
    this.userService.getDistrictAll().subscribe(res => { this.Districts = res; this.Districts });
    this.userService.getDistrictAll().subscribe(res => { this.Amphurs = res; this.Amphurs; });
    this.userService.getProvinceAll().subscribe(res => { this.Provinces = res; this.Provinces })
  }

  setDataForm(taxInfo: any) {
    console.log('LOG taxInfo', taxInfo)
      this.profileuserForm.patchValue({
        userId: taxInfo.userId,
        roleId: taxInfo.roleId,
        roomId: taxInfo.roomId,
        roomName: taxInfo.roomName,
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
        amphur: taxInfo.amphur,
        district: taxInfo.district,
        province: taxInfo.province,
      });
      this.loadUserZipCode(taxInfo.zipCode);
  }

  //zipCode
  changeUserZipCode(event: any) {
    const zipCode = event.target.value;
    console.log('zipCode' + zipCode)
    this.userService.getDistricByZipCode(zipCode).subscribe(
      res => {
        console.log(res)
        if (res) {
          this.profileuserForm.patchValue({
            district: res.districtNameTh,
            amphur: res.amphur.amphurNameTh,
            province: res.province.provinceNameTh
          }
          )
          console.log('!!! res zip code !!!', this.profileuserForm.value)
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

  loadUserZipCode(zipCode: any) {
    console.log('zipCode' + zipCode)
    this.userService.getDistricByZipCode(zipCode).subscribe(
      res => {
        if (res) {
          this.profileuserForm.patchValue(
            {
              district: res.districtNameTh,
              amphur: res.amphur.amphurNameTh,
              province: res.province.provinceNameTh
            }
          )
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
      "zipCode": this.profileuserForm.value.zipCode,
      "roomName": this.profileuserForm.value.roomName,
    }
    this.userService.upDateUser(body).subscribe(
      (error) => console.log(error),
    );
    this.router.navigate(['user/profile']);
  }

}