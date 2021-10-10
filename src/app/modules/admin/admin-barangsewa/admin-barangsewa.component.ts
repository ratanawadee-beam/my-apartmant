import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/service/admin.service';
import { SharedsService } from 'src/app/shared/service/shareds.service';
import { UserService } from 'src/app/shared/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-barangsewa',
  templateUrl: './admin-barangsewa.component.html',
  styleUrls: ['./admin-barangsewa.component.css']
})
export class AdminBarangsewaComponent implements OnInit {

  page = 1;
  count = 0;
  tableSize = 5;
  tableSizes = [3, 6, 9, 12];

  listRent2: any;
  listRent: any[] = [];
  rentForm = this.formBuilder.group({
    name: [''],
  });
  constructor(
    private formBuilder: FormBuilder,
    private sharedsService: SharedsService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.getRentData();
    // this.getUserData();
    this.faceData();
  }

  faceData() {
    this.sharedsService.getRent().subscribe(
      (res) => {
        console.log('!!!!!! Rent Data !!!!!!', res)
        this.listRent = res;
        this.listRent2 = res;
      },
      (error) => {
        console.log('!!!!!! Rent Data !!!!!!', error);
      }
    );
  }

  gotoedits(data: any) {
    this.router.navigate(['admin/barangsewaedit/', data.rentId]);
  }

  //delete
  deleteRent(item: any) {

    this.sharedsService.deleteRentByRentId(item.rentId).subscribe((res) => {
      console.log('LoG deleteRent', res);
      let saveinvoice = {
        roomId: item.roomId,
        roomLight: item.roomLight,
        roomPrice: item.roomPrice,
        roomStatus: "1",
        roomTypename: item.roomTypename,
        roomWater: item.roomWater,
      }
      this.sharedsService.updateStatus(saveinvoice).subscribe((res) => {
        console.log('LoG updateStatus', res);
        let body = {
          roleId: item.user.roleId,
          roomId: "1",
          userAddress: item.user.userAddress,
          userBirthday: item.user.userBirthday,
          userEmail: item.user.userEmail,
          userGender: item.user.userGender,
          userId: item.user.userId,
          userIdcard: item.user.userIdcard,
          userLasname: item.user.userLasname,
          userName: item.user.userName,
          userPassword: item.user.userPassword,
          userPhone: item.user.userPhone,
          userTitle: item.user.userTitle,
          userUsername: item.user.userUsername,
          districtId: item.user.districtId,
          zipCode: item.user.zipCode,
        }
        this.userService.upDateUser(body).subscribe((res) => {
          console.log('Log upDateUser', res);
          Swal.fire({
            title: 'ลบข้อมูลสัญญาเช่า?',
            text: "คุณต้องการลบข้อมูลสัญญาเช่าใช่หรือไม่!",
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
            setTimeout(function () { window.location.reload(); }, 2 * 1000);
            }
           
          })
        })
      })
      //
      // setTimeout(function () { window.location.reload(); }, 2 * 1000);
    },
      (error) => {
        console.log('delete Rent error : ', error);
      }
    );
  }

  pageChanged(event: any) {
    this.page = event;
    this.faceData();
  }

  SearchRoom() {

    console.log('!! selectType !!', event);
    this.listRent = this.listRent2;
    let x = this.listRent;
    return this.listRent = x.filter(i => String(i.room.roomId).indexOf(this.rentForm.value.name) !== -1);
  }

  // selectType(event: any) {
  //   console.log('!! selectType !!', event);
  //   this.roomId = this.listRoomStatus;
  //   let x = this.roomId;
  //   return this.roomId = x.filter(i => String(i.roomTypename).indexOf(event) !== -1);
  // }
}



