import { AUTO_STYLE } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedsService } from 'src/app/shared/service/shareds.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-alert',
  templateUrl: './admin-alert.component.html',
  styleUrls: ['./admin-alert.component.css']
})
export class AdminAlertComponent implements OnInit {
  listcontact: any;
  imagePathSelected: any;


  contactForm = new FormGroup({
    inStatus: new FormControl(''),
  })
  constructor(
    private sharedsService: SharedsService,
  ) { }

  ngOnInit(): void {
    this.contactData();
  }

  contactData() {
    this.sharedsService.getAllcontact().subscribe(
      (res) => {
        console.log('Log contactData  :: ', res)
        this.listcontact = res;
      },
      (error) => {
        console.log('Error contactData :: ', error);
      }
    );
  }

  updateStatus(data: any) {
    console.log('data contactData', data);
    let savecontact = {
      conId: data.conId,
      conName: data.conName,
      conLastname: data.conLastname,
      conCategory: "2",
      conPhone: data.conPhone,
      conText: data.conText,
      roomId: data.roomId,
      userId: data.userId,
    }
    this.sharedsService.updateContact(savecontact).subscribe(res => {
      console.log('test', res);
      if (res) {
        window.location.reload()
      }
    },
      (error) => console.log('error', error),
    );
  }

  selectData(data: any) {
    Swal.fire({
      title: '',
      text: '',
      imageUrl: 'http://localhost:8090/apartmant-api/downLoadFile2?conId='+ data.conId,
      imageWidth: AUTO_STYLE,
      imageHeight: AUTO_STYLE,
      imageAlt: 'Custom image',
    })
  }
}
