import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedsService } from 'src/app/shared/service/shareds.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {
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
    useraddress1: new FormControl(''),
    Districtid1: new FormControl(''),
    Amphurid1: new FormControl(''),
    Provinceid1: new FormControl(''),
    zipcode1: new FormControl(''),
    username1: new FormControl(''),
    userlassname1: new FormControl(''),
    usercardid1: new FormControl(''),
    userbirthday1: new FormControl(''),
    usergender1: new FormControl(''),
    userold1: new FormControl(''),
    userphone1: new FormControl(''),
    useremail1: new FormControl(''),
    useraddress: new FormControl(''),
    Districtid: new FormControl(''),
    Amphurid: new FormControl(''),
    Provinceid: new FormControl(''),
    zipcode: new FormControl(''),
    roomflow: new FormControl(''),
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

  constructor(private sharedsService: SharedsService,
    private router: Router) { }

  ngOnInit(): void {
  }
  save() {
    console.log(this.registerForm.value.username);
    // this.sharedsService.sregisterData(this.registerForm.value.username);
    this.router.navigate(['admin/information']);
  }
}
