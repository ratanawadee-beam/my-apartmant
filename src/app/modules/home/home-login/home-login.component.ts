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
    if (this.loginForm.invalid) {
      return;
    }
    const userType = 'user';
    this.homeService.$userType = of(userType);
    this.router.navigate([`${userType}`]);
  }

  get f() { return this.loginForm.controls; }

}