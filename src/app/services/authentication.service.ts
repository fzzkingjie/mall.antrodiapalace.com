import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {

  isLoggedIn: boolean = false;
  username: string = '';
  nickname: string = '';
  userInfo: object;
  commB3Balance: number = 0;
  orderInfo: object;

  constructor() {}

}
