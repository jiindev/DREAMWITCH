const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();
const db = require("../models");
const {isLoggedIn, isNotLoggedIn} = require('./middleware');
const moment = require('moment-timezone');
const sequelize = require('sequelize');
moment.locale('ko');

router.get("/", isLoggedIn, async(req, res, next) => {
  // 나의 정보 프론트로 전달
  const user = Object.assign({}, req.user.toJSON());
  delete user.password;
  return res.json(user);
});

router.get("/:id", async(req, res, next) => {
  // 특정 사용자 정보 프론트로 전달
  try{
    const user = await db.User.findOne({
      where:{id:parseInt(req.params.id, 10)},
      include:[{
        model: db.Equipment,
        as: 'Equipment',
        attributes: ['id', 'hat', 'clothes', 'hair', 'bg', 'wand', 'cat']
      }],
      attributes: ['id', 'nickname', 'level', 'greetings', 'userId', 'private']
    });
    
    const jsonUser = user.toJSON();
    return res.json(jsonUser);
  }catch(e){
    console.error(e);
    next(e);
  }
});

router.post("/", isNotLoggedIn, async(req, res, next) => {
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
      greetings: req.body.greetings ? req.body.greetings : '안녕~ 반가워!'
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
router.post("/login", async(req, res, next) => {
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
            model: db.User,
            as: 'Followings',
            attributes: ['id', 'nickname', 'userId', 'private']
          }],
          attributes: ['id', 'nickname', 'userId', 'level', 'exp', 'star','lastStart', 'greetings', 'private'],
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

router.patch('/laststart', isLoggedIn, async(req, res, next) => {
  //마지막으로 미션을 시작한 시간 기록
  try{
    let today = moment().tz("Asia/Seoul").format('YYYY-MM-DD');
    const changeLastStart = await db.User.update({
      lastStart: today
    }, {
      where: {id: req.user.id}
    });
    res.send(today);
  }catch(e){
    console.error(e);
    next(e);
  }
});

router.delete('/:id/follow', isLoggedIn, async(req, res, next) => {
  //친구 삭제
  try{
    const me = await db.User.findOne({
      where: {id:req.user.id}
    });
    await me.removeFollowing(req.params.id);
    res.send(req.params.id);
  }catch(e){
    console.error(e);
    next(e);
  }
});

router.post('/:id/follow', isLoggedIn, async(req, res, next) => {
  //친구 추가
  try{
    const following = await db.User.findOne({
      where: {userId: req.params.id},
      attributes: ['id', 'nickname', 'userId']
    });
    if(!following){
      return res.status(403).send("존재하지 않는 아이디입니다.");
    }
    const me = await db.User.findOne({
      where: {id:req.user.id}
    });
    await me.addFollowing(following.id);
    res.json(following);
  }catch(e){
    console.error(e);
    next(e);
  }
});

router.patch("/level", isLoggedIn, async(req, res, next) => {
  //레벨업
  try{
    const levelUp = await db.User.update({
      level: req.body.level,
    }, {
      where: {id: req.user.id}
    });
    res.send(req.body.level);
  }catch(e){
    console.error(e);
    next(e);
  }
});

router.patch("/greetings", isLoggedIn, async(req, res, next) => {
  //인삿말 수정
  try{
    const greetings = await db.User.update({
      greetings: req.body.greetings
    }, {
      where: {id: req.user.id}
    });
    res.send(req.body.greetings);
  }catch(e){
    console.error(e);
    next(e);
  }
});

router.patch("/nickname", isLoggedIn, async(req, res, next) => {
  //닉네임 수정
  try{
    const nickname = await db.User.update({
      nickname: req.body.nickname
    }, {
      where: {id: req.user.id}
    });
    res.send(req.body.nickname);
  }catch(e){
    console.error(e);
    next(e);
  }
});

router.patch("/private", isLoggedIn, async(req, res, next) => {
  //공개 설정 수정
  try{
    const private = await db.User.update({
      private: req.body.private
    }, {
      where: {id: req.user.id}
    });
    res.send(req.body.private);
  }catch(e){
    console.error(e);
    next(e);
  }
});

router.patch('/star', isLoggedIn, async(req, res, next)=>{
 // 별 변동
  try{
    const getStar = await db.User.update({
      star: sequelize.literal(`star +${req.body.star}`),
    }, {
      where: {id: req.user.id}
    });
    res.send(req.body.star.toString());
  }catch(e){
    console.error(e);
    next(e);
  }
});

router.patch('/exp', isLoggedIn, async(req, res, next)=>{
  // 경험치 획득
   try{
    const getExp = await db.User.update({
      exp: sequelize.literal(`exp +${req.body.exp}`),
    }, {
      where: {id: req.user.id}
    });
    res.send(req.body.exp.toString());
   }catch(e){
     console.error(e);
     next(e);
   }
 });
 router.patch('')

module.exports = router;
