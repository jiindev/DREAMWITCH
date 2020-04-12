const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const dotenv = require("dotenv");
const passport = require("passport");

const passportConfig = require("./passport");
const db = require("./models");
const userAPIRouter = require("./routes/user");
const todoAPIRouter = require("./routes/todo");
const todosAPIRouter = require("./routes/todos");
const historyAPIRouter = require("./routes/history");
const historiesAPIRouter = require("./routes/histories");
const itemAPIRouter = require("./routes/item");
const itemsAPIRouter = require("./routes/items");
dotenv.config();
const app = express();

db.sequelize.sync();
passportConfig();

app.use(morgan("dev"));
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/user", userAPIRouter);
app.use("/api/todo", todoAPIRouter);
app.use("/api/todos", todosAPIRouter);
app.use("/api/history", historyAPIRouter);
app.use("/api/histories", historiesAPIRouter);
app.use("/api/item", itemAPIRouter);
app.use("/api/items", itemsAPIRouter);

app.listen(3065, () => {
  console.log("server is running on http://localhost:3065");
});
