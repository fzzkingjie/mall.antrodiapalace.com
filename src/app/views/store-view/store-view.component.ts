import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { MdcSnackbar } from '@angular-mdc/web';

@Component({
  selector: 'app-store-view',
  templateUrl: './store-view.component.html',
  styleUrls: ['./store-view.component.scss'],
  animations: [
    trigger('slideInR2L', [
      transition(':enter', [style({transform: 'translateX(100%)'}), animate('0.2s 0s ease-out', style({transform: 'translateX(0)'}))]),
      transition(':leave', [style({transform: 'translateX(0)'}), animate('0.2s 0s ease-out', style({transform: 'translateX(100%)'}))]),
    ])
  ]
})
export class StoreViewComponent implements OnInit {

  isCheckoutFormShown: boolean = false;
  checkoutInfo: object;

  constructor(
    public media: ObservableMedia,
    public http: HttpClient,
    public authentication: AuthenticationService,
    public snackbar: MdcSnackbar
  ) { }

  ngOnInit() {
    this.getUserBalance();
    this.getUserInfo();
  }

  getUserBalance(): void {
    this.http.post(
      'http://35.187.154.29/endpoint/dev/getUserBalance.php',
      {
        username: this.authentication.username
      }
    ).subscribe(
      res => {
        this.authentication.commB3Balance =
          res['x-value']['account']['balance'] - res['x-value']['account']['freeze-balance'];
      },
      err => {}
    );
  }

  getUserInfo(): void {
    this.http.post(
      'http://35.187.154.29/endpoint/dev/getUserInfo.php',
      {
        username: this.authentication.username
      }
    ).subscribe(
      res => {
        this.authentication.userInfo = res['x-value']['member'];
        this.authentication.nickname = this.authentication.userInfo['nick-name'];
      },
      err => {}
    );
  }

  checkout(checkoutInfo): void {
    this.http.post(
      // 'http://35.187.154.29/endpoint/dev/checkout.php',
      'http://192.168.18.197:8080/v1/mall',
      {
        userCode: this.authentication.username,
        consigneeName: checkoutInfo.name,
        consigneePhone: checkoutInfo.contact,
        consigneeAddress: checkoutInfo.address,
        advPassword: checkoutInfo.password
      }
    ).subscribe(
      res => {
        if (res['x-return'] === 0) {
          this.getUserBalance();
          setTimeout(() => { this.snackbar.show('购买成功。'); });
        } else {
          setTimeout(() => { this.snackbar.show('购买信息错误，请从新再输入。'); });
        }
        console.log(res);
      },
      err => {
        setTimeout(() => { this.snackbar.show('购买信息错误，请从新再输入。'); });
      }
    );
  }
}
