import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {User} from '../../../shared/models/user';
import {AuthenticationService} from '../../../shared/services/authentication.service';
import {SupermercadoService} from '../../../shared/services/supermercado.service';
import {Product} from '../../../shared/models/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  user: User;
  product: Product;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private supermercadoService: SupermercadoService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.user = this.authenticationService.getCurrentUser();

    if (this.userIsWarehouseman()) {
      this.getProduct();
      if (this.product) {
        this.editProduct();
      }
    } else {
      console.log( 'No tiene permisos para editar.' );
    }
  }

  getProduct() {
    const SKUcode = this.route.snapshot.paramMap.get('SKUcode');
    this.supermercadoService.getProductById(SKUcode).subscribe(p => {
      this.product = p;
    });
  }

  editProduct() {
    this.supermercadoService.editProduct(this.product).subscribe(p => {
      this.product = p;
      this.goBack();
    });
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
