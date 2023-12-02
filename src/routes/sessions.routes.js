import { Router } from "express";
import bcrypt from "bcrypt";
import {
  checkPassword,
  createPayload,
  createUser,
  findEmail,
} from "../dao/user.js";

const authRoute = Router();

authRoute.post("/sessions/register", async (req, res) => {
  const { body } = req;

  const { password } = body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  body.password = hash;

  try {
    const user = await createUser(body);
    res.redirect("/login");
  } catch (error) {
    res.json(error.message);
  }
});

authRoute.post("/sessions/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCheckEmail = await findEmail(email);
    if (userCheckEmail) {
      const passwordHash = userCheckEmail.password;
      const login = bcrypt.compareSync(password, passwordHash);
      console.log(login);
      if (login) {
        const payload = createPayload(userCheckEmail);
        req.session.user = payload;
        res.redirect("/me");
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
