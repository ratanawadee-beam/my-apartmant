import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedsService } from 'src/app/shared/service/shareds.service';


@Component({
  selector: 'app-admin-regisroom',
  templateUrl: './admin-regisroom.component.html',
  styleUrls: ['./admin-regisroom.component.css']
})
export class AdminRegisroomComponent implements OnInit {

  roomTypename: any = ['แอร์', 'พัดลม'];
  roomStatvs: any = ['ว่าง', 'ไม่ว่าง'];

  constructor(
    private sharedsService: SharedsService,
    private fb: FormBuilder,
    private router: Router

  ) { }
  submitted = false;

  regisroomForm = this.fb.group({
    roomId: [0],
    roomName: ['', Validators.required],
    roomTypename: ['', Validators.required],
    roomStatvs: ['', Validators.required],
    roomWater: [''],
    roomLight: [''],
    roomPrice: ['', Validators.required],
  })
  ngOnInit(): void {

  }

  save() {
  this.submitted = true;
  this.sharedsService.saveRoom(this.regisroomForm.value).subscribe(res => {
    console.log('Create Room res : ', res)
  });
  this.router.navigate(['admin/room']);
  }

  back() {
    this.router.navigate(['admin/room']);
  }

}
