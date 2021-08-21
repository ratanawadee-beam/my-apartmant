import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedsService } from 'src/app/shared/service/shareds.service';

@Component({
  selector: 'app-admin-information',
  templateUrl: './admin-information.component.html',
  styleUrls: ['./admin-information.component.css']
})
export class AdminInformationComponent implements OnInit {
  informForm = new FormGroup({
    checkFlag: new FormControl(''),
  });

  registerData: any;
  pdfSrc: any;
  constructor(
    private sharedsService: SharedsService,
    private router: Router) { }

  ngOnInit(): void {
    // this.registerData = this.sharedsService.gregisterData();
    this.pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
    let url = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
    window.open(url, "_blank");
    this.informForm = new FormGroup({
      checkFlag: new FormControl(['', Validators.required]),
    });
  }

  save(): any {
    if (this.checkValid()) {
      // console.log('LOG >>> :if: ');


      const email = sessionStorage.getItem('user_id');
      const phone = sessionStorage.getItem('phone');
      let user = email?.split('@', 1)
      let text = 'user :' + user + ' ' + 'pass :' + phone
      // service  email, '????' , text
      this.router.navigate(['admin/manage']);
    } else {
      // console.log('LOG >>> :else: ');
      return this.informForm.invalid;
    }
  }

  checkValid(): any {
    if (this.informForm.value.checkFlag) {
      console.log('LOG >>> :if: ', this.informForm.value.checkFlag);
      this.router.navigate(['admin/manage']);
    } else {
      console.log('LOG >>> :else: ', this.informForm.value.checkFlag);
      return this.informForm.invalid;
    }
  }
}
