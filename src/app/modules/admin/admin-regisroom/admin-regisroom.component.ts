import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedsService } from 'src/app/shared/service/shareds.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-regisroom',
  templateUrl: './admin-regisroom.component.html',
  styleUrls: ['./admin-regisroom.component.css']
})
export class AdminRegisroomComponent implements OnInit {

  submitted = false;
  roomTypename: any = ['แอร์', 'พัดลม'];
  roomStatus: any = ['1', '2'];

  constructor(
    private sharedsService: SharedsService,
    private fb: FormBuilder,
    private router: Router

  ) { }

  regisroomForm = this.fb.group({
    roomId: ['', Validators.required],
    roomTypename: ['', Validators.required],
    roomStatus: ['', Validators.required],
    roomWater: [''],
    roomLight: [''],
    roomPrice: ['', Validators.required],
  })
  ngOnInit(): void {

  }

  roomsave() {
    this.submitted = true;
    if (this.regisroomForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        text: '',
      })
      return;
    } else {
      Swal.fire({
        title: 'ยืนยันการทำรายการ',
        text: "ต้องการบันทึกห้องพักหรือไม่ ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#198754',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ปิด'
      }).then((result) => {
        if (result.isConfirmed) {
          this.sharedsService.saveRoom(this.regisroomForm.value).subscribe(res => {
            console.log('create Room res : ', res)
          });
          Swal.fire({
            icon: 'success',
            title: 'บันทึกข้อมูลสำเร็จ',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['admin/regisroom']);
            }
          })
        }
      })
    }
  }

  back() {
    this.router.navigate(['admin/room']);
  }

}
