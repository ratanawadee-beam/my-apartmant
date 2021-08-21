import { Component, OnInit } from '@angular/core';
import { SharedsService } from 'src/app/shared/service/shareds.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-admin-barangsewa',
  templateUrl: './admin-barangsewa.component.html',
  styleUrls: ['./admin-barangsewa.component.css']
})
export class AdminBarangsewaComponent implements OnInit {

  listRent: any;
 
  constructor(
    private sharedsService: SharedsService,
  ) { }

  ngOnInit(): void {
    // this.getRentData();
    // this.getUserData();
    this.faceData();
  }

  faceData() {
    this.sharedsService.getRent().subscribe(   
      (res) => {
        console.log('!!!!!! Rent Data !!!!!!',res)
        this.listRent = res;
      },
      (error) => {
        console.log('!!!!!! Rent Data !!!!!!',error);
      }
    );
  }
  
}
