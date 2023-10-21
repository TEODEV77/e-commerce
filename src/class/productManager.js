const FSConfig = require("./fsConfig");
const Product = require("./product");

const fsConfig = new FSConfig("./products.json");

class ProductMaganer {
  constructor() {
    this.products = [];
  }

  checkCode(code) {
    const productCode = this.products.find((product) => product.code === code);
    if (productCode) {
      return true;
    }
  }

  async getProducts() {
    this.products = await fsConfig.read();
    return this.products;
  }

  async create(body) {
    this.products = await fsConfig.read();
    const { title, code, category, description, stock, price } = body;

    const product = new Product(
      title,
      code,
      category,
      description,
      stock,
      price
    );

    if (!this.checkCode(code)) {
      this.products.push(product);
      await fsConfig.write(this.products);
      return {
        msg: "Product created",
        product,
      };
    } else {
      return "Code is already exists";
    }
  }
}

module.exports = ProductMaganer;
