import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedsService } from 'src/app/shared/service/shareds.service';

@Component({
  selector: 'app-user-contract',
  templateUrl: './user-contract.component.html',
  styleUrls: ['./user-contract.component.css']
})
export class UserContractComponent implements OnInit {
  // pdfLoading: boolean;
  pdfSrc: any;
  rentId: any;
  taxInfo: any;
  constructor(private sharedsService: SharedsService,
    private router: Router) { }

  ngOnInit(): void {
    const tax: any = localStorage.getItem('taxInfo');
    this.taxInfo = JSON.parse(tax);
    console.log(this.taxInfo);
    this.getcontact(this.taxInfo.userId);
  }


  getcontact(userId: any) {
    this.sharedsService.getRentByUserId(userId).subscribe((res) => {
      this.rentId = res[0].rentId;
      this.sharedsService.generateBilldrugReport(this.rentId).subscribe(data => {
        console.log('report===>', data.url)
        if (data) {
          let url = data.url;
          this.pdfSrc = url;
        }
      });
    },
      (error) => {
        console.log('!!!!! Error invoce !!!!!', error);
      }
    );
  }

  pint() {
    this.sharedsService.generateBilldrugReport(this.rentId).subscribe(data => {
      console.log('report===>', data.url)
      if (data) {
        let url = data.url;
        window.open(url, "_blank");
      }
    });
  }


}
