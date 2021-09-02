import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedsService } from 'src/app/shared/service/shareds.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-admin-manage',
  templateUrl: './admin-manage.component.html',
  styleUrls: ['./admin-manage.component.css']
})
export class AdminManageComponent implements OnInit {
  data: any;
  listRent: any;
  listUser: any;
  listDatauser = [{}];
  constructor(
    private userService: UserService,
    private sharedsService: SharedsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // this.getUserData();
    this.faceData();
  }

  // getUserData() {
  //   this.userService.getUser().subscribe((res) => {
  //     console.log('!!!!!!!!!!res userData !!!!!!!!!!!!!!', res)
  //     this.listUser = res;
  //   },
  //     (error) => {
  //       console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
  //     }
  //   );
  // }
  faceData() {
    this.sharedsService.getRent().subscribe(   
      (res) => {
        console.log('!!!!!! Rent Data !!!!!!',res)
        this.listRent = res;
      },
      (error) => {
        console.log('!!!!!! Rent Data !!!!!!',error);
      }
    );
  }
  gotoedit(data: any){
    this.router.navigate(['admin/edituser', data.userId]);
  }
}
