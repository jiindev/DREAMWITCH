const passport = require("passport");
const db = require("../models");
const local = require("./local");

module.exports = () => {
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.User.findOne({
        where: { id },
        include: [{
          model: db.User,
          as: 'Followings',
          attributes: ['id', 'nickname', 'userId']
        }],
        attributes: ['id', 'nickname', 'userId', 'level', 'exp', 'star', 'lastStart', 'greetings', 'private'],
      });
      return done(null, user);
    } catch (e) {
      console.error(e);
      return done(e);
    }
  });
  local();
};
