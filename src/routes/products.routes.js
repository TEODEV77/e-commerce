import { Router } from "express";

import { success, error as err} from '../class/response.js';

import {
  createProductAdapter,
  deleteProductAdapter,
  getProductByIdAdapter,
  getProductsAdapter,
  updateProductAdapter,
} from "../dao/productAdapter.js";

const productsRouter = Router();

productsRouter.post("/products", async (req, res) => {
  const { body } = req;

  try {
    const newProduct = await createProductAdapter(body);
    
    success(res,newProduct,'Created',201);
    
  } catch (error) {
    
    err(res,'Bad Request','All fields required / Code must be unique',400);
  }
});

productsRouter.get("/products", async (req, res) => {
  const { limit } = req.query;

  try {
    const products = await getProductsAdapter(limit);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      payload: {
        statusCode: 500,
        error: "Internal Server Error",
        message: "An internal server error occurred",
      },
    });
  }
});

productsRouter.get("/products/:id", async (req, res) => {
  const { id } = req.params;

  const product = await getProductByIdAdapter(id);
  res.status(200).json(product);
});

productsRouter.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  await updateProductAdapter(id, body);
  res.status(201).json({
    message: `Product with id: ${id} has been updated`,
  });
});

productsRouter.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  await deleteProductAdapter(id);
  res.status(200).json({
    message: `Product with id: ${id} has been deleted`,
  });
});

export default productsRouter;
