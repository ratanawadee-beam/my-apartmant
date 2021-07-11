import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-regisinvoice',
  templateUrl: './admin-regisinvoice.component.html',
  styleUrls: ['./admin-regisinvoice.component.css']
})
export class AdminRegisinvoiceComponent implements OnInit {
  invoiceForm = new FormGroup({
    qq: new FormControl(''),
    ww: new FormControl(''),
    ee: new FormControl(''),
    aa: new FormControl(''),
    ss: new FormControl(''),
    dd: new FormControl(''),
    ff: new FormControl(''),
    gg: new FormControl(''),
    hh: new FormControl(''),
  });
  constructor() { }

  ngOnInit(): void {
  }

  save() {
    console.log(this.invoiceForm.value);

  }
}
