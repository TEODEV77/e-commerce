import { Router } from "express";
//import { isAuth } from "./auth/authentication";
import {
  checkPassword,
  createPayload,
  createUser,
  findEmail,
} from "../dao/user.js";
import { error } from "../class/response.js";
import { isAuth } from "./auth/authentication.js";

const authRoute = Router();

authRoute.post("/sessions/register", async (req, res) => {
  const { body } = req;

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
      const userCheckPass = await checkPassword(password);
      if (userCheckPass) {
        const payload = createPayload(userCheckPass);
        req.session.user = payload;
        res.redirect("/me");
      }
    }
  } catch (error) {}
});

authRoute.get("/sessions/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      res.redirect("/login");
    }
  });
});


export default authRoute;
