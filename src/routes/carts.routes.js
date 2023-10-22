const { Router } = require("express");
const CartManager = require("../class/cartManager");

const cartManager = new CartManager();
const cartsRouter = Router();

cartsRouter.post("/carts", async (req, res) => {
  const carts = await cartManager.create();
  if (carts === 0) {
    res.status(404).json({ message: "File could not be read" });
  } else {
    res.status(201).json({ message: "Cart has been created" });
  }
});

cartsRouter.post("/carts/:cid/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await cartManager.addProductCart(cid, pid);
  if (cart === 0) {
    res.status(404).json({ message: `No cart exists with id ${cid}` });
  } else {
    res
      .status(201)
      .json({ message: `Product has been added to cart`, cartID: cid });
  }
});

cartsRouter.get("/carts", async (req, res) => {
  const carts = await cartManager.getCarts();
  if (carts) {
    res.status(200).json(carts);
  } else {
    res.status(404).json({ message: "File could not be read" });
  }
});

cartsRouter.get("/carts/:id", async (req, res) => {
  const { id } = req.params;

  if (id) {
    const cart = await cartManager.productsCart(id);

    switch (cart) {
      case 0:
        res.status(404).json({ message: `No cart exists with id ${id}` });
        break;
      case 1:
        res.status(404).json({ message: "File could not be read" });
        break;
      default:
        res.status(200).json(cart);
    }
  } else {
    res.status(400).json({ message: "No id was provided" });
  }
});

module.exports = cartsRouter;
