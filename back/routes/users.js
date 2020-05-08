const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();
const db = require("../models");
const sequelize = require('sequelize');

router.get('/today', async(req, res, next) => {
  // 오늘의 사용자 목록 (오늘 todo를 등록한 사용자를 todo 갯수 순으로 최대 5명 나열)
  try{
    let day = new Date();
    let today = day.getFullYear() + "-" + ("0"+(day.getMonth()+1)).slice(-2) + "-" + ("0"+(day.getDate())).slice(-2);
    const recentUsers = await db.Todo.findAll({
      where: {
        createdAt: {
          [sequelize.Op.gte]:today+' 00:00:00',
          [sequelize.Op.lte]:today+' 23:59:59'
        }
      },
      attributes: ['UserId', [sequelize.fn("COUNT", "UserId"), "CountedValue"]],
      include: [{
        model: db.User,
        attributes: ['id', 'userId', 'nickname'],
      }],
      group: ['UserId'],
      order: [[sequelize.literal('CountedValue'), 'DESC']],
      limit: 3,
    })
    return res.send(recentUsers.map((v)=>v.User));
  }catch(e){
      console.error(e);
      next(e);
  }
});

module.exports = router;
