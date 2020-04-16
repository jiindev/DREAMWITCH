const express = require("express");
const router = express.Router();
const db = require('../models');



router.post("/", async(req, res, next) => {
  // 히스토리 생성
  try{
    let newHistory = await db.History.create({
      date: req.body.date,
      UserId: req.user.id,
      content: req.body.content,
    });

    const clearedTodos = await db.Todo.update({
      HistoryId: newHistory.id
    }, {
      where: {date: req.body.date, UserId: req.user.id}
    });

    const fullHistory = await db.History.findOne({
      where: {id: newHistory.id},
      include: [{
        model: db.Todo,
        attributes: ['id', 'content'],
      }]
    })
    res.json(fullHistory);
  }catch(e){
    console.error(e);
    next(e);
  }
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
