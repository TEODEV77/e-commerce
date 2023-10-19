const { Router } = require("express");
const router = Router();

router.get("/carts", (req, res) => {
  res.json({
    msg: "Carts works",
  });
});

module.exports = router;