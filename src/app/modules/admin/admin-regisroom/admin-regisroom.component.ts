import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-admin-regisroom',
  templateUrl: './admin-regisroom.component.html',
  styleUrls: ['./admin-regisroom.component.css']
})
export class AdminRegisroomComponent implements OnInit {
  regisroomForm = new FormGroup({ 
    room_id: new FormControl(''),
    room_typename: new FormControl(''),
    room_statvs: new FormControl(''),
    room_water: new FormControl(''),
    room_light: new FormControl(''),
    room_price: new FormControl(''),
   
  });
  constructor() { }

  ngOnInit(): void {
  }

  save() {
    console.log(this.regisroomForm.value);

  }
}
