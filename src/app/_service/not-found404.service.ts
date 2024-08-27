import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotFound404Service {

  constructor(private router: Router) { }

  isPageNotFound(): boolean {
    let allRoutes = this.router.config;
    let currentUrl = this.router.url;
    return !allRoutes.filter(e => `/${e.path}` === currentUrl).map(e => `/${e.path}`).includes(currentUrl);
  }

}
