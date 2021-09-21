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
  userId: any;
  listRoom: any;
  listRent: any;
  roomPrice: RoomInterface[] = [];
  roomWater: RoomInterface[] = [];
  roomLight: RoomInterface[] = [];
  roomId: RoomInterface[] = [];
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
    userId: ['', Validators.required],
    userTitle: ['', Validators.required],
    userName: ['', Validators.required],
    userUserName: ['', Validators.required],
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
    roleId: ['user'],
    rentId: [0],
    rentStart: ['', Validators.required],
    rentEnd: ['', Validators.required],
    rentInsurance: ['', Validators.required],
    rentTotalprice: ['', Validators.required],
    rentOther: [''],
    rentLi: ['', Validators.required],
    rentWa: ['', Validators.required],
    roomId: ['', Validators.required],
    roomTypename: ['', Validators.required],
    roomPrice: ['', Validators.required],
    roomLight: [''],
    roomWater: [''],
  })


  ngOnInit(): void {
    this.userService.getProvinceAll().subscribe(res => { this.Provinces = res; })
    this.userService.getAmphurAll().subscribe(res => { this.Amphurs = res; });
    this.userService.getDistrictAll().subscribe(res => { this.Districts = res; });
    this.getRoomAll();
  }



  Next() {
    let bodySaveUser = {
      "roleId": this.registerForm.value.roleId,
      "userAddress": this.registerForm.value.userAddress,
      "userBirthday": this.registerForm.value.userBirthday,
      "userEmail": this.registerForm.value.userEmail,
      "userGender": this.registerForm.value.userGender,
      "userId": this.registerForm.value.userId,
      "userIdcard": this.registerForm.value.userIdcard,
      "userLasname": this.registerForm.value.userLasname,
      "userName": this.registerForm.value.userName,
      "userPassword": this.registerForm.value.userPassword,
      "userPhone": this.registerForm.value.userPhone,
      "userTitle": this.registerForm.value.userTitle,
      "userUserName": this.registerForm.value.userUserName,
      "zipCode": this.registerForm.value.zipCode,
    }
    this.userService.saveUser(bodySaveUser).subscribe(res => {
      console.log('LOG saveUser >>>::', res.userId);
      let bodySeveRent = {
        "rentEnd": this.registerForm.value.rentEnd,
        "rentId": this.registerForm.value.rentId,
        "rentInsurance": this.registerForm.value.rentInsurance,
        "rentOther": this.registerForm.value.rentOther,
        "rentStart": this.registerForm.value.rentStart,
        "rentWa": this.registerForm.value.rentWa,
        "rentLi": this.registerForm.value.rentLi,
        "rentTotalprice": this.registerForm.value.rentTotalprice,
        "roomId": this.registerForm.value.roomId,
        "userId": res.userId,
      }
      this.sharedsService.seveRent(bodySeveRent).subscribe(
        (error) => console.log(error),
      );
    },
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
    this.roomId = this.listRoom;
    let x = this.roomId;
    return this.roomId = x.filter(i => String(i.roomTypename).indexOf(event) !== -1);
  }

  selectPrice(event: any) {
    console.log('!! selectPrice !!', event);
    this.roomPrice = this.listRoom;
    let x = this.roomPrice;
    return this.roomPrice = x.filter(i => String(i.roomId).indexOf(event) !== -1);
  }

  selectWater(event: any) {
    console.log('!! selectPrice !!', event);
    this.roomWater = this.listRoom;
    let x = this.roomWater;
    return this.roomWater = x.filter(i => String(i.roomId).indexOf(event) !== -1);
  }

  selectLight(event: any) {
    console.log('!! selectPrice !!', event);
    this.roomLight = this.listRoom;
    let x = this.roomLight;
    return this.roomLight = x.filter(i => String(i.roomId).indexOf(event) !== -1);
  }
  getRentAll() {
    this.sharedsService.getRent().subscribe(
      (res) => {
        console.log('!!!!!!!!!!!!! Room Data !!!!!!!!!!!', res)
        this.listRent = res;
      },
      (error) => {
        console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
      }
    );
  }
}
