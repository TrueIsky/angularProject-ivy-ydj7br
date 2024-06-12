import { Component, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { StatsService } from '../../services/stats.service';
import { User, UserService } from '../../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  clicks: number = 0;
  loggedUser: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public statsService: StatsService
  ) {}

  @HostListener('document:click', ['$event'])
  public documentClick(event: Event): void {
    this.statsService.addClick();
  }

  ngOnInit() {
    this.loggedUser = this.userService.getUser(
      this.authService.getRegisteredUserId()
    );
  }

  logout(event) {
    let logoutMessage: string =
      'You were logged for ' +
      this.statsService.getTimeDifference() +
      ' started ' +
      this.statsService.numberOfChats +
      ' chats, wrote ' +
      this.statsService.characters +
      ' characters and clicked ' +
      this.statsService.clicks +
      ' times';
    alert(logoutMessage);
    this.statsService.reset();
    this.authService.logout();
    this.router.navigate([{ outlets: { main: ['login'] } }]);
  }
}
