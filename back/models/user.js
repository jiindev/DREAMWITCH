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
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: '풋내기',
      },
      exp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      star: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5,
      },
      lastStart : {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 0
      },
      greetings: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: '안녕~ 반가워!'
      },
      private: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    db.User.hasOne(db.Equipment);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'followingId'});
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'followerId'});
  };

  return User;
};
