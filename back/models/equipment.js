module.exports = (sequelize, DataTypes) => {
    const Equipment = sequelize.define(
      "Equipment",
      {
        hat: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        clothes: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        hair: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        bg: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
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
  