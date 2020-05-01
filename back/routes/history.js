const express = require("express");
const router = express.Router();
const db = require('../models');
const sequelize = require('sequelize');
const {historyExists} = require('./middleware');

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
    const comments = await db.Comment.findAll({
      where: {
        HistoryId: req.params.id
      },
      order: [['createdAt', 'ASC']],
      include:[{
        model: db.User,
        attributes: ['id', 'nickname'],
      }]
    });
    return res.json({todos, comments});
  }catch(e){
    console.error(e);
    return next(e);
  }
});

router.post('/:id/comment', historyExists, async(req, res, next)=>{
  try{
    const history = req.history;
    const newComment = await db.Comment.create({
      UserId: req.user.id,
      HistoryId: req.params.id,
      content: req.body.content
    });
     await history.addComment(newComment.id);
     const comment = await db.Comment.findOne({
       where: {
         id: newComment.id,
       },
       include:[{
         model: db.User,
         attributes: ['id', 'nickname', 'userId'],
       }]
     });
     return res.json(comment);
  }catch(e){
    console.error(e);
    return next(e);
  }
});

router.delete('/comment/:id', async(req, res, next)=>{
  try{
    await db.Comment.destroy({
      where: {
        id: req.params.id
      }
    });
     return res.send(req.params.id);
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
