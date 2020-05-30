const express = require("express");
const router = express.Router();
const db = require('../models');
const sequelize = require('sequelize');
const {isLoggedIn } = require('./middleware');

router.post("/", isLoggedIn, async(req, res, next) => {
  //아이템 구매
  try{
    const newItem = await db.Item.create({
      itemId: req.body.itemId,
      itemType: req.body.itemType,
      UserId: req.user.id,
    });
    const fullItem = await db.Item.findOne({
      where: {id:newItem.id},
    })
    res.json(fullItem);
  }catch(e){
    console.error(e);
    next(e);
  }
});

router.patch("/equip", isLoggedIn, async(req, res, next) => {
  //아이템 장착
  try{
    if(req.body.type==='equip'){ //아이템 장착
      const equippedItem = await db.Equipment.update({
        [req.body.itemType]: req.body.itemId
      }, {
        where: {
          UserId: req.user.id,
        }
      });
    }else if(req.body.type==='unequip'){ //아이템 장착 해제
      const unequippedItem = await db.Equipment.update({
        [req.body.itemType]: 0
      }, {
        where: {
          UserId: req.user.id,
        }
      });
    }
    res.json({itemType: req.body.itemType, itemId: req.body.itemId, type:req.body.type});
  }catch(e){
    console.error(e);
    next(e);
  }
});

module.exports = router;
