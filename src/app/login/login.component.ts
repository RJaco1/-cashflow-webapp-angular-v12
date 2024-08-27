import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: string = '';
  pass: string = '';

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    if (this.loginService.activeSession()) {
      this.router.navigate(['home'])
    } else {
      sessionStorage.clear();
    }
  }

  onSubmit() {
    this.loginService.login(this.user, this.pass).subscribe(token => {
      if (token) {
        sessionStorage.setItem('access_token', JSON.stringify(token));
        this.router.navigate(['home'])
      }
    });
  }

}
