const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {};

  Todo.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  }, {
    sequelize,
    underscored: true,
    modelName: 'Todo',
  });
  return Todo;
};
