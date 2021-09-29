import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/service/admin.service';
import { SharedsService } from 'src/app/shared/service/shareds.service';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent implements OnInit {

  listRent: any;
  listInvoice: any;

  constructor(
    private adminService: AdminService,
    private sharedsService: SharedsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.invoiceData();
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

  invoiceData() {
    this.adminService.getAllInvoice().subscribe(
      (res) => {
        console.log('Log invoice Data :: ', res)
        this.listInvoice = res;
      },
      (error) => {
        console.log('Error invoice Data :: ', error);
      }
    );
  }
  
  gotoBill(data: any){
    this.router.navigate(['admin/information/',data.userId]);
   }
}
