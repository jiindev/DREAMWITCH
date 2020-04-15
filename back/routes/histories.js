const express = require("express");
const router = express.Router();
const db = require('../models');

router.get("/", async(req, res, next) => {
  // 사용자의 전체 히스토리 불러오기
  try{
    const histories = await db.History.findAll({
      where: {
        userId: req.user.id
      },
      include: [{
        model: db.Todo,
        attributes: ['id', 'content'],
      }],
      order: [['createdAt', 'DESC']]
    });
    return res.json(histories);
  }catch(e){
    console.error(e);
    return next(e);
  }
});

module.exports = router;
