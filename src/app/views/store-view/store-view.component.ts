import { NavbarComponent } from './../../shared/navbar/navbar.component';
import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Http, Headers } from '@angular/http';
import { AuthenticationService } from '../../services/authentication.service';
import { MdcSnackbar } from '@angular-mdc/web';

import { LoadingService } from '../../tutorial/loading.service';
import 'rxjs/Rx';

@Component({
  selector: "app-store-view",
  templateUrl: "./store-view.component.html",
  styleUrls: ["./store-view.component.scss"],
  animations: [
    trigger("slideInR2L", [
      transition(":enter", [
        style({ transform: "translateX(100%)" }),
        animate("0.2s 0s ease-out", style({ transform: "translateX(0)" }))
      ]),
      transition(":leave", [
        style({ transform: "translateX(0)" }),
        animate("0.2s 0s ease-out", style({ transform: "translateX(100%)" }))
      ])
    ])
  ]
})
export class StoreViewComponent implements OnInit {
  isCheckoutFormShown: Boolean = false;
  checkoutInfo: object;
  goodsinfo: any[];
  nickname: string;
  commB3Balance: number;


  constructor(
    public media: ObservableMedia,
    public http: Http,
    public authentication: AuthenticationService,
    public snackbar: MdcSnackbar,
    public loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.getBalance();
    this.getUserInfo();
    this.Navbar();
    this.getGoods();
  }

  getBalance(): void {
    this.authentication.getUserBalance().subscribe(
        res => {
          if (res.success) {
            this.commB3Balance = res.data["x-value"]["account"]["balance"] - res.data["x-value"]["account"]["freeze-balance"];
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

  checkout(checkoutInfo): void {
    this.http
      .post(
        // 'http://35.187.154.29/endpoint/dev/checkout.php',
        "/v1/mall",
        {
          userCode: this.authentication.getInfo().userCode,
          consignee: {
            consigneeName: checkoutInfo.name,
            consigneeAddress: checkoutInfo.address,
            consigneePhone: checkoutInfo.contact
          },
          advPassword: checkoutInfo.password,
          ordersGoodsList: [
            {
              goods: { uuid: this.loadingService.isuuid },
              quantity: checkoutInfo.quantity
            }
          ]
        }, { headers: this.authentication.authorizationHeader()}
      )
      .map(res => res.json())
      .subscribe(
        res => {
          if (res.success) {
            this.getBalance();
            setTimeout(() => {
              this.snackbar.show("购买成功。");
              this.getGoods();
            });
          } else {
            setTimeout(() => {
              this.snackbar.show("购买信息错误，请从新再输入。");
              this.getGoods();
            });
          }
        },
        err => {
          setTimeout(() => {
            this.snackbar.show("购买信息错误，请从新再输入。");
            this.getGoods();
          });
        }
      );
  }

  getGoods(): void {
    this.http
      .get("/v1/mall/goods", {
        headers: this.authentication.authorizationHeader()
      })
      .map(res => res.json())
      .subscribe(
        res => {
          this.goodsinfo = res["data"];
        },
        err => {
          console.log(err);
        },
        () => {}
      );
  }

  Navbar() {
    this.loadingService.isNavbar = false;
  }

  getUUID(value: string, value2: string) {
    this.loadingService.isuuid = value;
    this.loadingService.cue_goodsname = value2;
  }
}
