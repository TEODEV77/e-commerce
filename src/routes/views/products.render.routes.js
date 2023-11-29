import { Router } from "express";
import { getProducts } from "../../dao/productAdapter.js";
import { paginateResponseSuccess } from "../../class/response.js";

const productsViewRouter = Router();

productsViewRouter.get("/products", async (req, res) => {
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
    res.render('products', productsPaginate);
   
  } catch (error) {
  
  }
});

export default productsViewRouter;
