import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HomeService } from './shared/service/home.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public userType: string | undefined;
  idleState = 'Not started.';
  isLogin: Boolean = false;
  timedOut = false;
  lastPing?: Date = undefined;
  title = 'my-apartmant';

  constructor(
    private homeService: HomeService,
    private router: Router,
    private permissionsService: NgxPermissionsService,
    private idle: Idle,
    private keepalive: Keepalive,
  ) {
    homeService.$userType.subscribe(data => {
      console.log('LOGGGG >>> :: userType ::', data);
      this.userType = data;
      // if (data === 'admin') {
      //   this.userType = data;
      // } else if (data === 'user') {
      //   this.userType = data;
      // } else {
      //   this.userType = 'home'
      // }
    });
  }

  ngOnInit(): void {

    this.homeService.$userType = of('home');
  }
  logOut() {
    const userType = 'home';
    this.homeService.$userType = of(userType);
    this.router.navigate([`${userType}`]);

  }
  initRolePermission() {
    const user_role = sessionStorage.getItem('user_role');
    const role: string = (user_role != null && user_role != undefined) ? user_role : '';
    this.isLogin = role ? true : false;
    this.permissionsService.addPermission(role);
  }

  setIdle() {
    const user_role = sessionStorage.getItem('user_role');
    if (user_role) {
      console.log('start')
      // sets an idle timeout of 5 seconds, for testing purposes.
      this.idle.setIdle(20);
      // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
      this.idle.setTimeout(20);
      // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
      this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

      this.idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
      this.idle.onTimeout.subscribe(() => {
        this.idleState = 'Timed out!';
        this.timedOut = true;
      });
      this.idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
      this.idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

      // sets the ping interval to 15 seconds
      this.keepalive.interval(15);
      this.keepalive.onPing.subscribe(() => this.lastPing = new Date());
      console.log('end')
      this.reset();
    }
  }
  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  setHome() {
    this.homeService.$userType = of('home');
  }

  setAdmin() {
    this.homeService.$userType = of('admin');
  }

  setUser() {
    this.homeService.$userType = of('user');
  }
}