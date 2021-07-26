import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-admin-edituser',
  templateUrl: './admin-edituser.component.html',
  styleUrls: ['./admin-edituser.component.css']
})
export class AdminEdituserComponent implements OnInit {
  userId: any
  edituserForm = new FormGroup({
    roomName: new FormControl(''),
    userUsername: new FormControl(''),
    userPassword: new FormControl(''),
    userTitle: new FormControl(''),
    userName: new FormControl(''),
    userLassname: new FormControl(''),
    userCardId: new FormControl(''),
    userBirthday: new FormControl(''),
    userGender: new FormControl(''),
    userPhone: new FormControl(''),
    userEmail: new FormControl(''),
    userAddress: new FormControl(''),
    zipCode: new FormControl(''),
    districtNameTh: new FormControl(''),
    provinceNameTh: new FormControl(''),
    amphurNameTh: new FormControl(''),
    userId: new FormControl(''),
    roleId: new FormControl(''),
  });

  constructor(
    private _Activatedroute: ActivatedRoute,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userId = this._Activatedroute.snapshot.paramMap.get("id");
    this.getUserById(this.userId);
  }

  getUserById(userId: any) {
    this.userService.getUserById(userId).subscribe((res) => {
      console.log('!!!!!!!!!!!!res data!!!!!!!!!!!!', res)
      this.edituserForm.patchValue({
        roomName: res.roomName,
        userUsername: res.userUsername,
        userPassword: res.userPassword,
        userTitle: res.userTitle,
        userName: res.userName,
        userLassname: res.userLasname,
        userCardId: res.userIdcard,
        userBirthday: res.userBirthday,
        userGender: res.userGender,
        userPhone: res.userPhone,
        userEmail: res.userEmail,
        userAddress: res.userAddress,
        zipCode: res.zipCode,
        districtNameTh: res.districtNameTh,
        provinceNameTh: res.provinceNameTh,
        amphurNameTh: res.amphurNameTh,
        userId: userId,
        roleId: res.roleId,
      });
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
      "userAddress": this.edituserForm.value.userAddress,
      "userBirthday": this.edituserForm.value.userBirthday,
      "userEmail": this.edituserForm.value.userEmail,
      "userGender": this.edituserForm.value.userGender,
      "userId": this.edituserForm.value.userId,
      "userIdcard": this.edituserForm.value.userCardId,
      "userLasname": this.edituserForm.value.userLassname,
      "userName": this.edituserForm.value.userName,
      "userPassword": this.edituserForm.value.userPassword,
      "userPhone": this.edituserForm.value.userPhone,
      "userTitle": this.edituserForm.value.userTitle,
      "userUsername": this.edituserForm.value.userUsername,
      "zipCode": this.edituserForm.value.zipCode,
      "roomName": this.edituserForm.value.roomName,
      "districtNameTh": this.edituserForm.value.districtNameTh,
      "provinceNameTh": this.edituserForm.value.provinceNameTh,
      "amphurNameTh": this.edituserForm.value.amphurNameTh,
    }
    this.userService.saveUser(body).subscribe(
      (error) => console.log(error),
    );
    this.router.navigate(['admin/manage']);
  }
  back() {
    this.router.navigate(['admin/manage']);
  }
}
