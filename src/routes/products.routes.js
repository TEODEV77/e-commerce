import { Router } from "express";

import ProductMaganer from "../class/productManager.js";
import {
  createProductAdapter,
  deleteProductAdapter,
  getProductsAdapter,
  updateProductAdapter,
} from "../dao/productAdapter.js";

const productManager = new ProductMaganer();

const productsRouter = Router();

productsRouter.post("/products", async (req, res) => {
  const { body } = req;

  if (body) {
    await createProductAdapter(body);
    res.status(201).json({
      message: "Product has been created",
    });
    return;
  }
});

productsRouter.get("/products", async (req, res) => {
  const { limit } = req.query;

  const products = await getProductsAdapter(limit);
  res.status(200).json(products);
});

productsRouter.get("/products/:id", async (req, res) => {
  const { id } = req.params;

  if (id) {
    const product = await productManager.getProductsById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: `No product exists with id ${id}` });
    }
  } else {
    res.status(400).json({ error: "Id is invalid / Not sent " });
  }
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
