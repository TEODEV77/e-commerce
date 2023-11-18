import { Router } from "express";

import { success, error as err } from "../class/response.js";

import {
  createCartAdapter,
  getCartsAdapter,
  getCartByIdAdapter,
  addProductToCartAdapter,
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

  try {
    const cart = await addProductToCartAdapter(cid, pid);
    success(res, cart, "Product added to cart successfully", 200);
  } catch (error) {
    err(res, "Bad Request", "Something Broke !", 400);
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
    const cart = await getCartByIdAdapter(id);
    success(res, cart, "Cart fetched successfully", 200);
  } catch (error) {
    err(res, "Not Found", `Cart with ${id} not found`, 404);
  }
});

export default cartsRouter;
