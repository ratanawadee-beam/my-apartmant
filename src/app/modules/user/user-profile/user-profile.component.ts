import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userId: any
  profileuserForm = new FormGroup({
    roomName: new FormControl(''),
    userUsername: new FormControl(''),
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
  constructor() { }
  ngOnInit(): void {
  }
  save() { }
  edit() { }
}
