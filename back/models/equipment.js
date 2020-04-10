module.exports = (sequelize, DataTypes) => {
  const Equipment = sequelize.define(
    "Equipment",
    {
      hair: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      face: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      head: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cloth: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      background: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      etc: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Equipment.associate = (db) => {
    db.Equipment.belongsTo(db.User);
  };

  return Equipment;
};
