const { Router } = require("express");
const ProductMaganer = require("../class/productManager");

const productManager = new ProductMaganer();

const productsRouter = Router();

productsRouter.post("/products", async (req, res) => {
  const { body } = req;

  if (body) {
    const product = await productManager.create(body);
    if (product) {
      res.status(201).json({
        message: "Product created successfully",
        product,
      });
    } else {
      if (product === 0) {
        res
          .status(400)
          .json({ error: `There is already a product with code: ${body.code}` });
      } else {
        res.status(400).json({ error: "Product could not be created" });
      }
    }
  }
});

productsRouter.get("/products", async (req, res) => {
  const { limit } = req.query;

  const products = await productManager.getProducts();

  if (limit) {
    if (products) {
      res.status(200).json(products.slice(0, limit));
    } else {
      res.status(404).json({ error: "File could not be read" });
    }
  } else {
    if (products) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ error: "File could not be read" });
    }
  }
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

productsRouter.patch("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  if (id) {
    const product = await productManager.getProductsById(id);
    if (product) {
      if (body) {
        const product = await productManager.update(id, body);
        if (product) {
          res
            .status(200)
            .json({ message: `Product with id: ${id} has been updated` });
        }
      } else {
        res
          .status(400)
          .json({ message: `Product with id: ${id} has not been updated` });
      }
    } else {
      res.status(404).json({ error: `No product exists with id ${id}` });
    }
  } else {
    res.status(400).json({ error: "Id is invalid / Not sent " });
  }
});

productsRouter.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await productManager.delete(id);
  
  if(deleteProduct === 1){
    res.status(200).json({message: `Product with id: ${id} has been deleted`})
  }else{
    res.status(404).json({ error: `No product exists with id ${id}` });
  }
});

module.exports = productsRouter;
