import { Component, OnInit } from '@angular/core';
import {User} from '../../../shared/models/user';
import {AuthenticationService} from '../../../shared/services/authentication.service';
import {Product} from '../../../shared/models/product';
import {SupermercadoService} from '../../../shared/services/supermercado.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  user: User;
  products: Product[];

  constructor(
    private authenticationService: AuthenticationService,
    private supermercadoService: SupermercadoService
  ) {}

  ngOnInit() {
    this.user = this.authenticationService.getCurrentUser();
    this.authenticationService.userObservable.subscribe(user => {
      this.user = user;
    });
    if (this.userIsWarehouseman()) {
      this.supermercadoService.getProducts().subscribe(products => {
        this.products = products;
      });
    } else {
      console.log('Usuario no autorizado para consultar la lista de productos.');
    }
  }

  deleteProduct(product: Product) {
    this.supermercadoService.deleteProduct(product).subscribe(() => {
      this.products = this.products.filter(p => p !== product);
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

}
