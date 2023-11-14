import { v4 as uuid } from 'uuid';
class Cart {
  constructor() {
    this.id = uuid();
    this.products = [];
  }
}

export default Cart;
