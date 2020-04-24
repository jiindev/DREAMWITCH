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
        attributes: ['id', 'nickname', 'userId', 'level', 'exp', 'star', 'lastStart'],
      });
      return done(null, user);
    } catch (e) {
      console.error(e);
      return done(e);
    }
  });
  local();
};
