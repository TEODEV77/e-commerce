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
      await productManager.create(product);
      console.log("Created", product);
      io.emit("products", products);
    });
  });
};

module.exports = init;
