import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {MatButtonModule} from '@angular/material/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{


  ngOnInit() {
    if (this.authService.isLoggedIn()) this.router.navigate(['./myTasks']).then(() => {});
  }
  constructor(
      private readonly formBuilder: NonNullableFormBuilder,
      readonly authService: AuthService,
      private readonly router: Router
  ) {}

  loginForm = this.formBuilder.group({
    username: this.formBuilder.control('', [Validators.required]),
    password: this.formBuilder.control('', [Validators.required]),
  });

  initiateLogin() {
    this.authService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value);
  }
}
