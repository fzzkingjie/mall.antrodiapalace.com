import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { CountDown } from 'ng2-date-countdown';

import { MaterialModule } from '@angular-mdc/web';

import { AuthenticationService } from './services/authentication.service';
import { AuthenticationGuard } from './guards/authentication.guard';

import { AppComponent } from './app.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { LoginFormComponent } from './views/home-view/login-form/login-form.component';
import { StoreViewComponent } from './views/store-view/store-view.component';
import { CheckoutFormComponent } from './views/store-view/checkout-form/checkout-form.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { OrderformComponent } from './shared/orderform/orderform.component';
import { BackstageComponent } from './views/backstage/backstage.component';
import { BgLoginInterfaceComponent } from './views/backstage/bg-login-interface/bg-login-interface.component';
import { BgManageInterfaceComponent } from './views/backstage/bg-manage-interface/bg-manage-interface.component';
import { LoadingComponent } from './shared/loading/loading.component';

import { LoadingService } from './tutorial/loading.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    LoginFormComponent,
    StoreViewComponent,
    CheckoutFormComponent,
    CountDown,
    NavbarComponent,
    OrderformComponent,
    BackstageComponent,
    BgLoginInterfaceComponent,
    BgManageInterfaceComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    MaterialModule
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
    LoadingService
  ],
  entryComponents: [
    LoginFormComponent
  ]
})
export class AppModule { }
