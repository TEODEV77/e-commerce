import express from 'express';
import { engine } from "express-handlebars";
import path from 'path';
import {__dirname } from './utils.js';

import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';

import socketProductRouter from './routes/product.socket.routes.js'
import chatRouter from './routes/chat.routes.js';



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.engine("handlebars", engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use("/api", productsRouter, cartsRouter);

app.use('/', socketProductRouter, chatRouter);


app.get("/", async (req, res) => {
 // const products = await productManager.getProducts();
  //res.render("home", {products});
});

export default app;