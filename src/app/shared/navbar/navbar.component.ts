import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { MdcSnackbar } from '@angular-mdc/web';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(
    public authentication: AuthenticationService,
    public http: HttpClient,
  ) {}

  ngOnInit() {
    this.getUserBalance();
    this.getUserInfo();
  }

  getUserBalance(): void {
    this.http
      .post('http://35.187.154.29/endpoint/dev/getUserBalance.php', {
        username: this.authentication.username
      })
      .subscribe(
        res => {
          this.authentication.commB3Balance =
            res['x-value']['account']['balance'] -
            res['x-value']['account']['freeze-balance'];
        },
        err => {}
      );
  }

  getUserInfo(): void {
    this.http
      .post('http://35.187.154.29/endpoint/dev/getUserInfo.php', {
        username: this.authentication.username
      })
      .subscribe(
        res => {
          this.authentication.userInfo = res['x-value']['member'];
          this.authentication.nickname = this.authentication.userInfo[
            'nick-name'
          ];
        },
        err => {}
      );
  }
}
