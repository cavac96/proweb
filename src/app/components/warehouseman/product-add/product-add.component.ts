import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {User} from '../../../shared/models/user';
import {Product} from '../../../shared/models/product';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from '../../../shared/services/authentication.service';
import {SupermercadoService} from '../../../shared/services/supermercado.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  user: User;
  newProduct: Product;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private supermercadoService: SupermercadoService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.user = this.authenticationService.getCurrentUser();
    if (this.userIsWarehouseman()) {
    } else {
      console.log( 'No tiene permisos para añadir un producto.' );
    }
  }

  addProduct(form: NgForm) {
    this.newProduct = new Product(form.value.SKUcode, form.value.name, form.value.meassureUnit, form.value.quantity, form.value.price);
    this.supermercadoService.addProduct(this.newProduct).subscribe(() => this.goBack());
  }

  userIsWarehouseman() {
    if (this.user !== null) {
      return this.user.role === 'warehouseman';
    }
    return false;
  }

  userIsCashier() {
    if (this.user !== null) {
      return this.user.role === 'cashier';
    }
    return false;
  }

  userIsNotLogged() {
    return this.user === null;
  }

  goBack() {
    this.location.back();
  }

}
