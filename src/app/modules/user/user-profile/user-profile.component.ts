import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userTitle: any = ['นาย', 'นาง', 'นางสาว'];
  userGender: any = ['ชาย', 'หญิง'];

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
    roleId: ['user'],
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
    private router: Router,
    private _Activatedroute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // this.userId = this._Activatedroute.snapshot.paramMap.get("id");
    const userId = sessionStorage.getItem('user_id');
    console.log('Log User  id', userId);
    this.getUserById(userId);
    this.initDropdown();
  }

  initDropdown() {
    this.userService.getDistrictAll().subscribe(res => { this.Districts = res; this.Districts });
    this.userService.getDistrictAll().subscribe(res => { this.Amphurs = res; this.Amphurs; });
    this.userService.getProvinceAll().subscribe(res => { this.Provinces = res; this.Provinces })
  }

  getUserById(userId: any) {
    console.log('!!user Id!!', userId);
    this.userService.getUserById(userId).subscribe((res) => {
      console.log('!!!!!!!!!!!!res data!!!!!!!!!!!!', res)
      this.profileuserForm.patchValue({
        userId: res.userId,
        roleId: res.roleId,
        roomId: res.roomId,
        roomName: res.roomName,
        userUsername: res.userUsername,
        userPassword: res.userPassword,
        userTitle: res.userTitle,
        userName: res.userName,
        userLassname: res.userLasname,
        userIdcard: res.userIdcard,
        userBirthday: res.userBirthday,
        userGender: res.userGender,
        userPhone: res.userPhone,
        userEmail: res.userEmail,
        userAddress: res.userAddress,
        zipCode: res.zipCode,
        amphur: res.amphur,
        district: res.district,
        province: res.province,
      });
      this.loadUserZipCode(res.zipCode);

    },
      (error) => {
        console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
      }

    );
  }
  //zipCode
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
