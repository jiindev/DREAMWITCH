const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();
const db = require("../models");

router.get("/", (req, res) => {
  // 유저 정보 프론트로 전달
});
router.post("/", async (req, res, next) => {
  // 회원가입
  try {
    const exUser = await db.User.findOne({
      where: {
        userId: req.body.userId,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await db.User.create({
      nickname: req.body.nickname,
      userId: req.body.userId,
      password: hashedPassword,
    });
    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});
router.post("/login", async (req, res, next) => {
  // 로그인
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async(loginErr) => {
      try{
        if (loginErr) {
          return next(loginErr);
        }
        const fullUser = await db.User.findOne({
          where: {id: user.id},
          include: [{
            model: db.Todo,
            as: 'Todos',
            attributes: ['id'],
          }, {
            model: db.History,
            attributes: ['id'],
          }, {
            model: db.Item,
            as: 'Items',
            attributes: ['id'],
          }],
          attributes: ['id', 'nickname', 'userId', 'level', 'exp'],
        });
        console.log(fullUser);
        return res.json(fullUser);
      }catch(e){
        console.error(e);
        next(e);
      }
      
    });
  })(req, res, next);
});
router.post("/logout", (req, res) => {
  // 로그아웃
  req.logout();
  req.session.destroy();
  res.send("logout 성공");
});

module.exports = router;
