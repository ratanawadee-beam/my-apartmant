import { Component, OnInit } from '@angular/core';
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
  pdfSrc: any;

  constructor(
    private adminService: AdminService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const tax: any = localStorage.getItem('taxInfo');
    this.taxInfo = JSON.parse(tax);
    console.log(this.taxInfo);
    this.invoiceData(this.taxInfo.userId);
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

  gotoBill(userId: any){
    this.adminService.getinvoiceByuserId(userId).subscribe((res) => {
      this.inId = res[0].inId;
      this.adminService.generateBillPayment(this.inId).subscribe(data => {
        console.log('report===>', data.url)
        if (data) {
          let url = data.url;
          window.open(url, "_blank");
        }
      });
    },
      (error) => {
        console.log('!!!!! Error invoce !!!!!', error);
      }
    );
 
  }
  
  async chooseFile() {
    const { value: file } = await Swal.fire({
      title: 'แนบสลิป',
      input: 'file',
      inputAttributes: {
        'accept': 'image/*',
        'aria-label': 'Upload your profile picture'
      }
    })
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        Swal.fire({
          icon: 'success',
          title: 'แนปสลิปเสร็จสิ้น',
          showConfirmButton: false,
          timer: 1000
        })
      }
      reader.readAsDataURL(file)
    }
  }

}
