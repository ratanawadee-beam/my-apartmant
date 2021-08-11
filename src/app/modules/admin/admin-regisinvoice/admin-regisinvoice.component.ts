import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-regisinvoice',
  templateUrl: './admin-regisinvoice.component.html',
  styleUrls: ['./admin-regisinvoice.component.css']
})
export class AdminRegisinvoiceComponent implements OnInit {
  invoiceForm = new FormGroup({
    invoiceId: new FormControl(''),
    roomName: new FormControl(''),
    userName: new FormControl(''),
    deTotalroom: new FormControl(''),
    deWaOld: new FormControl(''),
    deWaNew: new FormControl(''),
    deLiOld: new FormControl(''),
    deLiNew: new FormControl(''),
    invoiceStart: new FormControl(''),
    invoiceEnd: new FormControl(''),
    deTotalWa: new FormControl(''),
    deTotalLi: new FormControl(''),
    deTotalunitWa: new FormControl(''),
    deTotalunitLi: new FormControl(''),
    deTotal: new FormControl(''),

  });
  constructor(
    private router: Router 
  ) { }

  ngOnInit(): void {
  }

  save() {
    console.log(this.invoiceForm.value);

  }
  back(){
    this.router.navigate(['admin/rental']);
  }
}
