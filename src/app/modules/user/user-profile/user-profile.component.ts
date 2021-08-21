import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  userId: any

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
    roleId: ['2'],
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
    private _Activatedroute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // this.userId = this._Activatedroute.snapshot.paramMap.get("id");
    // const userId = sessionStorage.getItem('user_id');
    this.getUserById(this.userId);
    this.initDropdown();
  }

  initDropdown() {
    this.userService.getDistrictAll().subscribe(res => { this.Districts = res; this.Districts });
    this.userService.getDistrictAll().subscribe(res => { this.Amphurs = res; this.Amphurs; });
    this.userService.getProvinceAll().subscribe(res => { this.Provinces = res; this.Provinces })
  }

  getUserById(userId: any) {
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
      this.userZipCode(res.zipCode);

    },
      (error) => {
        console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
      }

    );
  }
  //zipCode
  userZipCode(event: any) {
    const zipCode = event;
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
  save() { }
  edit() { }
}
