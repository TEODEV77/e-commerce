const { v4: uuid } = require("uuid");

class Product {

  constructor(title, code, category, description, stock, price) {
    this.id = uuid();
    this.title = title;
    this.code = code;
    this.category = category;
    this.description = description;
    this.stock = stock;
    this.price = price;
    this.status = true;
    this.thumbnails = [];
  }
}

module.exports = Product;
