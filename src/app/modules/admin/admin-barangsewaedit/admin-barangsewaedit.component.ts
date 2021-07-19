import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-barangsewaedit',
  templateUrl: './admin-barangsewaedit.component.html',
  styleUrls: ['./admin-barangsewaedit.component.css']
})
export class AdminBarangsewaeditComponent implements OnInit {
  registerForm = new FormGroup({
    usertitle: new FormControl(''),
    username: new FormControl(''),
    userlassname: new FormControl(''),
    usercardid: new FormControl(''),
    userbirthday: new FormControl(''),
    usergender: new FormControl(''),
    userold: new FormControl(''),
    userphone: new FormControl(''),
    useremail: new FormControl(''),
    useraddress: new FormControl(''),
    Districtid: new FormControl(''),
    Amphurid: new FormControl(''),
    Provinceid: new FormControl(''),
    zipcode: new FormControl(''),
    roomid: new FormControl(''),
    roomtypename: new FormControl(''),
    roomprice: new FormControl(''),
    rentstart: new FormControl(''),
    rentend: new FormControl(''),
    rentwa: new FormControl(''),
    rentli: new FormControl(''),
    rentinsurance: new FormControl(''),
    rentother: new FormControl(''),
    renttotalprice: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }
  save() {
    console.log(this.registerForm.value);

  }
}
