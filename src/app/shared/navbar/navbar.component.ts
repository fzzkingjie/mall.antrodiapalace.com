import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { MdcSnackbar } from '@angular-mdc/web';
import { HttpClient } from '@angular/common/http';

import { LoadingService } from '../../tutorial/loading.service';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  nickname: string;
  commB3Balance: number;
  constructor(
    public authentication: AuthenticationService,
    public http: HttpClient,
    public loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.getUserBalance();
    this.getUserInfo();
  }

  getUserBalance(): void {
    this.authentication.getUserBalance().subscribe(
      res => {
        if (res.success) {
          this.commB3Balance =
            res.data["x-value"]["account"]["balance"] -
            res.data["x-value"]["account"]["freeze-balance"];
        }
      },
      err => {}
    );
  }

  getUserInfo(): void {
    this.authentication.getUserInfo().subscribe(
      res => {
        if (res.success) {
          this.nickname = res.data["x-value"]["member"]["nick-name"];
        }
      },
      err => {}
    );
  }
}
