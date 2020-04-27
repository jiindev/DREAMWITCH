const express = require("express");
const router = express.Router();
const db = require('../models');

router.get("/", async(req, res, next) => {
  // 사용자의 전체 아이템 불러오기
  try{
    const items = await db.Item.findAll({
      where: {
        userId: req.user.id
      },
      attributes: ['itemType', 'itemId'],
      order: [['createdAt', 'ASC']]
    });
    const equipment = await db.Equipment.findOne({
      where: {
        userId: req.user.id
      },
      attributes: ['hat', 'hair', 'clothes', 'bg'],
    })
    return res.json(items);
  }catch(e){
    console.error(e);
    return next(e);
  }
});

router.get("/equipment", async(req, res, next) => {
  // 사용자 장착 아이템 불러오기
  try{
    const equipment = await db.Equipment.findOne({
      where: {
        userId: req.user.id
      },
      attributes: ['hat', 'hair', 'clothes', 'bg'],
    })
    return res.json(equipment);
  }catch(e){
    console.error(e);
    return next(e);
  }
});

module.exports = router;
