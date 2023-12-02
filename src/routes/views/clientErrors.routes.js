import { Router } from "express";

const clientErrorRouter = Router();

clientErrorRouter.get("/badRequest", (req, res) => {
  res.render('badRequest');
});

clientErrorRouter.get('/unauthenticated', (req, res) => {
  res.render('unauthenticated');
});

export default clientErrorRouter;