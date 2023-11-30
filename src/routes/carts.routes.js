import { Router } from "express";
import { success, error as err } from "../class/response.js";

import {
  createCartAdapter,
  getCartsAdapter,
  addProductToCartAdapter,
  deleteProductToCartAdapter,
  deleteAllProductToCartAdapter,
  getCartPopulate,
  addArray,
} from "../dao/cartAdapter.js";

const cartsRouter = Router();

cartsRouter.post("/carts", async (req, res) => {
  try {
    const cart = await createCartAdapter();
    success(res, cart, "Cart has been created", 201);
  } catch (error) {
    err(res, "Bad Request", "Something Broke !", 400);
  }
});

cartsRouter.post("/carts/:cid/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await addProductToCartAdapter(cid, pid, parseInt(quantity));
    
    success(res, cart, "Product added to cart successfully", 200);
  } catch (error) {
    err(res, "Bad Request", "Something Broke !", 400);
    console.error(error.message);
  }
});

cartsRouter.delete("/carts/:cid/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const c = await deleteProductToCartAdapter(cid, pid);
    res.json(c);
  } catch (error) {
    res.json(error.message);
  }
});

cartsRouter.put("/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;

  try {
    const w = await addArray(cid, products);
    res.json(w);
  } catch (error) {
    res.json(error.message);
  }
});

cartsRouter.delete("/carts/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const c = await deleteAllProductToCartAdapter(cid);
    res.json(c);
  } catch (error) {
    res.json(error.message);
  }
});

cartsRouter.get("/carts", async (req, res) => {
  try {
    const carts = await getCartsAdapter();
    success(res, carts, "All Carts fetched successfully", 200);
  } catch (error) {
    err(res, "Bad Request", "Something Broke !", 400);
  }
});

cartsRouter.get("/carts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await getCartPopulate(id);
    success(res, cart, "Cart fetched successfully", 200);
  } catch (error) {
    err(res, "Not Found", `Cart with ${id} not found`, 404);
  }
});

export default cartsRouter;
