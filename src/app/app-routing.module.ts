import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeViewComponent } from './views/home-view/home-view.component';
import { StoreViewComponent } from './views/store-view/store-view.component';
import { OrderformComponent } from './shared/orderform/orderform.component';
import { BgLoginInterfaceComponent } from './views/backstage/bg-login-interface/bg-login-interface.component';


import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Routes = [
  { path: '', component: HomeViewComponent },
  { path: 'store', component: StoreViewComponent, canActivate: [AuthenticationGuard] },
  { path: 'orderform', component: OrderformComponent },
  { path: 'backstage', component: BgLoginInterfaceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
