import { Router } from "express";
import bcrypt from "bcrypt";
import {
  createPayload,
  createUser,
  findEmail,
} from "../dao/user.js";
import { createCartAdapter, deleteCartById } from "../dao/cartAdapter.js";

const authRoute = Router();

authRoute.post("/sessions/register", async (req, res) => {
  const { body } = req;

  const { password } = body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  body.password = hash;
  let cid = '';

  try {

    const cart = await createCartAdapter();
    cid = cart._id;
    const user = await createUser(body,cid);
    res.redirect("/login");
    return;
  } catch (error) {
    const result = deleteCartById(cid);
    res.json(error.message);
    return;
  }
});

authRoute.post("/sessions/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCheckEmail = await findEmail(email);
    if (userCheckEmail) {
      const passwordHash = userCheckEmail.password;
      const login = bcrypt.compareSync(password, passwordHash);
      if (login) {
        const payload = createPayload(userCheckEmail);
        req.session.user = payload;
        res.redirect("/products");
        return;
      } else {
        return res.redirect("/badRequest");
      }
    }
  } catch (error) {
    return res.redirect("/badRequest");
  }

  return res.redirect("/badRequest");
});

authRoute.get("/sessions/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      res.redirect("/login");
    }
  });
});

export default authRoute;
