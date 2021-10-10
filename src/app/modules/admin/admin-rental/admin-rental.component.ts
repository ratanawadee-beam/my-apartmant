import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/service/admin.service';
import { SharedsService } from 'src/app/shared/service/shareds.service';

@Component({
  selector: 'app-admin-rental',
  templateUrl: './admin-rental.component.html',
  styleUrls: ['./admin-rental.component.css']
})
export class AdminRentalComponent implements OnInit {
  
  page = 1;
  count = 0;
  tableSize = 5;
  tableSizes = [3, 6, 9, 12];

  listRent2: any;
  listRent: any[] = [];
  rentForm = this.formBuilder.group({
    name: [''],
  });
  constructor(
    private formBuilder: FormBuilder,
    private sharedsService: SharedsService,
    private router: Router,
    
  ) { }

  ngOnInit(): void {
    this.faceData();

  }
  faceData() {
    this.sharedsService.getRent().subscribe(   
      (res) => {
        console.log('!!!!!! Rent Data !!!!!!',res)
        this.listRent = res;
        this.listRent2 = res;
      },
      (error) => {
        console.log('!!!!!! Rent Data !!!!!!',error);
      }
    );
  }

  gotoRegis(data: any) {
    this.router.navigate(['admin/regisinvoice/',data.rentId]);
  }

  pageChanged(event: any) {
    this.page = event;
    this.faceData();
  }
    
  SearchRoom() {

    console.log('!! selectType !!', event);
    this.listRent = this.listRent2;
    let x = this.listRent;
    return this.listRent = x.filter(i => String(i.room.roomId).indexOf(this.rentForm.value.name) !== -1);
  }
}
