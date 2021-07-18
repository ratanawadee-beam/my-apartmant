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
    user_username: new FormControl(''),
    user_password: new FormControl(''),
    user_title: new FormControl(''),
    user_name: new FormControl(''),
    user_lassname: new FormControl(''),
    user_card_id: new FormControl(''),
    user_birthday: new FormControl(''),
    user_gender: new FormControl(''),
    user_phone: new FormControl(''),
    user_email: new FormControl(''),
    user_address: new FormControl(''),
    zip_code: new FormControl(''),
    District_id: new FormControl(''),
    Province_id: new FormControl(''),
    Amphur_id: new FormControl(''),
    user_id: new FormControl(''),
    role_id: new FormControl(''),
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
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!', res)
      this.edituserForm.patchValue({
        user_username: res.userUsername,
        user_password: res.userPassword,
        user_title: res.userTitle,
        user_name: res.userName,
        user_lassname: res.userLasname,
        user_card_id: res.userIdcard,
        user_birthday: res.userBirthday,
        user_gender: res.userGender,
        user_phone: res.userPhone,
        user_email: res.userEmail,
        user_address: res.userAddress,
        zip_code: res.zipCode,
        District_id: '',
        Province_id: '',
        Amphur_id: '',
        user_id: userId,
        role_id: res.roleId,
      });
    },
      (error) => {
        console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
      }
    );
  }

  save() {
    console.log(this.edituserForm.value.user_id,
      this.edituserForm.value.user_username);
    let body = {
      "roleId": this.edituserForm.value.role_id,
      "userAddress": this.edituserForm.value.user_address,
      "userBirthday": this.edituserForm.value.user_birthday,
      "userEmail": this.edituserForm.value.user_email,
      "userGender": this.edituserForm.value.user_gender,
      "userId": this.edituserForm.value.user_id,
      "userIdcard": this.edituserForm.value.user_card_id,
      "userLasname": this.edituserForm.value.user_lassname,
      "userName": this.edituserForm.value.user_name,
      "userPassword": this.edituserForm.value.user_password,
      "userPhone": this.edituserForm.value.user_phone,
      "userTitle": this.edituserForm.value.user_title,
      "userUsername": this.edituserForm.value.user_username,
      "zipCode": this.edituserForm.value.zip_code
    }
    this.userService.saveUser(body).subscribe(
      (error) => console.log(error),
    );
    this.router.navigate(['admin/manage']);
  }

}
