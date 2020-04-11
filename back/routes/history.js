const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  // 히스토리 생성
});
router.get("/:id/todos", (req, res) => {
  // 그 날짜에 해당하는 투두 목록 불러오기
});
router.patch("/:id/content", (req, res) => {
  // 특정 히스토리 텍스트 변경
});
router.delete("/:id", (req, res) => {
  // 특정 히스토리 삭제
});

module.exports = router;
