'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like_comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Like_comment.belongsTo(models.User, { foreignKey: { allowNull: false }, onDelete:'CASCADE' }),
      models.Like_comment.belongsTo(models.Comment, { foreignKey: { allowNull: false }, onDelete:'CASCADE' })
    }
  };
  Like_comment.init({
    
  }, {
    sequelize,
    modelName: 'Like_comment',
  });
  return Like_comment;
};