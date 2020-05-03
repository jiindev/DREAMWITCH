module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define(
    "History",
    {
      content: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  History.associate = (db) => {
    db.History.belongsTo(db.User);
    db.History.hasMany(db.Todo);
    db.History.hasMany(db.Comment);
  };

  return History;
};
