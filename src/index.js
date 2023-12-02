import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import { __dirname } from "./utils.js";

import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";

import socketProductRouter from "./routes/product.socket.routes.js";
import chatRouter from "./routes/chat.routes.js";
import productsViewRouter from "./routes/views/products.render.routes.js";
import session from "express-session";
import loginRouter from "./routes/views/login.routes.js";
import MongoStore from "connect-mongo";
import { MONGO_URI } from "./database/mongodb.js";
import authRoute from "./routes/sessions.routes.js";
import clientErrorRouter from "./routes/views/clientErrors.routes.js";

const app = express();

const secret = "secret-74267136547921";

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
      mongoOptions: {},
      ttl: (60*2),
    }),
    secret,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.engine("handlebars", engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use("/api", productsRouter, cartsRouter, authRoute);
app.use("/", clientErrorRouter ,socketProductRouter, chatRouter, productsViewRouter, loginRouter);

app.use((error, req, res, next) => {
  res.status(500).send("Something broke!");
});

export default app;
