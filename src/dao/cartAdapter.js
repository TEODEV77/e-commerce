import cartSchema from "./models/cart.model.js";
import ProductMaganer from "../class/productManager.js";

const productManager = new ProductMaganer();
const flagMongo = true;

export const createCartAdapter = async (body) => {
  if (flagMongo) {
    try {
      await cartSchema.create(body);

      return;
    } catch (error) {
      console.log(error.message);
      return;
    }
  }
};

export const addProductToCartAdapter = async (cid, pid) => {
  if (flagMongo) {
    try {
      const cart = await getCartByIdAdapter(cid);
      const product = cart.products.find((product) => product.pid === pid);

      if (product) {
        product.quantity++;
        await cartSchema.updateOne({ _id: cid }, cart);
        return;
      }
      cart.products.push({
        pid,
        quantity: 1,
      });
      await cartSchema.updateOne({ _id: cid }, cart);
    } catch (error) {}
  }
};

export const getCartByIdAdapter = async (id) => {
  if (flagMongo) {
    try {
      const cart = await cartSchema.findOne({ _id: id });
      return cart;
    } catch (error) {
      console.log(error.message);
      return;
    }
  }
};

export const getCartsAdapter = async () => {
  if (flagMongo) {
    try {
      const carts = await cartSchema.find({});
      return carts;
    } catch (error) {
      console.log(error.message);
      return;
    }
  }
};
