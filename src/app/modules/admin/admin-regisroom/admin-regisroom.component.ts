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

  regisroomForm = this.fb.group({
    roomId: ['', Validators.required],
    roomTypename: ['', Validators.required],
    roomStatvs: ['', Validators.required],
    roomWater: [''],
    roomLight: [''],
    roomPrice: ['', Validators.required],
  })
  ngOnInit(): void {

  }

  roomsave() {
    this.sharedsService.saveRoom(this.regisroomForm.value).subscribe(
      (error) => console.log(error),
    );
    this.router.navigate(['admin/room']);
  }

  back() {
    this.router.navigate(['admin/room']);
  }

}
