import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HomeService } from 'src/app/shared/service/home.service';

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.css']
})
export class HomeLoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private router: Router,
    private homeService: HomeService,) { }

  submitted = false;

  loginForm = this.fb.group({
    username: ['123', Validators.required],
    password: ['123', Validators.required]
  });

  ngOnInit(): void {

  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return; 
    }

    //call login 
    this.homeService.loginByUsernamePassword(this.loginForm.value).subscribe((res) => {
      this.homeService.$taxInfo = of(res);
      sessionStorage.setItem('user_role', this.getRole(res.roleId));
      sessionStorage.setItem('user_id', res.userId), {}

      // this.router.navigate(['home']).then(() => {
      //   window.location.reload()
      // });
    },
      (error) => {
        // Swal.fire(
        //   'Login Fail!',
        //   'Username or Password Incorrect!',
        //   'question'
        // )
        alert('error!! :-)')
      });

  }

  getRole(roleId: any) {
    let role = '';
    switch (roleId) {
      case '1':
        role = 'admin';
        this.router.navigate(['admin/admin']).then(() => {
          // window.location.reload()
          const userType = 'admin';
          this.homeService.$userType = of(userType);
          this.router.navigate([`${userType}`]);
        });

        break;
      case '2':
        role = 'user';
        this.router.navigate(['user/home']).then(() => {
          // window.location.reload()

          const userType = 'user';
          this.homeService.$userType = of(userType);
          this.router.navigate([`${userType}`]);
        });
        break;

      default:
        // Swal.fire(
        //   'Login Fail!',
        //   'Role is Not Mapping in System!'
        // )
        alert('ERROR!! :-)')
        break;
    }
    alert(role)
    return role;
  }

  get f() { return this.loginForm.controls; }

}