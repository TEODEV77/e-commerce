import FSConfig from '../dao/fs/fsConfig.js';
import Product from './product.js';

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

  async getIdx(id) {
    this.products = await fsConfig.read();
    const idx = this.products.findIndex((product) => product.id === id);
    return idx;
  }

  async getProducts() {
    this.products = await fsConfig.read();

    if (this.products) {
      return this.products;
    } else {
      return null;
    }
  }

  async getProductsById(id) {
    this.products = await fsConfig.read();
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      return null;
    }
  }

  async create(body) {
    this.products = await fsConfig.read();
    const { title, code, category, description, stock, price } = body;

    const product = new Product(
      title,
      code,
      category,
      description,
      parseInt(stock),
      parseInt(price)
    );

    if (!this.checkCode(code)) {
      this.products.unshift(product);
      await fsConfig.write(this.products);
      return product;
    } else {
      return 0;
    }
  }

  async update(id, body) {
    this.products = await fsConfig.read();
    const idx = await this.getIdx(id);
    const clonProduct = this.products[idx];
    if (idx === -1) {
      return null;
    }
    const product = {
      id,
      ...clonProduct,
      ...body,
    };

    this.products[idx] = product;
    await fsConfig.write(this.products);
    return product;
  }

  async delete(id) {
    const idx = await this.getIdx(id);
    if (idx === -1) {
      return null;
    } else {
      this.products.splice(idx, 1);
      await fsConfig.write(this.products);
      return 1;
    }
  }
}

export default ProductMaganer;
