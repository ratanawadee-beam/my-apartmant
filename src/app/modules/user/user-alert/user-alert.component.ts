import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/service/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-alert',
  templateUrl: './user-alert.component.html',
  styleUrls: ['./user-alert.component.css']
})
export class UserAlertComponent implements OnInit {

  taxInfo: any;
  listInvoice: any;
  inId: any;
  userId: any
  pdfSrc: any;
  listpayment: any;
  selectData: any;



  constructor(
    private adminService: AdminService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const tax: any = localStorage.getItem('taxInfo');
    this.taxInfo = JSON.parse(tax);
    console.log(this.taxInfo);
    this.invoiceData(this.taxInfo.userId);
    // this.paymant(this.inId);
  }

  invoiceData(userId: any) {
    this.adminService.getinvoiceByuserId(userId).subscribe(
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
    console.log('test', data);
    // this.adminService.getinvoiceByuserId(userId).subscribe((res) => {  
    //   this.inId = res[0].inId;  
    this.adminService.generateBillPayment(data.inId).subscribe(data => {
      console.log('report===>', data.url)
      if (data) {
        let url = data.url;
        window.open(url, "_blank");
      }
    });
    // },
    //   (error) => {
    //     console.log('!!!!! Error invoce !!!!!', error);
    //   }
    // );
  }

  gotoupload(data: any){
    this.router.navigate(['user/upload',data.inId]);
  }
  // async chooseFile(e: any, data: any) {
  //   this.selectData = data;
  //   let localUrl;
  //   console.log('LOG >>>>>>>>>>>>>>>>>>>>::', localUrl);
  //   const { value: file } = await Swal.fire({
  //     title: 'แนบสลิป',
  //     input: 'file',
  //     inputAttributes: {
  //       'accept': 'image/*',
  //       'aria-label': 'Upload your profile picture'
  //     }
  //   })
  //   if (file) {
  //     console.log('LOG file >>>>>>>>>>>>>>>>>>>>::', file);
  //     // const reader = new FileReader()
  //     // reader.onload = (e) => {
  //     //   Swal.fire({
  //     //     icon: 'success',
  //     //     title: 'แนปสลิปเสร็จสิ้น',
  //     //     showConfirmButton: false,
  //     //     timer: 1000
  //     //   })
  //     // }
  //     // reader.readAsDataURL(file)
  //     console.log('LOG file 2 >>>>>>>>>>>>>>>>>>>>::', file);
  //     // console.log('LOG reader >>>>>>>>>>>>>>>>>>>>::', reader);
  //     const file1: File | null = file.name.item(0);
  //     console.log(file1);
  //     this.adminService.uploadFile(file, this.selectData.inId).subscribe(data => {
  //       console.log('report===>', data)
  //     });

  //   }
  // }

}
