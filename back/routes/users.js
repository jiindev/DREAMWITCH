const express = require("express");
const router = express.Router();
const db = require("../models");


router.get('/rank', async(req, res, next) => {
  // 사용자 순위 (경험치순으로 5명 나열)
  try{
    const userRanking = await db.User.findAll({
      where: {
        private: false
      },
      attributes: ['userId', 'id', 'nickname'],
      order: [['exp', 'DESC']],
      limit: 5,
    })
    return res.json(userRanking);
  }catch(e){
      console.error(e);
      next(e);
  }
});

module.exports = router;
