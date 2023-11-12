import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly router: Router) {}

  isLoggedIn() {
    const token = localStorage.getItem('token'); // get token from local storage

    if (token != null) {
      const payload = atob(token.split('.')[1]); // decode payload of token
      const parsedPayload = JSON.parse(payload); // convert payload into an Object

      return parsedPayload.exp > Date.now() / 1000; // check if token is expired
    }
    this.router.navigate(['./login']).then(() => {});
    return false;
  }

  login(username: string, password: string) {
    console.log('Username: ' + username);
    console.log('Password: ' + password);
  }
}

