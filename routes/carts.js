const express = require("express");
const router = express.Router();

const Cart = require("../schemas/carts.js");
const Goods = require("../schemas/goods.js");

// localhost:3000/api/carts Get Method
router.get("/carts", async(req, res) => {
  const carts = await Cart.find({}); // Cart안에있는 모든 정보를 가지고 와서 carts라는 변수에 할당을 해준다.
  // [
  //   {goodsId, quantity}
  // ]
  const goodsIds = carts.map((cart) =>{
    return cart.goodsId;
  });
  // [2, 11, 1];

  const goods = await Goods.find({goodsId: goodsIds})
  // Goods에 해당하는 모든 정보르 가지고 올건데,
  // 만약 goodsIds 변수 안에 존재하는 값일 때에만 조회해라.

  const results = carts.map((cart) => {
    return {
      "quantity": cart.quantity,
      "goods": goods.find((item) => item.goodsId === cart.goodsId),
    }
  })

  res.json({
    "carts": results
  })
});



module.exports = router