import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLoginButtonClicked(username:  string, password: string) {
    this.authService.login(username, password).subscribe((res: HttpResponse<any>) => {
      console.log(res);
    })
  }

}
