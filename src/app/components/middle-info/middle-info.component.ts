import { Component, OnInit } from '@angular/core';
import { ChatService, ChatMessage, Chat } from '../../services/chat.service';

@Component({
  selector: 'app-middle-info',
  templateUrl: './middle-info.component.html',
  styleUrls: ['./middle-info.component.css'],
})
export class MiddleInfoComponent implements OnInit {
  chats;
  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chats = this.chatService.getChatHistory().slice().reverse();
  }
}
