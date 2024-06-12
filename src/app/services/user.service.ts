import { Injectable } from '@angular/core';
import { Observable, Observer, map, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [];

  constructor(private http: HttpClient) {
    this.http.get('https://dummyjson.com/users').subscribe((x) => {
      let u: User[] = [];
      for (let i = 0; i < x['users'].length; i++) {
        let user = x['users'][i];

        user.city = user['address']['city'];
        user.postalCode = user['address']['postalCode'];

        let options = user.firstName
          ? { params: new HttpParams().set('name', user.firstName) }
          : {};

        this.http.get('https://api.genderize.io', options).subscribe({
          next: (value) => {
            user.userGender = value['gender'];
          },
          error: (error) => {
            user.userGender = error['error']['error'] + ' :/';
          },
        });

        let adress = 'https://api.zippopotam.us/us/' + user.postalCode;

        this.http.get(adress).subscribe({
          next: (value) => {
            user.userCountry = value['country'];
          },
          error: (error) => {
            user.userCountry = 'unknown';
          },
        });
        u.push(user as User);
      }

      this.users = u;
    });
  }

  getUsers(): User[] {
    return this.users;
  }

  getUser(id): User {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == id) {
        return this.users[i];
      }
    }

    return null;
  }
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  username: string;
  birthDate: string;
  email: string;
  image: string;
  eyeColor: string;
  university: string;
  macAdress: string;
  ip: string;
  city: string;
  postalCode: string;
  userCountry: string;
  userGender: string;
  age: number;
}
