import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomInterface } from 'src/app/shared/interface/sharedInterface';
import { SharedsService } from 'src/app/shared/service/shareds.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {

  userTitle: any = ['นาย', 'นาง', 'นางสาว'];
  userGender: any = ['ชาย', 'หญิง'];
  roomTypename: any = ['แอร์', 'พัดลม'];
  Provinces: any;
  Amphurs: any;
  Districts: any;
  roomId: any;
  userId: any;
  listRoom: any;
  roomPrice: RoomInterface[] = [];
  roomWater: RoomInterface[] = [];
  roomLight: RoomInterface[] = [];
  roomName: RoomInterface[] = [];
  // registerForm = new FormGroup({
  //   userTitle: new FormControl(''),
  //   userName: new FormControl(''),
  //   userLassname: new FormControl(''),
  //   userCardid: new FormControl(''),
  //   userBirthday: new FormControl(''),
  //   userGender: new FormControl(''),
  //   userPhone: new FormControl(''),
  //   userEmail: new FormControl(''),
  //   userAddress: new FormControl(''),
  //   // userOld: new FormControl(''),
  //   Provinceid: new FormControl(''),
  //   Amphurid: new FormControl(''),
  //   Districtid: new FormControl(''),
  //   zipcode: new FormControl(''),
  //   roomId: new FormControl(''),
  //   roomTypename: new FormControl(''),
  //   roomPrice: new FormControl(''),
  //   rentStart: new FormControl(''),
  //   rentEnd: new FormControl(''),
  //   rentWa: new FormControl(''),
  //   rentLi: new FormControl(''),
  //   rentInsurance: new FormControl(''),
  //   rentOther: new FormControl(''),
  //   rentTotalprice: new FormControl(''),
  // });

  constructor(
    private userService: UserService,
    private sharedsService: SharedsService,
    private router: Router,
    // private form: FormBuilder,
    private fb: FormBuilder,

  ) { }

  registerForm = this.fb.group({

    rentId: [0],
    rentStart: ['', Validators.required],
    rentEnd: ['', Validators.required],
    rentInsurance: ['', Validators.required],
    rentTotalprice: ['', Validators.required],
    rentOther: [''],
    userId: [0],
    userTitle: ['', Validators.required],
    userName: ['', Validators.required],
    userLasname: ['', Validators.required],
    userBirthday: [''],
    userIdcard: ['', Validators.required],
    userPhone: [''],
    userGender: ['', Validators.required],
    userAddress: ['', Validators.required],
    Provinceid: ['', Validators.required],
    Amphurid: ['', Validators.required],
    Districtid: ['', Validators.required],
    userEmail: ['', Validators.required],
    zipCode: ['', Validators.required],
    district: [{ value: '', disabled: true },],
    amphur: [{ value: '', disabled: true },],
    province: [{ value: '', disabled: true },],
    roomId: [0],
    roomName: ['', Validators.required],
    roomTypename: ['', Validators.required],
    roomPrice: ['', Validators.required],
    roomLight: [''],
    roomWater: [''],

    user: {
      userId: [0],
      userUsername: ['', Validators.required],
      userPassword: ['', Validators.required],
      userTitle: ['', Validators.required],
      userName: ['', Validators.required],
      userLasname: ['', Validators.required],
      userBirthday: [''],
      userIdcard: ['', Validators.required],
      userPhone: [''],
      userGender: ['', Validators.required],
      userAddress: ['', Validators.required],
      Provinceid: ['', Validators.required],
      Amphurid: ['', Validators.required],
      Districtid: ['', Validators.required],
      userEmail: ['', Validators.required],
      zipCode: ['', Validators.required],
      district: [{ value: '', disabled: true },],
      amphur: [{ value: '', disabled: true },],
      province: [{ value: '', disabled: true },],
      role: ['1'],

      rent: {
        rentId: [0],
        rentStart: ['', Validators.required],
        rentEnd: ['', Validators.required],
        rentInsurance: ['', Validators.required],
        rentTotalprice: ['', Validators.required],
        rentOther: [''],
        roomLight: [''],
        roomWater: [''],
        userId: [0],
        roomId: [0],
        user: [0],
        room: [0],
      },
      invoice: [0],
      roleId: ['1'],
    },

    room: {
      roomId: [0],
      roomName: ['', Validators.required],
      roomTypename: ['', Validators.required],
      roomPrice: ['', Validators.required],
      roomStatvs: ['', Validators.required],
    }

  })


  ngOnInit(): void {
    this.userService.getProvinceAll().subscribe(res => { this.Provinces = res; })
    this.userService.getAmphurAll().subscribe(res => { this.Amphurs = res; });
    this.userService.getDistrictAll().subscribe(res => { this.Districts = res; });
    this.getRoomAll();
  }



  Next() {
    this.userService.saveUser(this.registerForm.value).subscribe(
      (error) => console.log(error),
    );
    this.router.navigate(['admin/information']);
  }
  // usersave() {
  //   this.router.navigate(['admin/us']);
  // }
  // this.sharedsService.saveUser(this.registerForm.value).subscribe(
  //   (error) => console.log(error),
  //   );
  // console.log(this.registerForm.value.username);
  // this.sharedsService.sregisterData(this.registerForm.value.username);
  //   this.router.navigate(['admin/information']);
  // }
  back() {
    this.router.navigate(['admin/manage']);
  }

  userZipCode(event: any) {
    const zipCode = event.target.value;
    console.log('zipCode' + zipCode)
    this.userService.getDistricByZipCode(zipCode).subscribe(
      res => {
        console.log(res)
        if (res) {
          this.registerForm.patchValue(
            {
              district: res.districtNameTh,
              amphur: res.amphur.amphurNameTh,
              province: res.province.provinceNameTh
            }
          )
        }
      },
      error => {
        this.registerForm.patchValue(
          {
            district: '',
            amphur: '',
            province: ''
          }
        )
      }
    );
  }

  get userf() { return this.registerForm.controls; }

  //Room
  // getRoomData(event: any) {
  //   const roomName = event.target.value;
  //   console.log('roomName' + roomName)
  //   this.sharedsService.getRoom().subscribe(
  //     (res) => {
  //       console.log('!!!!!!!!!!!!! Room Data !!!!!!!!!!!', res)
  //       this.listRoom = res;
  //     },
  //     (error) => {
  //       console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
  //     }
  //   );
  // }

  getRoomAll() {
    this.sharedsService.getRoom().subscribe(
      (res) => {
        console.log('!!!!!!!!!!!!! Room Data !!!!!!!!!!!', res)
        this.listRoom = res;
      },
      (error) => {
        console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
      }
    );
  }

  selectType(event: any) {
    console.log('!! selectType !!', event);
    this.roomName = this.listRoom;
    let x = this.roomName;
    return this.roomName = x.filter(i => String(i.roomTypename).indexOf(event) !== -1);
  }

  selectPrice(event: any) {
    console.log('!! selectPrice !!', event);
    this.roomPrice = this.listRoom;
    let x = this.roomPrice;
    return this.roomPrice = x.filter(i => String(i.roomName).indexOf(event) !== -1);
  }

  selectWater(event: any) {
    console.log('!! selectPrice !!', event);
    this.roomWater = this.listRoom;
    let x = this.roomWater;
    return this.roomWater = x.filter(i => String(i.roomName).indexOf(event) !== -1);
  }
  
  selectLight(event: any) {
    console.log('!! selectPrice !!', event);
    this.roomLight = this.listRoom;
    let x = this.roomLight;
    return this.roomLight = x.filter(i => String(i.roomName).indexOf(event) !== -1);
  }

}
