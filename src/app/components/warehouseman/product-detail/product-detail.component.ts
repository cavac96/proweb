import { Component, OnInit } from '@angular/core';
import {SupermercadoService} from '../../../shared/services/supermercado.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {User} from '../../../shared/models/user';
import {Product} from '../../../shared/models/product';
import {AuthenticationService} from '../../../shared/services/authentication.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  user: User;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private supermercadoService: SupermercadoService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.user = this.authenticationService.getCurrentUser();
    if(this.userIsWarehouseman()) {
      this.getProduct();
    } else {
      console.log("Usuario no autorizado para acceder al producto.");
    }
  }

  getProduct() {
    const SKUcode = this.route.snapshot.paramMap.get('SKUcode');
    this.supermercadoService.getProductById(SKUcode).subscribe(product => {
      this.product = product;
    });
  }

  deleteProduct(product: Product) {
    this.supermercadoService.deleteProduct(product).subscribe(() => {
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
