import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MdcSnackbar } from '@angular-mdc/web';
import { Http, Headers } from '@angular/http';
import { AuthenticationService } from '../../services/authentication.service';
import 'rxjs/Rx';

@Component({
  selector: 'app-orderform',
  templateUrl: './orderform.component.html',
  styleUrls: ['./orderform.component.scss']
})
export class OrderformComponent implements OnInit {

  goodsorderinfor: any[];
  // uuid: any[];

  constructor(
    public http: Http,
    public authentication: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.goodsOrderInfor();
    // this.goodsuuidget();
  }

  goodsOrderInfor(): void {
    this.http
      .get('v1/mall/orders', {
                              headers: this.authentication.authorizationHeader()
                            })
      .map(res => res.json())
      .subscribe(res => {
          this.goodsorderinfor = res['data'];
          // this.getGoodinfo(this.goodsorderinfor[0]['uuid']);
        }, err => {
          console.log(err);
        }, () => {
          // for (let i = 0; i < this.goodsorderinfor.length; i++) {
          //   if (this.goodsorderinfor[i]) {
          //   }
          // }
        });
  }

  // getGoodinfo(uuid): void {
  //   // this.http
  //   //   .get('/v1/goods/' + uuid, {
  //   //                               headers: this.authentication.authorizationHeader()
  //   //                             }
  //   // )
  //   //   .map(res => res.json())
  //   //   .subscribe(
  //   //     res => console.log(res)
  //   //   );
  //   console.log(uuid);
  // }

  // goodsuuidget(): void {
  //   // this.goodsorderinfor.forEach(element => {});
  // }

}
