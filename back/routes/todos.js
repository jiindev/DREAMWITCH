const express = require("express");
const router = express.Router();
const db = require('../models');
const sequelize = require('sequelize');
const moment = require('moment');
moment.locale('ko');
      
router.get("/", async(req, res, next) => {
  // 나의 그날의 투두리스트 불러오기
  try {
    let today = moment().format('YYYY-MM-DD');
    const todos = await db.Todo.findAll({
      where: {
        userId: req.user.id,
        createdAt: {
          [sequelize.Op.gte]:today+' 00:00:00',
          [sequelize.Op.lte]:today+' 23:59:59'
        }
      },
      order: [['createdAt', 'ASC']]
    });
    return res.send(todos);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get("/:id", async(req, res, next) => {
  // 특정 사용자의 그날의 투두리스트 불러오기
  try {
    let today = moment().format('YYYY-MM-DD');
    const todos = await db.Todo.findAll({
      where: {
        userId: req.params.id,
        createdAt: {
          [sequelize.Op.gte]:today+' 00:00:00',
          [sequelize.Op.lte]:today+' 23:59:59'
        }
      },
      order: [['createdAt', 'ASC']]
    });
    return res.send(todos);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get("/last/:lastStart", async(req, res, next) => {
  // 사용자의 지난 투두리스트 불러오기
  try {
    const lastDate = await db.Todo.findOne({
      where: {
        userId: req.user.id,
        createdAt: {[sequelize.Op.gte]:req.params.lastStart}
      },
      order: [['createdAt', 'DESC']],
      attributes: ['createdAt']
    });
    let lastTodos = [];
    if(lastDate){
      lastTodos = await db.Todo.findAll({
        where: {
          userId: req.user.id,
          createdAt: {
            [sequelize.Op.gte]:moment(lastDate.createdAt).format('YYYY-MM-DD')+' 00:00:00',
            [sequelize.Op.lte]:moment(lastDate.createdAt).format('YYYY-MM-DD')+' 23:59:59'
          },
        },
        order: [['createdAt', 'ASC']]
      });
    }
    return res.json(lastTodos);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.delete("/last/:date", async(req, res, next) => {
  try{
    await db.Todo.destroy({
      where: {
        createdAt: {
          [sequelize.Op.gte]:req.params.date+' 00:00:00',
          [sequelize.Op.lte]:req.params.date+' 23:59:59'
        },
        UserId: req.user.id,
      }
    });
    res.send(req.body.date);
  }catch(e){
    console.error(e);
    next(e);
  }
});

router.post("/", async(req, res, next) => {
  //지난 할일 목록에서 투두 복사
  try{
    let fullTodos = [];
    let today = moment().format('YYYY-MM-DD');
    if(req.body.todosToCopy){
      const copiedTodos = req.body.todosToCopy.map((v, i)=>{
        return {content: v, UserId: req.user.id};
      })
      coppyTodos = await db.Todo.bulkCreate(copiedTodos);
      fullTodos = await db.Todo.findAll({
        where: {
          UserId: req.user.id,
          createdAt: {
            [sequelize.Op.gte]:today+' 00:00:00',
            [sequelize.Op.lte]:today+' 23:59:59'
          }
        }
      })
    }
    res.json(fullTodos);
  }catch(e){
    console.error(e);
    next(e);
  }
});

module.exports = router;
