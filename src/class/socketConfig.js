import { Server } from "socket.io";
import productSchema from "../dao/models/product.model.js";
import { createProductAdapter, deleteProductAdapter, updateProductAdapter } from "../dao/productAdapter.js";

let io;

const init = (httpSever) => {
  io = new Server(httpSever);

  io.on("connection", async (socketClient) => {
    console.log(`New client connected ${socketClient.id}`);
    const products = await productSchema.find({}).sort({ createdAt: -1 });
    io.emit("get-products", products);

    socketClient.on("new-product", async (product) => {
      createProductAdapter(product);
      const products = await productSchema.find({}).sort({ createdAt: -1 });
      io.emit("get-products", products);
    });

    socketClient.on("update-product", async (body) => {
      let oid = body.id;
      delete body.id;
      updateProductAdapter(oid,body);
      const products = await productSchema.find({}).sort({ createdAt: -1 });
      io.emit("get-products", products);
    });
    socketClient.on("delete-product", async (id) => {
      deleteProductAdapter(id);
      const products = await productSchema.find({}).sort({ createdAt: -1 });
      io.emit("get-products", products);
    });
  });
};

export default init;
