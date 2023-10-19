const { Router } = require("express");
const router = Router();

router.get("/products", (req, res) => {
  res.json({
    msg: "Products works",
  });
});

module.exports = router;