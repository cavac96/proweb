import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/autentication/login/login.component';
import { RegisterComponent } from './components/cashier/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './shared/header/header.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import {ProductsListComponent} from './components/warehouseman/products-list/products-list.component';
import {FormsModule} from '@angular/forms';
import { ProductEditComponent } from './components/warehouseman/product-edit/product-edit.component';
import { ProductAddComponent } from './components/warehouseman/product-add/product-add.component';
import {fakeBackendProvider} from './shared/mocks/fakeBackend';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import { ProductDetailComponent } from './components/warehouseman/product-detail/product-detail.component';
import { SigninComponent } from './components/autentication/signin/signin.component';
import { UserInfoComponent } from './shared/user-info/user-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsListComponent,
    RegisterComponent,
    HeaderComponent,
    NavbarComponent,
    ProductEditComponent,
    ProductAddComponent,
    ProductDetailComponent,
    SigninComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
