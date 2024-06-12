import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class ChatService {
  constructor(private http: HttpClient) {}

  chatHistory: any[] = [];
  currentChat: ChatMessage[] = [];
  username: string = '';

  sendMessage(message: string) {
    return this.http.post('https://httpbin.org/post', { text: message });
  }

  getChatHistory() {
    return this.chatHistory;
  }

  saveMessage(message: ChatMessage) {
    this.currentChat.push(message);
  }

  setUser(name: string) {
    this.username = name;
  }

  saveCurrentChat(): void {
    if (this.currentChat.length !== 0) {
      let chat: Chat = { history: this.currentChat, user: this.username };
      this.chatHistory.push(chat);
      this.currentChat = [];
      this.username = '';
    }
  }
}

export interface ChatMessage {
  sender: string;
  message: string;
  time: Date;
}

export interface Chat {
  history: any[];
  user: string;
}
