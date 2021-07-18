import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {
  registerForm = new FormGroup({
    user_title: new FormControl(''),
    user_name: new FormControl(''),
    user_lassname: new FormControl(''),
    user_card_id: new FormControl(''),
    user_birthday: new FormControl(''),
    user_gender: new FormControl(''),
    user_old: new FormControl(''),
    user_phone: new FormControl(''),
    user_email: new FormControl(''),
    user_name1: new FormControl(''),
    user_lassname1: new FormControl(''),
    user_card_id1: new FormControl(''),
    user_birthday1: new FormControl(''),
    user_gender1: new FormControl(''),
    user_old1: new FormControl(''),
    user_phone1: new FormControl(''),
    user_email1: new FormControl(''),
    user_address: new FormControl(''),
    District_id: new FormControl(''),
    Amphur_id: new FormControl(''),
    Province_id: new FormControl(''),
    room_id: new FormControl(''),
    room_typename: new FormControl(''),
    room_price: new FormControl(''),
    rent_start: new FormControl(''),
    rent_end: new FormControl(''),
    rent_wa: new FormControl(''),
    rent_li: new FormControl(''),
    rent_insurance: new FormControl(''),
    rent_other: new FormControl(''),
    rent_totalprice: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }
  save() {
    console.log(this.registerForm.value);

  }
}
