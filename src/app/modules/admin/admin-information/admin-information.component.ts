import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedsService } from 'src/app/shared/service/shareds.service';

@Component({
  selector: 'app-admin-information',
  templateUrl: './admin-information.component.html',
  styleUrls: ['./admin-information.component.css']
})
export class AdminInformationComponent implements OnInit {
  informForm = new FormGroup({});
  registerData: any;
  pdfSrc: any;
  constructor(
    private sharedsService: SharedsService) { }

  ngOnInit(): void {
    // this.registerData = this.sharedsService.gregisterData();
    this.pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';

    console.log('LOG >>> :: this.registerData', this.registerData);
  }
  save() {
    console.log(this.informForm.value);

  }
}
