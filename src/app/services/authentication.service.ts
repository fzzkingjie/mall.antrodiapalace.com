import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, URLSearchParams } from '@angular/http';
import { Md5 } from 'ts-md5/dist/md5';
import 'rxjs/Rx';

@Injectable()
export class AuthenticationService {
  isLoggedIn(): boolean {
    return this.getInfo() != null;
  }

  getInfo(): Authentication {
    return <Authentication>JSON.parse(
      sessionStorage.getItem("AuthenticationInfo")
    );
  }

  setInfo(info: Authentication) {
    sessionStorage.setItem("AuthenticationInfo", JSON.stringify(info));
  }

  removeInfo() {
    sessionStorage.removeItem("AuthenticationInfo");
  }

  constructor(private http: Http) {}

  applicationHeader(): Headers {
    const headers = new Headers();
    headers.append("Authorization", "Basic " + btoa("jenmate:Jenmate@2306"));
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    return headers;
  }

  authorizationHeader(): Headers {
    const headers = new Headers();
    headers.append(
      "Authorization",
      this.getInfo().tokenType + " " + this.getInfo().accessToken
    );
    return headers;
  }

  private searchParams(params: any): URLSearchParams {
    return Object.keys(params)
      .filter(key => params[key])
      .reduce((usp: URLSearchParams, key: string) => {
        usp.append(key, params[key]);
        return usp;
      }, new URLSearchParams());
  }

  login(loginParams): Observable<any> {
    // loginParams.password = Md5.hashStr(loginParams.password);
    const urlSearchParams = this.searchParams(loginParams);
    return this.http
      .post("/v1/members/login", urlSearchParams, {
        headers: this.applicationHeader()
      })
      .map(res => res.json());
  }

  getUserInfo(): Observable<any> {
    return this.http
      .get("/v1/members/" + this.getInfo().userCode, {
        headers: this.authorizationHeader()
      })
      .map(res => res.json());
  }

  getUserBalance(): Observable<any> {
    return this.http
      .get("/v1/members/" + this.getInfo().userCode + '/balances/B3', {
        headers: this.authorizationHeader()
      })
      .map(res => res.json());
  }
}
export class Authentication {
  userCode: string;
  accessToken: string;
  tokenType: string;
}
