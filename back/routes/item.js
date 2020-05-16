const express = require("express");
const router = express.Router();
const db = require('../models');
const sequelize = require('sequelize');

router.post("/", async(req, res, next) => {
  //아이템 구매
  try{
    const useStars = await db.User.update({
      star: sequelize.literal(`star - ${req.body.price}`)
    }, {
      where: {id: req.user.id}
    });
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

router.patch("/equip", async(req, res, next) => {
  //아이템 장착
  try{
    const equippedItem = await db.Equipment.update({
      [req.body.itemType]: req.body.itemId
    }, {
      where: {
        UserId: req.user.id,
      }
    });
    res.json({itemType: req.body.itemType, itemId: req.body.itemId});
  }catch(e){
    console.error(e);
    next(e);
  }
});

router.patch("/unequip", async(req, res, next) => {
  //아이템 장착해제
  try{
    db.Equipment.itemType = req.body.itemType;
    const equippedItem = await db.Equipment.update({
      [req.body.itemType]: 0
    }, {
      where: {
        UserId: req.user.id,
      }
    });
    res.send(req.body.itemType);
  }catch(e){
    console.error(e);
    next(e);
  }
});


module.exports = router;
