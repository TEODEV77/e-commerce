const { Router } = require("express");

const socketProductRouter = Router();

socketProductRouter.get("/realtimeproducts", (req, res) => {
  res.render('realTimeProducts')
});

module.exports = socketProductRouter;