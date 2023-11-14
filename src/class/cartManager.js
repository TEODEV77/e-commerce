import Cart from './cart.js';
import FSConfig from '../dao/fs/fsConfig.js';

const fsConfig = new FSConfig("./carts.json");

class CartManager {
  constructor() {
    this.carts = [];
  }

  async create() {
    this.carts = await fsConfig.read();
    if (this.carts) {
      const cart = new Cart();
      this.carts.push(cart);
      await fsConfig.write(this.carts);
      return 1;
    } else {
      return 0;
    }
  }

  async productsCart(id) {
    this.carts = await fsConfig.read();
    if (this.carts) {
      const cart = this.carts.find((cart) => cart.id === id);
      if (cart) {
        return cart;
      } else {
        return 0;
      }
    } else {
      return 1;
    }
  }

  async getCarts() {
    this.carts = await fsConfig.read();
    if (this.carts) {
      return this.carts;
    } else {
      return 0;
    }
  }

  async addProductCart(cid, pid) {
    const cart = await this.productsCart(cid);
    if (cart) {
      const findId = cart.products.find((product) => product.pid === pid);
      if (findId) {
        findId.quantity++;
      } else {
        const product = {
          pid,
          quantity: 1,
        };
        cart.products.push(product);
      }
      await fsConfig.write(this.carts);
      return 1;
    } else {
      return 0;
    }
  }
}

export default CartManager;
