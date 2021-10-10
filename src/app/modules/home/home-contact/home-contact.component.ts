import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedsService } from 'src/app/shared/service/shareds.service';

@Component({
  selector: 'app-home-contact',
  templateUrl: './home-contact.component.html',
  styleUrls: ['./home-contact.component.css']
})
export class HomeContactComponent implements OnInit {
  
  contactFormhome = this.homeContact.group({
    roomId: [''],
    userId: [''],
    userName: ['', Validators.required],
    userPhone: [''],
    conId: [0],
    conName: [''],
    conPhone: [''],
    conText: [''],
  })

  
  constructor(
    private homeContact: FormBuilder,
    private sharedsService: SharedsService,
    private router: Router,
    
  ) { }

  ngOnInit(): void {
  }
  save(){
    let contact = {
      "conId": this.contactFormhome.value.conId,
      "conName": this.contactFormhome.value.conName,
      "conLastname": this.contactFormhome.value.conLastname,
      "conPhone": this.contactFormhome.value.conPhone,
      "conCategory": "1",
      "conText": this.contactFormhome.value.conText,
      "roomId": this.contactFormhome.value.roomId,
      "userId": this.contactFormhome.value.userId,
    }
    this.sharedsService.saveContact(contact).subscribe(res => {
      if (res) {
        window.location.reload()
      }
    },
      (error) => console.log(error),
    );
    this.router.navigate(['home/contact']);
  }

}
