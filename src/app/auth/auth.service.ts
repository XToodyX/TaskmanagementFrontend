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
    const token: string | null = localStorage.getItem('token'); // get token from local storage

    if (token != null) {
      const payload = atob(token.split('.')[1]); // decode payload of token
      const parsedPayload = JSON.parse(payload); // convert payload into an Object

      if (parsedPayload.exp > Date.now() / 1000) { // check if token is expired
        return true;
      }
      localStorage.removeItem('token'); // remove token from local storage
    }
    return false;
  }

  login(username: string, password: string) {
    this.httpClient.post<Token>('http://localhost:8080/api/v1/auth/authenticate', {username: username, password: password}, {}).subscribe({
        next: (response: Token) => {
            this.loginError = false;
            localStorage.setItem('token', response.token);
            this.router.navigate(['./tasks']).then(() => {});
            return false;
        }, error: () => {
            this.loginError = true;
            return true;
        }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['./login']).then(() => {});
  }

  getClaimsFromToken(): string[] {
    const token: string | null = localStorage.getItem('token'); // get token from local storage

    if (token != null) {
      const payload = atob(token.split('.')[1]); // decode payload of token
      return JSON.parse(payload).authorities;
    }
    return [''];
  }

  hasClaim(claim: ClaimEnum) {
    return this.getClaimsFromToken().includes(claim);
  }
}

