import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/service/admin.service';
import { SharedsService } from 'src/app/shared/service/shareds.service';

@Component({
  selector: 'app-admin-rental',
  templateUrl: './admin-rental.component.html',
  styleUrls: ['./admin-rental.component.css']
})
export class AdminRentalComponent implements OnInit {
  listRent: any;
  constructor(
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
      },
      (error) => {
        console.log('!!!!!! Rent Data !!!!!!',error);
      }
    );
  }

  gotoRegis(data: any) {
    debugger
    this.router.navigate(['admin/regisinvoice/',data.rentId]);
  }

}
