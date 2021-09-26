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
    private shardsService: SharedsService,
    private router: Router,
    private _Activatedroute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const tax: any = localStorage.getItem('taxInfo');
    let taxInfo = JSON.parse(tax);
    console.log('Log  Usercontact  id >>>::', taxInfo);
    this.getcontact(taxInfo);
  }

  getcontact(taxInfo: any) {
    console.log('LOG taxInfo contact >>:: ', taxInfo)
      this.contactForm.patchValue({
        userId: taxInfo.userId,
        conName: taxInfo.userName,
        userLassname: taxInfo.userLasname,
        conPhone: taxInfo.userPhone,
        roomId: taxInfo.roomId,
    })
  }

  save(){
    let contact = {
      "conId": this.contactForm.value.conId,
      "conName": this.contactForm.value.conName,
      "conPhone": this.contactForm.value.conPhone,
      "conText": this.contactForm.value.conText,
      "roomId": this.contactForm.value.roomId,
      "userId": this.contactForm.value.userId,
    }
    this.shardsService.saveContact(contact).subscribe(
      (error) => console.log(error),
    );
    this.router.navigate(['user/contact']);
  }

}

