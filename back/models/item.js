module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    "Item",
    {
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      itemType: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Item.associate = (db) => {
    db.Item.belongsTo(db.User);
  };

  return Item;
};
