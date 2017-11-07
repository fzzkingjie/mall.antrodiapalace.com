import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { MdcSnackbar } from '@angular-mdc/web';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-orderform',
  templateUrl: './orderform.component.html',
  styleUrls: ['./orderform.component.scss']
})
export class OrderformComponent implements OnInit {

  private orderinfos2: Array<Orderinfo1>;

  constructor(
    public http: HttpClient,
    public authentication: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.getOrderInfo();
    this.orderinfos2 = [
      new Orderinfo1('精油', 100, 2, '双手合', 13131312451, '啊来得及辣鸡都酸辣粉杰拉德手机费的', '2101-11-11 11:11:11'),
      new Orderinfo1('火火', 99, 1, '发到付', 15461233651, '啊来得及辣鸡都酸辣粉杰拉德手机费的', '2101-11-11 11:11:11'),
      new Orderinfo1('慰问费', 100, 2, '双手合', 13131312451, '啊来得及辣鸡都酸辣粉杰拉德手机费', '2101-11-11 11:11:11'),
      new Orderinfo1('打的费打的费', 100, 2, '双手合', 13131312451, '啊来得及辣鸡都酸辣粉杰拉德手机费', '2101-11-11 11:11:11')
    ];
  }

  getOrderInfo(): void  {
    this.http.post(
      'http://192.168.18.197:8080/v1/mall/orders',
      {
        username: this.authentication.username
      }
    ).subscribe(
      res => {
        this.authentication.orderInfo = res['condition'];
      },
    );
  }
}

export class Orderinfo1 {
  constructor(
    public goodsName: string,
    public purchasePrice: number,
    public purchaseQuantity: number,
    public consignee: string,
    public phone: number,
    public address: string,
    public time: string
  ) {}
}
