import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../services/authentication.service';

import { MdcSnackbar } from '@angular-mdc/web';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
  
})
export class CheckoutFormComponent implements OnInit {

  loginForm: FormGroup;
  isLoading: boolean = false;
  snackbarRef: MdcSnackbar;

  @Output()
  isCheckoutFormShown: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  isCheckoutClicked: EventEmitter<object> = new EventEmitter<object>();

  constructor(
    private formBuidler: FormBuilder,
    private http: HttpClient,
    public snackbar: MdcSnackbar,
    private router: Router,
    public authenication: AuthenticationService
  ) {
    this.createForm();
    this.snackbarRef = this.snackbar;
  }

  ngOnInit() {}

  createForm(): void {
    this.loginForm = this.formBuidler.group({
      name: ['', [
        Validators.required,
        Validators.maxLength(32)
      ]],
      contact: ['', [
        Validators.required,
        Validators.maxLength(16),
        Validators.pattern('[a-zA-Z0-9!"#$%&\'()*+,./:;<=>?@\^_`{|}~-]*')
      ]],
      address: ['', [
        Validators.required,
        Validators.maxLength(128)
      ]],
      password: ['', [
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

  hideForm(): void {
    this.isCheckoutFormShown.emit(false);
  }

  checkout($event): void {
    if (this.loginForm.valid) {
      this.isCheckoutFormShown.emit(false);
      this.isCheckoutClicked.emit(this.loginForm.value);
    } else {
      $event.preventDefault();
    }
  }

}
