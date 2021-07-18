import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-admin-manage',
  templateUrl: './admin-manage.component.html',
  styleUrls: ['./admin-manage.component.css']
})
export class AdminManageComponent implements OnInit {
  listUser: any;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserData();
  }
  
  getUserData() {
    this.userService.getUser().subscribe((res) => {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!', res)
      this.listUser = res;
    },
      (error) => {
        console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
      }
    );
  }
}
