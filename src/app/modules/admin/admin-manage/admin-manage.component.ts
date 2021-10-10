import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedsService } from 'src/app/shared/service/shareds.service';
import { UserService } from 'src/app/shared/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-manage',
  templateUrl: './admin-manage.component.html',
  styleUrls: ['./admin-manage.component.css']
})
export class AdminManageComponent implements OnInit {

  page = 1;
  count = 0;
  tableSize = 6;
  tableSizes = [3, 6, 9, 12];

  data: any;
  listRent: any;
  userId: any;
  listDatauser = [{}];

  listuser2: any;
  listUser: any[] = [];
  userForm = this.formBuilder.group({
    name: [''],
  });
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private sharedsService: SharedsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUserData();
    // this.faceData();
  }

  getUserData() {
    this.userService.getUser().subscribe(
      (res) => {
        console.log('!!!!!!!!!!res userData !!!!!!!!!!!!!!', res)
        this.listUser = res;
        this.listuser2 = res;
        
      },
      (error) => {
        console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
      }
    );
  }

  // faceData() {
  //   this.sharedsService.getRent().subscribe(   
  //     (res) => {
  //       console.log('!!!!!! Rent Data !!!!!!',res)
  //       this.listRent = res;
  //     },
  //     (error) => {
  //       console.log('!!!!!! Error Rent Data !!!!!!',error);
  //     }
  //   );
  // }

  //edit user
  gotoedit(data: any) {
    this.router.navigate(['admin/edituser', data.userId]);
  }

  //deleteuser
  delete(item: any) {
    this.userService.deleteUserByUserId(item.userId).subscribe(res => {
      console.log(res);
      Swal.fire({
        title: 'ลบข้อมูลผู้ใช้งาน?',
        text: "คุณต้องการลบข้อมูลผู้ใช้งานใช่หรือไม่!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
      setTimeout(function () { window.location.reload(); }, 2 * 1000);
    },
      (error) => {
        console.log('delete User error : ', error);
      }
    );
  }

  pageChanged(event: any) {
    this.page = event;
    this.getUserData();
  }
  
  SearchUser(){
    console.log('!! selectType !!', event);
    this.listUser = this.listuser2;
    let x = this.listUser;
    return this.listUser = x.filter(i => String(i.userIdcard).indexOf(this.userForm.value.name) !== -1);
  }

  gotoRegist(data: any){
    this.router.navigate(['admin/register', data.userId]);
  }
}
