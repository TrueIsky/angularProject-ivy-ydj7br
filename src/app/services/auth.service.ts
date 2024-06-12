import { Injectable } from '@angular/core';
import { UserService, User } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users: User[] = [];
  isGut: boolean = false;
  regUserId: number = null;

  constructor(private userService: UserService) {
    this.isGut = false;
  }

  login(username: string, password: string) {
    this.users = this.userService.getUsers();

    for (let i = 0; i < this.users.length; i++) {
      if (
        (this.users[i].firstName == username&&
        this.users[i].lastName == password) 
        ){
        this.isGut = true;
        this.regUserId = this.users[i].id;
        return true;
      }
    }
    this.isGut = false;
    return false;
  }

  auth() {
    return this.isGut;
  }

  getRegisteredUserId() {
    return this.regUserId;
  }

  logout() {
    this.isGut = false;
    this.regUserId = null;
  }
}
