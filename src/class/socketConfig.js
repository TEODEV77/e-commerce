const { Server } = require("socket.io");
const ProductMaganer = require("./productManager");

const productManager = new ProductMaganer();

let io;
let products;

const init = (httpSever) => {
  io = new Server(httpSever);

  io.on("connection", async (socketClient) => {
    console.log(`New client connected ${socketClient.id}`);
    products = await productManager.getProducts();
    socketClient.emit("products", products);
    socketClient.on("new-product", async (product) => {
      let productCode = product.code;
      product = await productManager.create(product);
      if (product === 0) {
        socketClient.emit("fire", productCode);
        return;
      }
      socketClient.emit("success-create", product);
      io.emit("products", products);
    });

    socketClient.on("update-product", async (product) => {
      const id = product.id;
      delete product.id;
      const status = await productManager.update(id,product);
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

module.exports = init;
