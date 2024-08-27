import { Injectable } from '@angular/core';
import { HOST, TOKEN_AUTH_PASSWORD, TOKEN_AUTH_USERNAME, TOKEN_NAME } from '../_shared/var.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = `${HOST}/oauth/token`;

  constructor(private http: HttpClient, private router: Router) { }

  login(user: string, pass: string) {
    const body = `grant_type=password&username=${encodeURIComponent(user)}&password=${encodeURIComponent(pass)}`;

    return this.http.post(this.url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD))
    })
  }

  activeSession(): boolean {
    return sessionStorage.getItem(TOKEN_NAME) != null;
  }

  logout() {
    const access_token: string = JSON.parse(sessionStorage.getItem(TOKEN_NAME)!).access_token;
    this.http.get(`${HOST}/users/revoke/${access_token}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    }).subscribe(data => {
      sessionStorage.clear();
      this.router.navigate(["login"]);
    });
  }
}
