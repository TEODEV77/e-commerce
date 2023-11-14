import { Server } from "socket.io";
import ProductMaganer from "./productManager.js";

const productManager = new ProductMaganer();

import productSchema from "../dao/models/product.model.js";

let io;
let products;
let mode = 1;

const init = (httpSever) => {
  io = new Server(httpSever);

  io.on("connection", async (socketClient) => {
    console.log(`New client connected ${socketClient.id}`);
    products = await productManager.getProducts();
    socketClient.emit("products", products);
    socketClient.on("new-product", async (product) => {

      switch (mode) {
        case 0:
          modeFSCreate(socketClient,product);
          break;
        case 1:
          modeMongoCreate(socketClient,product);
          break;
      }
    });

    socketClient.on("update-product", async (product) => {
      const id = product.id;
      delete product.id;
      const status = await productManager.update(id, product);
      if (status === null) {
        socketClient.emit("fireExists", id);
        return;
      }
      socketClient.emit("success-update", id);
      io.emit("products", products);
    });
    socketClient.on("delete-product", async (id) => {
      const status = await productManager.delete(id);
      if (status === null) {
        socketClient.emit("fireExists", id);
        return;
      }
      socketClient.emit("success-delete", id);
    });
  });
};

const modeFSCreate = async (socketClient,product) => {
  let productCode = product.code;
  product = await productManager.create(product);
  if (product === 0) {
    socketClient.emit("fire", productCode);
    return;
  }
  socketClient.emit("success-create", product);
  io.emit("products", products);
};

const modeMongoCreate = async (socketClient,product) => {
  await productSchema.create(product);
  socketClient.emit("success-create", product);
  //io.emit("products", products);  
};

export default init;
