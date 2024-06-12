import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService, User } from '../../services/user.service';
import { StatsService } from '../../services/stats.service';
import { ChatService } from '../../services/chat.service';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  selectedUserId: number = null;
  user: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private statsService: StatsService,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    let userServiceUsers = this.userService.getUsers();
    let authorizedUserId = this.authService.getRegisteredUserId();

    for (let i = 0; i < userServiceUsers.length; i++) {
      if (userServiceUsers[i].id == authorizedUserId) {
        continue;
      } else {
        this.users.push(userServiceUsers[i]);
      }
    }
  }

  openIt(userId) {
    this.selectedUserId = userId;
    this.user = this.userService.getUser(userId);
  }

  showDetail() {
    this.router.navigate(
      [{ outlets: { middle: ['detail', this.selectedUserId] } }],
      {
        relativeTo: this.activatedRoute,
      }
    );
  }

  startChat() {
    this.statsService.addChats();
    this.chatService.saveCurrentChat();
    this.chatService.setUser(this.user.firstName + ' ' + this.user.lastName);
    this.router.navigate(
      [{ outlets: { right: ['chat', this.selectedUserId] } }],
      {
        relativeTo: this.activatedRoute,
      }
    );
  }
}
