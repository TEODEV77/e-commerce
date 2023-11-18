import { Server } from "socket.io";
import productSchema from "../dao/models/product.model.js";
import messageSchema from "../dao/models/message.model.js";
import {
  createProductAdapter,
  deleteProductAdapter,
  updateProductAdapter,
} from "../dao/productAdapter.js";

let io;

const init = (httpSever) => {
  io = new Server(httpSever);

  io.on("connection", async (socketClient) => {
    console.log(`New client connected ${socketClient.id}`);
    const products = await productSchema.find({}).sort({ createdAt: -1 });
    io.emit("get-products", products);

    const messages = await messageSchema.find({}).sort({ createdAt: -1 });
    io.emit("get-messages", messages);

    socketClient.on("new-product", async (product) => {
      await createProductAdapter(product);
      const products = await productSchema.find({}).sort({ createdAt: -1 });
      io.emit("get-products", products);
    });

    socketClient.on("update-product", async (body) => {
      let oid = body.id;
      delete body.id;
      await updateProductAdapter(oid, body);
      const products = await productSchema.find({}).sort({ createdAt: -1 });
      io.emit("get-products", products);
    });
    socketClient.on("delete-product", async (id) => {
      await deleteProductAdapter(id);
      const products = await productSchema.find({}).sort({ createdAt: -1 });
      io.emit("get-products", products);
    });

    socketClient.on("send-message", async (body) => {
      await messageSchema.create(body);
      const messages = await messageSchema.find({}).sort({ createdAt: -1 });
      io.emit("get-messages", messages);
    });
  });
};

export default init;
