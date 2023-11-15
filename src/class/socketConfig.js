import { Server } from "socket.io";
import ProductMaganer from "./productManager.js";

const productManager = new ProductMaganer();

import productSchema from "../dao/models/product.model.js";
import { createProductAdapter, deleteProductAdapter, updateProductAdapter } from "../dao/productAdapter.js";

let io;
let products;
let mode = 1;

const init = (httpSever) => {
  io = new Server(httpSever);

  io.on("connection", async (socketClient) => {
    console.log(`New client connected ${socketClient.id}`);
    const products = await productSchema.find({});
    io.emit("get-products", products);

    socketClient.on("new-product", async (product) => {
      createProductAdapter(product);
      const products = await productSchema.find({});
      io.emit("get-products", products);
    });

    socketClient.on("update-product", async (body) => {
      let oid = body.id;
      delete body.id;
      updateProductAdapter(oid,body);
      const products = await productSchema.find({});
      io.emit("get-products", products);
    });
    socketClient.on("delete-product", async (id) => {
      deleteProductAdapter(id);
      const products = await productSchema.find({});
      io.emit("get-products", products);
    });
  });
};

const modeFSCreate = async (socketClient, product) => {
  let productCode = product.code;
  product = await productManager.create(product);
  if (product === 0) {
    socketClient.emit("fire", productCode);
    return;
  }
  socketClient.emit("success-create", product);
  io.emit("products", products);
};

const modeMongoCreate = async (socketClient, product) => {
  await productSchema.create(product);
  socketClient.emit("success-create", product);
  //io.emit("products", products);
};

export default init;
