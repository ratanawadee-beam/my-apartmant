import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/shared/service/admin.service';
import { SharedsService } from 'src/app/shared/service/shareds.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-usercontact',
  templateUrl: './usercontact.component.html',
  styleUrls: ['./usercontact.component.css']
})
export class UsercontactComponent implements OnInit {
  userId: any;
  listData: any;
  conCategory: any = ['1', '2'];
  localUrl: any;
  BASE64_MARKER = ';base64,';

  contactForm = this.userContact.group({
    roomId: [''],
    userId: [''],
    conId: [0],
    conName: [''],
    conLastname: [''],
    conPhone: [''],
    conCategory: [''],
    conText: [''],
  })

  constructor(
    private userContact: FormBuilder,
    private sharedsService: SharedsService,
    private adminService: AdminService,
    private router: Router,
    private _Activatedroute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const tax: any = localStorage.getItem('taxInfo');
    let taxInfo = JSON.parse(tax);
    console.log('Log  User  id >>>::', taxInfo);
    this.setDataForm(taxInfo);
    this.userId = this._Activatedroute.snapshot.paramMap.get("id");
    // this.getcontact(this.userId)
  }

  setDataForm(taxInfo: any) {
    console.log('LOG taxInfo', taxInfo)
    this.contactForm.patchValue({
      userId: taxInfo.userId,
      roleId: taxInfo.roleId,
      roomId: taxInfo.roomId,
      conName: taxInfo.userName,
      conLastname: taxInfo.userLasname,
      conPhone: taxInfo.userPhone,
    });
  }

  // getcontact(userId: any) {
  //   this.sharedsService.getRentByUserId(userId).subscribe((res) => {
  //     console.log('LOG show invoice', res[0]);
  //     let listData = res[0];
  //     this.contactForm.patchValue({
  //       rentId: listData.rent.rentId,
  //       userId: listData.rent.userId,
  //       roomId: listData.rent.roomId,
  //       roomTypename: listData.rent.room.roomTypename,
  //       userName: listData.rent.user.userName,
  //       userLasname: listData.rent.user.userLasname,
  //       totalRoom: listData.rent.room.roomPrice,
  //       deWaold: listData.rent.room.roomWater,
  //       deLiold: listData.rent.room.roomLight,
  //     });
  //   },
  //     (error) => {
  //       console.log('!!!!! Error invoce !!!!!', error);
  //     }
  //   );
  // }


  save() {
    let contact = {
      "conId": this.contactForm.value.conId,
      "conName": this.contactForm.value.conName,
      "conLastname": this.contactForm.value.conLastname,
      "conPhone": this.contactForm.value.conPhone,
      "conCategory": this.contactForm.value.conCategory,
      "conText": this.contactForm.value.conText,
      "roomId": this.contactForm.value.roomId,
      "userId": this.contactForm.value.userId,
    }
    this.sharedsService.saveContact(contact).subscribe(res => {
      if (res) {
        window.location.reload()
      }
    },
      (error) => console.log(error),
    );
    this.router.navigate(['user/contact']);
  }
//อัพไฟล์รูป

  showPreviewImage(file: any) {
    this.localUrl = file.target.files;
  }

  upload() {
    if (this.localUrl) {
      console.log(this.localUrl);
      const file: File | null = this.localUrl.item(0);
      console.log(file);
      this.adminService.uploadFile(file, '74').subscribe(data => {
        console.log('report===>', data)
      });
    }

  }


}

