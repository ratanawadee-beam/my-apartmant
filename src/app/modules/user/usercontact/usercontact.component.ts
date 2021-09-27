import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  contactForm = this.userContact.group({
    roomId: [''],
    userId: [''],
    conId: [0],
    conName: [''],
    conPhone: [''],
    conText: [''],
  })

  constructor(
    private userContact: FormBuilder,
    private sharedsService: SharedsService,
    private router: Router,
    private _Activatedroute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const tax: any = localStorage.getItem('taxInfo');
    let taxInfo = JSON.parse(tax);
    console.log('Log  User  id >>>::', taxInfo);
    this.setDataForm(taxInfo);
    this.userId = this._Activatedroute.snapshot.paramMap.get("id");
    this.getcontact(this.userId)
  }

  setDataForm(taxInfo: any) {
    console.log('LOG taxInfo', taxInfo)
    debugger
    this.contactForm.patchValue({
      userId: taxInfo.userId,
      roleId: taxInfo.roleId,
      roomId: taxInfo.roomId,
      conName: taxInfo.userName,
      userLassname: taxInfo.userLasname,
      conPhone: taxInfo.userPhone,
    });
  }

  getcontact(userId: any) {
    this.sharedsService.getRentByUserId(userId).subscribe((res) => {
      console.log('LOG show invoice', res);
      debugger
      let taxInfo = res;
      this.contactForm.patchValue({
        rentId: taxInfo.rent.rentId,
        userId: taxInfo.rent.userId,
        roomId: taxInfo.rent.roomId,
        roomTypename: taxInfo.rent.room.roomTypename,
        userName: taxInfo.rent.user.userName,
        userLasname: taxInfo.rent.user.userLasname,
        totalRoom: taxInfo.rent.room.roomPrice,
        deWaold: taxInfo.rent.room.roomWater,
        deLiold: taxInfo.rent.room.roomLight,
      });
    },
      (error) => {
        console.log('!!!!! Error invoce !!!!!', error);
      }
    );

  }


  save() {
    let contact = {
      "conId": this.contactForm.value.conId,
      "conName": this.contactForm.value.conName,
      "conPhone": this.contactForm.value.conPhone,
      "conText": this.contactForm.value.conText,
      "roomId": this.contactForm.value.roomId,
      "userId": this.contactForm.value.userId,
    }
    this.sharedsService.saveContact(contact).subscribe(
      (error) => console.log(error),
    );
    this.router.navigate(['user/contact']);
  }

}

