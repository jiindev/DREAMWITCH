const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  // 투두 항목 추가
});
router.patch("/:id", (req, res) => {
  // 투두 항목 내용 수정
});
router.patch("/:id/check", (req, res) => {
  // 투두 항목 체크 / 언체크
});
router.delete("/:id", (req, res) => {
  // 투두 항목 삭제
});

module.exports = router;
