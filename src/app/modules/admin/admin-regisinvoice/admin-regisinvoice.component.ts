import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-regisinvoice',
  templateUrl: './admin-regisinvoice.component.html',
  styleUrls: ['./admin-regisinvoice.component.css']
})
export class AdminRegisinvoiceComponent implements OnInit {
  invoiceForm = new FormGroup({
    invoice_id: new FormControl(''),
    room_id: new FormControl(''),
    user_name: new FormControl(''),
    de_totalroom: new FormControl(''),
    de_wa_old: new FormControl(''),
    de_wa_new: new FormControl(''),
    de_li_old: new FormControl(''),
    de_li_new: new FormControl(''),
    invoice_start: new FormControl(''),
    invoice_end: new FormControl(''),
    de_total_wa: new FormControl(''),
    de_total_li: new FormControl(''),
    de_totalunit_wa: new FormControl(''),
    de_totalunit_li: new FormControl(''),
    de_total: new FormControl(''),
  });
  constructor() { }

  ngOnInit(): void {
  }

  save() {
    console.log(this.invoiceForm.value);

  }
}
