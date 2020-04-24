module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      exp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      star: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      lastStart : {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Todo, {as:'Todos'});
    db.User.hasMany(db.History);
    db.User.hasMany(db.Item, {as:'Items'});
  };

  return User;
};
