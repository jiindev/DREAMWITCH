const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();
const db = require("../models");

router.get("/", async(req, res, next) => {
  // 유저 정보 프론트로 전달
  if(!req.user){
    return res.status(401).send('로그인이 필요합니다.');
  }
  const user = Object.assign({}, req.user.toJSON());
  delete user.password;
  return res.json(user);
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
    const newEquipment = await db.Equipment.create({
      UserId: newUser.id
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
          attributes: ['id', 'nickname', 'userId', 'level', 'exp', 'star','lastStart'],
        });
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

router.patch('/laststart', async (req, res, next) => {
  //마지막으로 미션을 시작한 시간 기록
  try{
    const changeLastStart = await db.User.update({
      lastStart: req.body.date
    }, {
      where: {id: req.user.id}
    });
    res.send(req.body.date);
  }catch(e){
    console.error(e);
    next(e);
  }
});

router.delete('/friend/:id', async (req, res, next) => {
  //친구 삭제
  try{
    res.send(req.params.id);
  }catch(e){
    console.error(e);
    next(e);
  }
});
router.post('/friend', async (req, res, next) => {
  //친구 추가
  try{
    res.send({id: 11, userId:'test', nickname:'추가된아이디'});
  }catch(e){
    console.error(e);
    next(e);
  }
});

module.exports = router;
