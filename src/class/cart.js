const { v4: uuid } = require("uuid");

class Cart {
  constructor() {
    this.id = uuid();
    this.products = [];
  }
}

module.exports = Cart;
