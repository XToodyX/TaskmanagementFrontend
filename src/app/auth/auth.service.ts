import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Token} from './Token';
import {ClaimEnum} from '../shared/ClaimEnum';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginError: boolean = false;
  constructor(private readonly router: Router,
              private readonly httpClient: HttpClient) {}

  isLoggedIn() {
    const token = localStorage.getItem('token'); // get token from local storage

    if (token != null) {
      const payload = atob(token.split('.')[1]); // decode payload of token
      const parsedPayload = JSON.parse(payload); // convert payload into an Object

      return parsedPayload.exp > Date.now() / 1000; // check if token is expired
    }
    this.router.navigate(['../login']).then(() => {});
    return false;
  }

  login(username: string, password: string) {
    this.httpClient.post<Token>('http://localhost:8080/api/v1/auth/authenticate', {username: username, password: password}, {}).subscribe({
        next: (response: Token) => {
            this.loginError = false;
            localStorage.setItem('token', response.token);
            this.router.navigate(['./myTasks']).then(() => {});
            return false;
        }, error: () => {
            this.loginError = true;
            return true;
        }
    });
  }

  getClaimsFromToken(): string[] {
    const token = localStorage.getItem('token'); // get token from local storage

    if (token != null) {
      const payload = atob(token.split('.')[1]); // decode payload of token
      return JSON.parse(payload).claims;
    }
    return [''];
  }

  hasClaim(claim: ClaimEnum) {
    return this.getClaimsFromToken().includes(claim);
  }
}

