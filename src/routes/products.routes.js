import { Router } from "express";

import { success, paginateResponseSuccess, error as err } from "../class/response.js";

import {
  createProductAdapter,
  deleteProductAdapter,
  getProductByIdAdapter,
  getProducts,
  updateProductAdapter,
} from "../dao/productAdapter.js";

const productsRouter = Router();

productsRouter.post("/products", async (req, res) => {
  const { body } = req;

  try {
    const newProduct = await createProductAdapter(body);
    success(res, newProduct, "Created", 201);
  } catch (error) {
    err(res, "Bad Request", "All fields required / Code must be unique", 400);
  }
});

productsRouter.get("/products", async (req, res) => {
  const { limit = 10, page = 1, category, stock , sort } = req.query;

  const options = { limit, page};
  const queryCriteria = {}; 

  if(sort){
    options.sort = {price: sort};
  }

  if(category){
    queryCriteria.category = category;
  }

  if(stock){
    queryCriteria.stock = stock;
  }

  try {
    const products = await getProducts(queryCriteria,options);
    const productsPaginate = paginateResponseSuccess(products);
    res.json(productsPaginate);
  } catch (error) {
    err(res, "Internal Server Error", error.message, 500);
  }
});

productsRouter.get("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await getProductByIdAdapter(id);
    success(res, product, "Successfully", 200);
  } catch (error) {
    err(res, "Not Found", "Product not found", 404);
  }
});

productsRouter.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    await updateProductAdapter(id, body);
    success(res, `Product with id: ${id} has been updated`, "Updated Successfully", 201);
  } catch (error) {
    err(res, "Not Found", "Product not found", 404);
  }

});

productsRouter.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await deleteProductAdapter(id);
    success(res, `Product with id: ${id} has been deleted`, "Deleted Successfully", 200);
  } catch (error) {
    err(res, "Not Found", "Product not found", 404);
  }

});

export default productsRouter;