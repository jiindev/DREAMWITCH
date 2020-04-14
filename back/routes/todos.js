const express = require("express");
const router = express.Router();
const db = require('../models');

router.get("/", async(req, res, next) => {
  // 사용자의 그날의 투두리스트 불러오기
  try {
    const todos = await db.Todo.findAll({
      where: {
        userId: req.user.id,
      },
      order: [['createdAt', 'ASC']]
    });
    return res.json(todos);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;
