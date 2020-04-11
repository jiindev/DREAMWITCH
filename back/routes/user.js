const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // 유저 정보 프론트로 전달
});
router.post("/", (req, res) => {
  // 회원가입
});
router.post("/login", (req, res) => {
  // 로그인
});
router.post("/logout", (req, res) => {
  // 로그아웃
});

module.exports = router;
