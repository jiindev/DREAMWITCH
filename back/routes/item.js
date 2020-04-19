const express = require("express");
const router = express.Router();
const db = require('../models');

router.post("/", async(req, res, next) => {
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

router.patch("/equip/:id", async(req, res, next) => {
  //아이템 장착
  try{
    const unEquippedItems = await db.Item.update({
      equipped: false
    }, {
      where: {
        UserId: req.user.id,
        itemType: req.body.itemType
      }
    });
    const equippedItem = await db.Item.update({
      equipped: true
    }, {
      where: {
        itemId: req.params.id,
        UserId: req.user.id,
      }
    });
    const fullEquippedItem = await db.Item.findOne({
      where: {
        itemId: req.params.id,
        UserId: req.user.id
      },
      attributes: ['itemType', 'itemId', 'equipped'],
    });
    res.send(fullEquippedItem);
  }catch(e){
    console.error(e);
    next(e);
  }
});

router.patch("/unequip", async(req, res, next) => {
  //아이템 장착해제
  try{
    const unEquippedItem = await db.Item.update({
      equipped: false
    }, {
      where: {
        itemId: req.body.itemId,
        UserId: req.user.id,
        equipped: true,
        itemType: req.body.itemType,
      }
    });
    res.send(req.body.itemType);
  }catch(e){
    console.error(e);
    next(e);
  }
});


module.exports = router;
