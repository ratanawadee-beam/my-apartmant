import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomInterface } from 'src/app/shared/interface/sharedInterface';
import { SharedsService } from 'src/app/shared/service/shareds.service';
import { UserService } from 'src/app/shared/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {

  pdfSrc: any;

  userTitle: any = ['นาย', 'นาง', 'นางสาว'];
  userGender: any = ['ชาย', 'หญิง'];
  roomTypename: any = ['แอร์', 'พัดลม'];
  roomStatus: any = ['ว่าง', 'ไม่ว่าง'];

  Provinces: any;
  Amphurs: any;
  Districts: any;

  userId: any;
  listRoom: any;
  listRent: any;
  rentId: any;

  roomPrice: RoomInterface[] = [];
  roomWater: RoomInterface[] = [];
  roomLight: RoomInterface[] = [];
  roomId: RoomInterface[] = [];
  listRoomStatus: RoomInterface[] = [];

  submitted = false;

  cartUser = new Array();
  cartRegisrent = new Array();

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
    userLasname: ['', Validators.required],
    userBirthday: [''],
    userIdcard: ['', Validators.required],
    userPhone: [''],
    userGender: ['', Validators.required],
    userAddress: ['', Validators.required],
    userEmail: ['', Validators.required],
    zipCode: ['', Validators.required],

    districtId: [{ value: '', disabled: true },],
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
  })



  ngOnInit(): void {
    this.registerForm.controls['districtId'].disable();

    this.userService.getProvinceAll().subscribe(res => { this.Provinces = res; })
    this.userService.getAmphurAll().subscribe(res => { this.Amphurs = res; });
    // this.userService.getDistrictAll().subscribe(res => { this.Districts = res; });
    this.getRoomAll();
  }

  Next() {
    this.submitted = true;
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
      "districtId": this.registerForm.value.districtId,
      "roomId": this.registerForm.value.roomId,
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
      this.sharedsService.seveRent(bodySeveRent).subscribe(res => {
        console.log('LOG seveRent >>>::', res);
        this.sharedsService.generateBilldrugReport(res.rentId).subscribe(data => {
          console.log('report===>', data.url)
          if (data) {
            let url = data.url;
            window.open(url, "_blank");
            this.router.navigate(['admin/barangsewa']);
          }
        });
      },
        (error) => console.log(error),
      );
    },
      (error) => console.log(error),
    );
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
    this.router.navigate(['admin/barangsewa']);
  }

  changeUserZipCode(event: any) {
    const zipCode = event.target.value;
    console.log('zipCode' + zipCode);
    this.registerForm.controls['districtId'].enable();
    this.userService.getAllDistrict(zipCode).subscribe(res => { this.Districts = res; console.log('data :', res) });
    this.userService.getDistricByZipCode(zipCode).subscribe(res => {
        console.log(res)
        if (res) {
          this.registerForm.patchValue(
            {
              // district: res.districtNameTh,
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
  // userZipCode(event: any) {
  //   const zipCode = event.target.value;
  //   console.log('zipCode' + zipCode)
  //   this.userService.getDistricByZipCode(zipCode).subscribe(res => {
  //       console.log(res)
  //       if (res) {
  //         this.registerForm.patchValue(
  //           {
  //             district: res.districtNameTh,
  //             amphur: res.amphur.amphurNameTh,
  //             province: res.province.provinceNameTh
  //           }
  //         )
  //       }
  //     },
  //     error => {
  //       this.registerForm.patchValue(
  //         {
  //           district: '',
  //           amphur: '',
  //           province: ''
  //         }
  //       )
  //     }
  //   );
  // }

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
        this.selectStatus('1');
        console.log('!!!!!!!!!!!!! Room this.listRoom !!!!!!!!!!!', this.listRoomStatus)
      },
      (error) => {
        console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
      }
    );
  }

  selectType(event: any) {
    console.log('!! selectType !!', event);
    this.roomId = this.listRoomStatus;
    let x = this.roomId;
    return this.roomId = x.filter(i => String(i.roomTypename).indexOf(event) !== -1);
  }

  selectStatus(data: any) {
    this.listRoomStatus = this.listRoom;
    let x = this.listRoomStatus;
    return this.listRoomStatus = x.filter(i => String(i.roomStatus).indexOf(data) !== -1);
  }

  selectPrice(event: any) {
    console.log('!! selectPrice !!', event);
    this.listRoomStatus = this.listRoom;
    let x = this.listRoomStatus;
    this.roomPrice = x.filter(i => String(i.roomId).indexOf(event) !== -1)
    this.registerForm.controls.roomPrice.patchValue(this.roomPrice[0].roomPrice);
    return this.roomPrice;
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

  totalAmount() {
    let roomPrice = Number(this.registerForm.value.roomPrice);
    console.log('test', this.registerForm.value);
    let rentInsurance = Number(this.registerForm.value.rentInsurance);
    console.log('test', rentInsurance);
    let rentOther = Number(this.registerForm.value.rentOther);
    let rentTotalprice
    if (roomPrice > 0 || rentInsurance > 0 || rentOther > 0) {
      rentTotalprice = rentOther + roomPrice + rentInsurance;
      this.registerForm.controls.rentTotalprice.patchValue(rentTotalprice);
    } else {
      this.registerForm.controls.rentTotalprice.patchValue(null);
    }
  }
}
