'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dislike_comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Dislike_comment.belongsTo(models.User, { foreignKey: { allowNull: false }, onDelete:'CASCADE' }),
      models.Dislike_comment.belongsTo(models.Comment, { foreignKey: { allowNull: false }, onDelete:'CASCADE' })
    }
  };
  Dislike_comment.init({
    
  }, {
    sequelize,
    modelName: 'Dislike_comment',
  });
  return Dislike_comment;
};