import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HomeService } from './shared/service/home.service';
// import { NgxPermissionsService } from 'ngx-permissions';
// import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
// import { Keepalive } from '@ng-idle/keepalive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public userType: string | undefined;
  public taxInfo: any;
  idleState = 'Not started.';
  isLogin: Boolean = false;
  timedOut = false;
  lastPing?: Date = undefined;
  title = 'my-apartmant';

  constructor(
    private homeService: HomeService,
    private router: Router,
  ) {
    homeService.$taxInfo.subscribe(data => {
      console.log('LOGGGG >>> :: taxInfo !!! ::', data);
      this.taxInfo = data;
      this.userType = data.roleId;
    });
    homeService.$userType.subscribe(data => {
      console.log('LOGGGG >>> :: userType ::', data);
      this.userType = data;
    });

  }

  ngOnInit(): void {
    const uType = localStorage.getItem('userType');
    const tax: any = localStorage.getItem('taxInfo');
    let taxInfo = JSON.parse(tax);
    if (taxInfo) {
      if (taxInfo.roleId == 'admin' || taxInfo.roleId == 'user') {
        this.userType = taxInfo.roleId;
      } else {
        if (uType) {
          this.homeService.$userType = of(JSON.parse(uType));
        } else {
          const userType = {
            roleId: 'home'
          }
          this.homeService.$userType = of('home');
          this.homeService.$taxInfo = of(userType);
        }
      }
    } else {
      if (uType) {
        this.homeService.$userType = of(JSON.parse(uType));
      } else {
        const userType = {
          roleId: 'home'
        }
        this.homeService.$userType = of('home');
        this.homeService.$taxInfo = of(userType);
      }
    }
  }

  home() {
    this.router.navigate(['home']);
  }

  logIn() {
    this.router.navigate(['home/login']);
  }

  logOut() {
    this.router.navigate(['home']).then(() => {
      const userType = {
        roleId: 'home'
      }
      localStorage.clear();
      this.homeService.$userType = of(userType.roleId);
      this.router.navigate([`${userType.roleId}`]);
      window.location.reload();
    });
  }

}