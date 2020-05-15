const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();
const db = require("../models");

router.post("/", async(req, res, next) => {
  try{
    const newTodo = await db.Todo.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    const me = await db.User.findOne({
      where: {id:req.user.id}
    });
    await me.addTodo(newTodo.id);
    const fullTodo = await db.Todo.findOne({
      where: {id:newTodo.id},
    })
    res.json(fullTodo);
  }catch(e){
    console.error(e);
    next(e);
  }
});
router.patch("/:id", async(req, res, next) => {
  // 투두 항목 내용 수정
  try{
    const editTodo = await db.Todo.update({
      content: req.body.content
    }, {
      where: {id: req.params.id}
    });
    res.json({id: parseInt(req.params.id, 10), content: req.body.content});
  }catch(e){
    console.error(e);
    next(e);
  }
});
router.patch("/:id/check", async (req, res, next) => {
  // 투두 항목 체크 / 언체크
  try{
    const checkTodo = await db.Todo.update({
      checked: !req.body.checked
    }, {
      where: {id: req.params.id}
    });
    res.json({id: parseInt(req.params.id, 10), checked: !req.body.checked});
  }catch(e){
    console.error(e);
    next(e);
  }
});
router.delete("/:id", async(req, res, next) => {
  // 투두 항목 삭제
  try{
    await db.Todo.destroy({
      where: {
        id: req.params.id
      }
    });
    res.send(req.params.id);
  }catch(e){
    console.error(e);
    next(e);
  }
});

module.exports = router;
