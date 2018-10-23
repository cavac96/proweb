export class Product {
  name: string;
  SKUcode: string;
  meassureUnit: string;
  quantity: number;
  price: number;

  constructor(SKUcode: string, name: string, meassureUnit: string, quantity: number, price: number) {
    this.SKUcode = SKUcode;
    this.name = name;
    this.meassureUnit = meassureUnit;
    this.quantity = quantity;
    this.price = price;
  }
}
