'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dislike_post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Dislike_post.belongsTo(models.User, { foreignKey: { allowNull: false }, onDelete:'CASCADE' }),
      models.Dislike_post.belongsTo(models.Post, { foreignKey: { allowNull: false }, onDelete:'CASCADE' })
    }
  };
  Dislike_post.init({

  }, {
    sequelize,
    modelName: 'Dislike_post',
  });
  return Dislike_post;
};