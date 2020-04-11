const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  // 아이템 구매
});

router.post("/:id/", (req, res) => {
  // 아이템 구매
});

router.patch("/:id/equip", (req, res) => {
  // 아이템 장착 / 장착 해제
});

module.exports = router;
