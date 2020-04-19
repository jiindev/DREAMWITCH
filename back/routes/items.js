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
      attributes: ['itemType', 'itemId', 'equipped'],
      order: [['createdAt', 'ASC']]
    });
    return res.json(items);
  }catch(e){
    console.error(e);
    return next(e);
  }
});

module.exports = router;
