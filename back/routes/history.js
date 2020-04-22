const express = require("express");
const router = express.Router();
const db = require('../models');
const sequelize = require('sequelize');


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
    const getStars = await db.User.update({
      star: sequelize.literal(`star + 10`)
    }, {
      where: {id: req.user.id}
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
router.get("/:id", async(req, res, next) => {
  // 특정 히스토리 정보 더 가져오기
  try{
    const todos = await db.Todo.findAll({
      where: {
        HistoryId: req.params.id
      },
      order: [['createdAt', 'ASC']],
      attributes: ['content'],
    });
    return res.json(todos);
  }catch(e){
    console.error(e);
    return next(e);
  }
});

router.patch("/:id/content", (req, res) => {
  // 특정 히스토리 텍스트 변경
});
router.delete("/:id", (req, res) => {
  // 특정 히스토리 삭제
});

module.exports = router;
