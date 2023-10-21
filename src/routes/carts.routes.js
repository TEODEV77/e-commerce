const { Router } = require("express");
const FSConfig = require("../class/fsConfig");

const fsConfig = new FSConfig("./carts.json");

const cartsRouter = Router();

cartsRouter.get("/carts", async (req, res) => {
  try {
    const carts = await fsConfig.read();
    console.log(carts);
    res.status(200).json(carts);
  } catch (error) {
    console.log(error);
  }
});

module.exports = cartsRouter;
