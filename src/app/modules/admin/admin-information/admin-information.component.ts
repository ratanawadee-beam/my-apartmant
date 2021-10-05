import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/shared/service/admin.service';
import { SharedsService } from 'src/app/shared/service/shareds.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-admin-information',
  templateUrl: './admin-information.component.html',
  styleUrls: ['./admin-information.component.css']
})
// export class AdminInformationComponent implements OnInit {
//   informForm = new FormGroup({
//     checkFlag: new FormControl(''),
//   });

//   registerData: any;
//   pdfSrc: any;
//   constructor(
//     private sharedsService: SharedsService,
//     private router: Router) { }

//   ngOnInit(): void {
//     // this.registerData = this.sharedsService.gregisterData();

//     const rentId: any = localStorage.getItem('rentId');
//     console.log('report===>', rentId)
//     this.sharedsService.generateBilldrugReport(rentId).subscribe(data => {
//       console.log('report===>', data.url)
//       if (data) {
//         // let pdf = window.URL.createObjectURL(new Blob([data.url], { type: 'application/pdf' }))
//         this.pdfSrc = data.url;
//         let url = data.url;
//         window.open(url, "_blank");
//       }
//     });
//     this.informForm = new FormGroup({
//       checkFlag: new FormControl(['', Validators.required]),
//     });
//   }

//   save(): any {
//     if (this.checkValid()) {
//       // console.log('LOG >>> :if: ');


//       const email = sessionStorage.getItem('user_id');
//       const phone = sessionStorage.getItem('phone');
//       let user = email?.split('@', 1)
//       let text = 'user :' + user + ' ' + 'pass :' + phone
//       // service  email, '????' , text
//       this.router.navigate(['admin/manage']);
//     } else {
//       // console.log('LOG >>> :else: ');
//       return this.informForm.invalid;
//     }
//   }

//   checkValid(): any {
//     if (this.informForm.value.checkFlag) {
//       console.log('LOG >>> :if: ', this.informForm.value.checkFlag);
//       this.router.navigate(['admin/manage']);
//     } else {
//       console.log('LOG >>> :else: ', this.informForm.value.checkFlag);
//       return this.informForm.invalid;
//     }
//   }
// }

export class AdminInformationComponent implements OnInit {

  page = 1;
  count = 0;
  tableSize = 5;
  tableSizes = [3, 6, 9, 12];

  listInvoice: any;
  userId: any;
  pdfSrc: any;
  inId: any;

  inforForm = this.report.group({
    userId: [0],
    roomId: ['', Validators.required],
    userName: ['', Validators.required],
    userLasname: ['', Validators.required],
    userIdcard: ['', Validators.required],
    userPhone: [''],
    userEmail: ['', Validators.required],
  });

  constructor(
    private report: FormBuilder,
    private adminService: AdminService,
    private userService: UserService,
    private sharedsService: SharedsService,
    private _Activatedroute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.userId = this._Activatedroute.snapshot.paramMap.get("id");
    this.getUserById(this.userId);
    this.getinvoice(this.userId);
  }

  getUserById(userId: any) {
    this.userService.getUserById(userId).subscribe((res) => {
      console.log('!!!!!!!!!!!!res data!!!!!!!!!!!!', res)
      this.inforForm.patchValue({
        userId: userId,
        userName: res.userName,
        userLasname: res.userLasname,
        userIdcard: res.userIdcard,
        userPhone: res.userPhone,
        userEmail: res.userEmail,
        roomId: res.roomId,
      });   
    },
      (error) => {
        console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
      }

    );
  }
  getinvoice(userid: any){
    this.adminService.getinvoiceByuserId(userid).subscribe((res) => {
      console.log('Log invoiceUserid >>::', res);
        this.listInvoice = res;   
    },
    (error) => {
      console.log('Error invoiceUserId >>:: ', error);
    }
    );
  }



  back() {
    this.router.navigate(['admin/reports']);
  }

  gotoReport() {
    // this.adminService.generateBillPayment(this.inId).subscribe(data => {
    //   console.log('report===>', data.url)
    //   if (data) {
    //     let url = data.url;
    //     window.open(url, "_blank");
    //   }
    // });
  }

  pageChanged(event: any) {
    this.page = event;
    this.getinvoice(this.userId);
  }
}
