import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { TOKEN_NAME } from '../_shared/var.constant';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const helper = new JwtHelperService();

    let res = this.loginService.activeSession();

    if (!res) {
      sessionStorage.clear();
      this.router.navigate(['login']);
      return false;
    } else {
      let token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)!);
      if (!helper.isTokenExpired(token.access_token)) {
        return true
      } else {
        sessionStorage.clear();
        this.router.navigate(['login']);
        return false;
      }
    }
  }
}
