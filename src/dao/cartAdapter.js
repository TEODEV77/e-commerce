import cartSchema from "./models/cart.model.js";
import ProductMaganer from "../class/productManager.js";
import cartManager from "../class/cartManager.js";

const flagMongo = true;

export const createCartAdapter = async () => {
  let body = {
    products: [],
  };

  if (flagMongo) {
    const cart = await cartSchema.create(body);
    return cart;
  }

  cartManager.addCart();
};

export const addProductToCartAdapter = async (cid, pid) => {
  if (flagMongo) {
    const cart = await getCartByIdAdapter(cid);
    const product = cart.products.find((product) => product.pid === pid);

    if (product) {
      product.quantity++;
      const cartUpdated = await cartSchema.updateOne({ _id: cid }, cart);
      return cartUpdated;
    }
    cart.products.push({
      pid,
      quantity: 1,
    });
    const cartUpdated = await cartSchema.updateOne({ _id: cid }, cart);
    return cartUpdated;
  }
};

export const getCartByIdAdapter = async (id) => {
  if (flagMongo) {
    const cart = await cartSchema.findOne({ _id: id });
    return cart;
  }

  return cartManager.getCart(id);
};

export const getCartsAdapter = async () => {
  if (flagMongo) {
    const carts = await cartSchema.find({});
    return carts;
  }

  return cartManager.getCarts();
};
