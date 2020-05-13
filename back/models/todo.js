module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "Todo",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      checked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Todo.associate = (db) => {
    db.Todo.belongsTo(db.User);
    db.Todo.belongsTo(db.History);
  };

  return Todo;
};
