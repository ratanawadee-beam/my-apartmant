import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedsService } from 'src/app/shared/service/shareds.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-admin-edituser',
  templateUrl: './admin-edituser.component.html',
  styleUrls: ['./admin-edituser.component.css']
})
export class AdminEdituserComponent implements OnInit {

  Provinces: any;
  Amphurs: any;
  Districts: any;

  userId: any;

  edituserForm = this.edituser.group({
    
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
    
    districtId: [{ value: '', disabled: true },],
    amphur: [{ value: '', disabled: true },],
    province: [{ value: '', disabled: true },],

    districtinput: [''],
    amphurinput: [''],
    provinceinput: [''],

    userId: [0],
    roleId: [''],
    roomId: [''],
  });

  constructor(
    private edituser: FormBuilder,
    private _Activatedroute: ActivatedRoute,
    private userService: UserService,
    private sharedsService: SharedsService,
    private router: Router) { }

  ngOnInit(): void {
    this.userId = this._Activatedroute.snapshot.paramMap.get("id");
    
    this.getUserById(this.userId);
    this.initDropdown();

    this.edituserForm.controls['districtId'].disable();
  }

  initDropdown() {
    
    // this.userService.getDistrictAll().subscribe(res => { this.Districts = res; this.Districts });
    this.userService.getAmphurAll().subscribe(res => { this.Amphurs = res; this.Amphurs; });
    this.userService.getProvinceAll().subscribe(res => { this.Provinces = res; this.Provinces })
  }

  getUserById(userId: any) {
    this.userService.getUserById(userId).subscribe((res) => {
      this.userService.getAllDistrict(res.zipCode).subscribe(res => { this.Districts = res; console.log('data :', res) });
      console.log('!!!!!!!!!!!!res data!!!!!!!!!!!!', res)
      this.edituserForm.patchValue({
        userId: userId,
        roleId: res.roleId,
        roomId: res.roomId,
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

        districtinput: res.district,
        amphurinput: res.amphur,
        provinceinput: res.province,

        // amphur: res.amphur,
        // district: res.district,
        // province: res.province,
      });
      this.loadUserZipCode(res.districtId);
     
    },
      (error) => {
        console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
      }

    );
  }
 
  save() {
    console.log(this.edituserForm.value.userId,
      this.edituserForm.value.userUsername);
    let body = {
      "roleId": this.edituserForm.value.roleId,
      "roomId": this.edituserForm.value.roomId,
      "userAddress": this.edituserForm.value.userAddress,
      "userBirthday": this.edituserForm.value.userBirthday,
      "userEmail": this.edituserForm.value.userEmail,
      "userGender": this.edituserForm.value.userGender,
      "userId": this.edituserForm.value.userId,
      "userIdcard": this.edituserForm.value.userIdcard,
      "userLasname": this.edituserForm.value.userLassname,
      "userName": this.edituserForm.value.userName,
      "userPassword": this.edituserForm.value.userPassword,
      "userPhone": this.edituserForm.value.userPhone,
      "userTitle": this.edituserForm.value.userTitle,
      "userUsername": this.edituserForm.value.userUsername,
      "districtId": this.edituserForm.value.districtId,
      "zipCode": this.edituserForm.value.zipCode,
      
    }
    this.userService.upDateUser(body).subscribe(
      (error) => console.log(error),
    );
    this.router.navigate(['admin/manage']);
  }
  
  back() {
    this.router.navigate(['admin/manage']);
  }
 
  

  //zipCode
 
  changeUserZipCode(event: any) {
    const zipCode = event.target.value;
    console.log('zipCode' + zipCode)
    this.userService.getAllDistrict(zipCode).subscribe(res => { this.Districts = res; console.log('data :', res) });
    this.userService.getDistricByZipCode(zipCode).subscribe(res => {
        console.log(res)
        if (res) {
          this.edituserForm.patchValue({
            // district: res.districtNameTh,
            amphur: res.amphur.amphurNameTh,
            province: res.province.provinceNameTh
          }
          )
          console.log('!!! res zip code !!!', this.edituserForm.value)
        }
      },
      error => {
        this.edituserForm.patchValue(
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
    this.edituserForm.controls['districtId'].enable();
    this.userService.getDistrictByDistrictId(DistrictId).subscribe(
      res => {
        if (res) {
          this.edituserForm.patchValue(
            {
              districtId: res.districtId,
              amphur: res.amphur.amphurNameTh,
              province: res.province.provinceNameTh,
  
              districtinput: res.districtNameTh,
              amphurinput: res.amphur.amphurNameTh,
              provinceinput: res.province.provinceNameTh,
  
            }
          )
          console.log(' !!! res zip code !!! ', this.edituserForm.value)
          
        }
      },
      error => {
        this.edituserForm.patchValue(
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



