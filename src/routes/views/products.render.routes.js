import { Router } from "express";
import { getProducts } from "../../dao/productAdapter.js";
import { paginateResponseSuccess } from "../../class/response.js";
import { isAuth } from "../auth/authentication.js";

const productsViewRouter = Router();

productsViewRouter.get("/products", isAuth, async (req, res) => {
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
    const products = await getProducts(queryCriteria, options);
    const productsPaginate = paginateResponseSuccess(products);
    const userCart = {
      list: productsPaginate.payload,
      cid: req.user.cid,
    };
    productsPaginate.payload = userCart;
    const data = {
      productsPaginate: productsPaginate,
      user: req.user.firstName,
      cart: req.user.cid,
    };
    res.render("products", data);
  } catch (error) {
    console.log(error.message);
  }
});

export default productsViewRouter;
