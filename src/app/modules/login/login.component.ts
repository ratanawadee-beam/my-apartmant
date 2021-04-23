import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  homeService: any;

  constructor(private fb: FormBuilder, private router: Router) { }

  submitted = false;

  loginForm = this.fb.group({
    username: ['123', Validators.required],
    password: ['123', Validators.required]
  });

  ngOnInit(): void {

  }

  onSubmit() {
    debugger
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    
   
    //  sessionStorage.setItem('user_role', "ADMIN");
    // sessionStorage.setItem('user_role', "USER");
    // sessionStorage.setItem('user_role', "DOCTOR");
    alert('SUCCESS!! :-)')

    this.router.navigate(['home']).then(() => {
      window.location.reload()
    });


      this.homeService.$userType= of('admin');
      // // this.homeService.$userType = of('user');

  }

  get f() { return this.loginForm.controls; }

}
