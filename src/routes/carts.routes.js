import { Router } from "express";

import CartManager from "../class/cartManager.js";
import {
  createCartAdapter,
  getCartsAdapter,
  getCartByIdAdapter,
  addProductToCartAdapter,
} from "../dao/cartAdapter.js";

const cartManager = new CartManager();
const cartsRouter = Router();

cartsRouter.post("/carts", async (req, res) => {
  let body = {
    products: [],
  };
  await createCartAdapter(body);
  res.status(201).json({
    message: "Cart has been created",
  });
});

cartsRouter.post("/carts/:cid/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  await addProductToCartAdapter(cid, pid);
  res.json({ ok: true });
});

cartsRouter.get("/carts", async (req, res) => {
  const carts = await getCartsAdapter();
  res.status(200).json(carts);
});

cartsRouter.get("/carts/:id", async (req, res) => {
  const { id } = req.params;
  const cart = await getCartByIdAdapter(id);
  res.status(200).json(cart);
});

export default cartsRouter;
