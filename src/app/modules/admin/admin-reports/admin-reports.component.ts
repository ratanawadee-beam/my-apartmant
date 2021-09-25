import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/service/admin.service';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent implements OnInit {

  listInvoice: any;
  constructor(
    private adminService: AdminService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.invoiceData();
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
  gotoBill(){
    this.router.navigate(['admin/bill']);
   }
}
