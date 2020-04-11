module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define(
    "History",
    {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  History.associate = (db) => {
    db.History.belongsTo(db.User);
  };

  return History;
};
