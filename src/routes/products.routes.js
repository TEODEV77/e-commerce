const { Router } = require("express");
const ProductMaganer = require("../class/productManager");

const productManager = new ProductMaganer();

const productsRouter = Router();

productsRouter.get("/products", async (req, res) => {
  try {
    const out = await productManager.getProducts();
    res.json(out);
  } catch (error) {}
});

productsRouter.post("/products", async (req, res) => {
  const { body } = req;
  try {
    let out = await productManager.create(body);
    res.json({
      out
    });
  } catch (error) {}
});

module.exports = productsRouter;
