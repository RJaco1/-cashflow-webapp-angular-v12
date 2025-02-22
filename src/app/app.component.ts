import { Component, ViewChild } from '@angular/core';
import { LoginService } from './_service/login.service';
import { NotFound404Service } from './_service/not-found404.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web-cashflow';
  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(public loginService: LoginService, public notFound404Service: NotFound404Service) { }

  logout(): void {
    this.loginService.logout();
    this.checkDrawer();
  }

  checkDrawer(): void {
    if (this.drawer.opened) this.drawer.toggle();
  }

}
