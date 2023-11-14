import { Router } from "express";

const socketProductRouter = Router();

socketProductRouter.get("/realtimeproducts", (req, res) => {
  res.render('realTimeProducts')
});

export default socketProductRouter;