import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/service/admin.service';
import { SharedsService } from 'src/app/shared/service/shareds.service';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent implements OnInit {

  page = 1;
  count = 0;
  tableSize = 5;
  tableSizes = [3, 6, 9, 12];

  
  
  listInvoice: any;
  listRent2: any;
  listRent: any[] = [];
  rentForm = this.formBuilder.group({
    name: [''],
  });
  constructor(
    private formBuilder: FormBuilder,
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
        console.log('!!!!!! Rent Data !!!!!!', res)
        this.listRent = res;
        this.listRent2 = res;
        
      },
      (error) => {
        console.log('!!!!!! Rent Data !!!!!!', error);
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

  gotoBill(data: any) {
    this.router.navigate(['admin/information/', data.userId]);
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
