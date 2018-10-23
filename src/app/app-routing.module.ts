import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/autentication/login/login.component';
import {SigninComponent} from './components/autentication/signin/signin.component';
import {ProductsListComponent} from './components/warehouseman/products-list/products-list.component';
import {ProductEditComponent} from './components/warehouseman/product-edit/product-edit.component';
import {ProductAddComponent} from './components/warehouseman/product-add/product-add.component';
import {ProductDetailComponent} from './components/warehouseman/product-detail/product-detail.component';
import {RegisterComponent} from './components/cashier/register/register.component';
import {UserInfoComponent} from './shared/user-info/user-info.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'info', component: UserInfoComponent },
  { path: 'cashier/register', component: RegisterComponent },
  { path: 'warehouseman/products-list', component: ProductsListComponent },
  { path: 'warehouseman/product-edit/:SKUcode', component: ProductEditComponent },
  { path: 'warehouseman/product-detail/:SKUcode', component: ProductDetailComponent },
  { path: 'warehouseman/product-add', component: ProductAddComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
