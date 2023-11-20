import cartSchema from "./models/cart.model.js";
import ProductMaganer from "../class/productManager.js";
import cartManager from "../class/cartManager.js";
import { getProductByIdAdapter } from "./productAdapter.js";

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

export const addProductToCartAdapter = async (cid, pid, quantity) => {
  if (flagMongo) {
    const cart = await getCartByIdAdapter(cid);
    const getProduct = await getProductByIdAdapter(pid);

    if (getProduct) {
      const productExists = cart.products.find((pr) => pr.product == pid);
      if (productExists) {
        productExists.quantity += quantity;
        const out = await cartSchema.updateOne({ _id: cid }, cart);
        return out;
      }

      const newProduct = {
        product: getProduct._id,
        quantity: quantity,
      };

      cart.products.push(newProduct);
      const out = await cartSchema.updateOne({ _id: cid }, cart);
      return out;
    }
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
