import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LogoutComponent } from './components/logout/logout.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentsComponent } from './components/payments/payments.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:"",redirectTo:"products",pathMatch:"full"},
  {path:"products",component:ProductsComponent},
  {
    path:"orders",
    component:OrdersComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"profile",
    component:ProfileComponent,
    canActivate:[AuthGuard]
  },
  {path:"cart",component:CartComponent},
  {
    path:"payments",
    component:PaymentsComponent,
    canActivate:[AuthGuard]
  },
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:"logout",component:LogoutComponent},
  {path:"**",component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RouteComponents = [
  ProductsComponent,
    OrdersComponent,
    ProfileComponent,
    LoginComponent,
    SignupComponent,
    PageNotFoundComponent,
    LogoutComponent,
    CartComponent,
    PaymentsComponent
]
