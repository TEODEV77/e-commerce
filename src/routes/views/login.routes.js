import { Router } from "express";
import { isAuth } from "../auth/authentication.js";

const loginRouter = Router();

loginRouter.get("/register", (req, res) => {
  res.render('register');
});

loginRouter.get("/login", (req, res) => {
  res.render('login');
});

loginRouter.get("/me", isAuth, (req, res) => {
  res.render('me');
});

export default loginRouter;
