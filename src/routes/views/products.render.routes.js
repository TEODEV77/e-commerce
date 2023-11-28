import { Router } from "express";
import { test } from "../../dao/productAdapter.js";
import { paginateResponseSuccess } from "../../class/response.js";

const productsViewRouter = Router();

productsViewRouter.get("/products", async (req, res) => {
  const { limit = 10, page = 1, category, stock, sort } = req.query;
  const options = { limit, page };
  const queryCriteria = {};

  if (sort) {
    options.sort = { price: sort };
  }

  if (category) {
    queryCriteria.category = category;
  }

  if (stock) {
    queryCriteria.stock = stock;
  }

  try {

    const out = await test(queryCriteria, options);
    const out2 = paginateResponseSuccess(out);
    res.render('products', out2);
   
  } catch (error) {
  
  }
});

export default productsViewRouter;
