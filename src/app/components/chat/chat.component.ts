import { Component, OnInit } from '@angular/core';
import { ChatService, ChatMessage } from '../../services/chat.service';

import { Router } from '@angular/router';

import { UserService, User } from '../../services/user.service';
import { StatsService } from '../../services/stats.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  constructor(
    public chatService: ChatService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private statsService: StatsService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  newMessage: string = '';
  id: number;
  user: User;
  private sub: any;

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });

    this.user = this.userService.getUser(this.id);
  }

  onSubmit(): void {
    let newMsg = this.newMessage;
    this.newMessage = '';
    newMsg = newMsg.trim();

    if (newMsg.trim() === '') {
      return;
    }

    this.statsService.addCharacters(newMsg);

    let sentMessage: ChatMessage = {
      sender: 'Me',
      message: newMsg,
      time: new Date(),
    };
    this.chatService.saveMessage(sentMessage);

    let observer = this.chatService.sendMessage(newMsg);
    observer.subscribe((x) => {
      console.log(x);
      let responseLength = x['json']['text'].length;
      let number = x['origin'].slice(-1);
      let response = 'A'.repeat(responseLength) + number;
      let responseMessage: ChatMessage = {
        sender: this.user.firstName + ' ' + this.user.lastName,
        message: response,
        time: new Date(),
      };
      this.chatService.saveMessage(responseMessage);
    });
  }

  endChat() {
    this.chatService.saveCurrentChat();
    this.sub.unsubscribe();
    this.router.navigate([{ outlets: { right: null } }], {
      relativeTo: this.route.parent,
    });
  }
}
