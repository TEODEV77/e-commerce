const { Server } = require("socket.io");
const ProductMaganer = require("./productManager");

const productManager = new ProductMaganer();

let products = [];

const init = (httpSever) => {
  const socketSever = new Server(httpSever);

  socketSever.on("connection", async (socketClient) => {
    console.log("SC", socketClient.id);
    products = await productManager.getProducts();
    socketClient.emit("products", products);
  });
};

module.exports = init;
