import { Component } from '@angular/core';
import { LoginService } from './_service/login.service';
import { NotFound404Service } from './_service/not-found404.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web-cashflow';

  constructor(public loginService: LoginService, public notFound404Service: NotFound404Service) { }

}
