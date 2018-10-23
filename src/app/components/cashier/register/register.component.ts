import {Component, OnInit} from '@angular/core';
import {User} from '../../../shared/models/user';
import {Product} from '../../../shared/models/product';
import {AuthenticationService} from '../../../shared/services/authentication.service';
import {SupermercadoService} from '../../../shared/services/supermercado.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;

  newProduct: Product;
  productsMap: Map<Product, number>;
  keys = [];

  total: number;
  invoice: boolean;
  priceQuantity: Map<Product, number>;

  constructor(
    private authenticationService: AuthenticationService,
    private supermercadoService: SupermercadoService
  ) {}

  ngOnInit() {
    this.user = this.authenticationService.getCurrentUser();
    this.authenticationService.userObservable.subscribe(user => {
      this.user = user;
    });
    if (this.userIsCashier()) {
      this.productsMap = new Map<Product, number>();
      this.total = 0;
      this.invoice = false;
      this.getKeys();
    } else {
      console.log('Usuario no autorizado para registrar un producto para la venta.');
    }
  }

  getKeys(){
    this.keys = Array.from(this.productsMap.keys());
  }

  addProduct(SKUcode: string, quantity: string): void {
    this.getKeys();
    SKUcode = SKUcode.trim();
    quantity = quantity.trim();
    if (!SKUcode || !quantity || +quantity <= 0) {
      console.log('Error al ingresar los datos');
      return;
    }
    this.supermercadoService.checkProduct(SKUcode, +quantity).subscribe(p => {
      if (p) {
        this.newProduct = new Product(p.SKUcode, p.name, p.meassureUnit, p.quantity, p.price)
        this.productsMap.set(this.newProduct, +quantity);
        //console.log(this.newProduct.name);
        this.getKeys();
      } else {
        console.log('Error. Producto no existe o no hay suficientes unidades.');
      }
    });
  }

  removeProduct(product: Product) {
    this.productsMap.delete(product);
    this.total -= (this.productsMap.get(product) * product.price);
    this.getKeys();
  }

  calculate() {
    this.total = 0;
    for (let i = 0; i < this.keys.length; i++) {
      this.total += (this.productsMap.get(this.keys[i]) * this.keys[i].price);
    }
  }

  generateInvoice() {
    this.priceQuantity = new Map<Product, number>();
    for (let i = 0; i < this.keys.length; i++) {
      this.priceQuantity.set(this.keys[i], (this.productsMap.get(this.keys[i]) * this.keys[i].price));
      const p: Product = this.keys[i];
      console.log(p.name + 'antes: ' + p.quantity);
      p.quantity = p.quantity - this.productsMap.get(this.keys[i]);
      this.supermercadoService.updateQuantity(p).subscribe(p => {
        console.log(p.name + 'despues: ' + p.quantity);
      });
    }
    this.calculate();
    this.invoice = true;
  }

  goBack() {
    this.total = 0;
    this.productsMap.clear();
    this.priceQuantity.clear();
    this.getKeys();
    this.invoice = false;
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
