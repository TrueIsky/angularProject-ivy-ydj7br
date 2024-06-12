import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { StatsService } from '../../services/stats.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private statsService: StatsService
  ) {}

  ngOnInit() {}

  loginForm = this.formBuilder.group({
    username: '',
    password: '',
  });

  onSubmit(): void {
    this.authService.login(
      this.loginForm.value.username,
      this.loginForm.value.password
    );
    this.statsService.setCurrentTime();
    this.router.navigate([{ outlets: { main: ['main'] } }]);
  }
}
