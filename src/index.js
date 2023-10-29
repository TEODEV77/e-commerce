const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const productsRouter = require("./routes/products.routes");
const cartsRouter = require("./routes/carts.routes");
const ProductMaganer = require("./class/productManager");
const socketProductRouter = require("./routes/product.socket.routes");

const productManager = new ProductMaganer();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use("/api", productsRouter, cartsRouter);

app.use('/', socketProductRouter);


app.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home", {products});
});

module.exports = app;
