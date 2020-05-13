const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const db = require("../models");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "userId",
        passwordField: "password",
      },
      async (userId, password, done) => {
        try {
          const user = await db.User.findOne({ where: { userId } });
          if (!user) {
            return done(null, false, { reason: "가입하지 않은 아이디이거나, 잘못된 비밀번호입니다." });
          }
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            return done(null, user);
          }
          return done(null, false, { reason: "가입하지 않은 아이디이거나, 잘못된 비밀번호입니다." });
        } catch (e) {
          console.error(e);
          return done(e);
        }
      }
    )
  );
};
