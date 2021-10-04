import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedsService } from 'src/app/shared/service/shareds.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-admin-barangsewa',
  templateUrl: './admin-barangsewa.component.html',
  styleUrls: ['./admin-barangsewa.component.css']
})
export class AdminBarangsewaComponent implements OnInit {

  page = 1;
  count = 0;
  tableSize = 5;
  tableSizes = [3, 6, 9, 12];

  listRent: any;
 
  constructor(
    private sharedsService: SharedsService,
    private router: Router
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
  
  gotoedits(data: any){
    this.router.navigate(['admin/barangsewaedit/',data.rentId]);
  }

  //delete
  deleteRent(item: any){
    this.sharedsService.deleteRentByRentId(item.rentId).subscribe(
      (res) => {
        console.log(res);
        setTimeout(function () {window.location.reload(); }, 2 * 1000);
      },
      (error) => {
        console.log('delete Rent error : ', error);
      }
    );
  }
  
  pageChanged(event: any) {
    this.page = event;
    this.faceData();
  }
}
