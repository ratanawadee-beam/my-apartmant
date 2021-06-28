import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-contract',
  templateUrl: './user-contract.component.html',
  styleUrls: ['./user-contract.component.css']
})
export class UserContractComponent implements OnInit {
  // pdfLoading: boolean;
  pdfSrc: any;
  constructor() { }

  ngOnInit(): void {
    this.pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  
    // this.pdfSrc =  'assets/pdf/bw.pdf ';
    
  }

}
