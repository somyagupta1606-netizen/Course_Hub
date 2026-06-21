const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeFromCart,
} = require("../controllers/cartController");

const authentication = require("../middlewares/auth");

router.post("/add", authentication, addToCart);
router.get("/get", authentication, getCart);
router.delete("/remove/:id", authentication, removeFromCart);


module.exports = router