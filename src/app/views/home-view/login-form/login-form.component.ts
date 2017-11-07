import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Credential } from '../../../data-model/credential';

import { AuthenticationService } from '../../../services/authentication.service';

import { MdcSnackbar } from '@angular-mdc/web';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  isLoading: boolean = false;
  snackbarRef: MdcSnackbar;

  @Output()
  isLoginFormLoading: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private formBuidler: FormBuilder,
    private http: HttpClient,
    public snackbar: MdcSnackbar,
    private router: Router,
    public authentication: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm(): void {
    this.loginForm = this.formBuidler.group({
      username: ['CN80713497', [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern('[a-zA-Z0-9!"#$%&\'()*+,./:;<=>?@\^_`{|}~-]*')
      ]],
      password: ['123456', [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern('[a-zA-Z0-9!"#$%&\'()*+,./:;<=>?@\^_`{|}~-]*')
      ]],
    });
  }

  getErrorMessage(formControl) {
    let response: String;

    response = formControl.hasError('required') ? '这栏必须填写' :
      formControl.hasError('maxlength') ? '数值长度必须少于 32 位' :
      formControl.hasError('pattern') ? '数值格式必须为英文字母、数字或标点符号' : '';
    
    return response;
  }

  login($event): void {
    if (this.loginForm.valid) {
      this.isLoginFormLoading.emit(true);
      this.isLoading = true;
      this.http.post(
        'http://35.187.154.29/endpoint/dev/login.php',
        this.loginForm.value
      ).subscribe(
        res => {
          console.log(res);
          if (res["x-return"] == "0") {
            this.authentication.isLoggedIn = true;
            this.authentication.username = this.loginForm.value.username;
            this.isLoginFormLoading.emit(false);
            this.isLoading = false;
            this.router.navigate(['../store']);
          } else {
            this.isLoginFormLoading.emit(false);
            this.isLoading = false;
            setTimeout(()=>{ this.snackbar.show('登入信息错误，请从新再输入。'); });
          }
        },
        err => {
          setTimeout(()=>{ this.snackbar.show('登入信息错误，请从新再输入。'); });
        }
      );
      setTimeout(()=> {
      }, 1000);
    } else {
      $event.preventDefault();
    }
  }

  goToUrl(url): void {
    this.isLoginFormLoading.emit(true);
    window.location.href = url;
  }

}
