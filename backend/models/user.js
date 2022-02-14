'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Post),
      models.User.hasMany(models.Comment),
      models.User.hasMany(models.Like_post),
      models.User.hasMany(models.Dislike_post),
      models.User.hasMany(models.Like_comment),
      models.User.hasMany(models.Dislike_comment)
    }
  };
  User.init({
    photoProfil: { type: DataTypes.STRING, allowNull: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false},
    bio: { type: DataTypes.STRING, allowNull: true },
    isAdmin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }, 
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};