const express = require("express");
const router = express.Router();
const db = require('../models');

router.get("/", async(req, res, next) => {
  // 유저 본인의 전체 히스토리 불러오기
  try{
    const histories = await db.History.findAll({
      where: {
        userId: req.user.id
      },
      order: [['createdAt', 'DESC']]
    });
    return res.json(histories);
  }catch(e){
    console.error(e);
    return next(e);
  }
});

router.get("/:id", async(req, res, next) => {
  // 특정 사용자의 전체 히스토리 불러오기
  try{
    const histories = await db.History.findAll({
      where: {
        userId: req.params.id
      },
      order: [['createdAt', 'DESC']]
    });
    return res.json(histories);
  }catch(e){
    console.error(e);
    return next(e);
  }
});

module.exports = router;
