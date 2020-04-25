const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();
const db = require("../models");

router.get("/", async(req, res, next) => {
  // 친구 목록 전달
  try{
    return res.send([{id: 1, userId:'dfsf', nickname:'안뇽'}, {id: 5, userId:'2222', nickname:'하이'}, {id: 6, userId:'422', nickname:'닉넴'}]);
  }catch(e){
      console.error(e);
      next(e);
  }
});

module.exports = router;
