const express = require("express");

const db = require("./models");
const userAPIRouter = require("./routes/user");
const todoAPIRouter = require("./routes/todo");
const todosAPIRouter = require("./routes/todos");
const historyAPIRouter = require("./routes/history");
const historiesAPIRouter = require("./routes/histories");
const itemAPIRouter = require("./routes/item");
const itemsAPIRouter = require("./routes/items");
const app = express();

db.sequelize.sync();

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
