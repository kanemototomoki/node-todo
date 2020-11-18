const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      Todo.belongsTo(models.User);
    };

    static getTodoList(userId) {
      return this.findAll({
        where: {
          'user_id': userId,
        },
        attributes: [
          ['id', 'id'],
          ['title', 'title'],
          ['content', 'content'],
          ['is_completed', 'isCompleted'],
        ],
      });
    };

    static addTodo(param) {
      return this.create({
        title: param.title,
        content: param.content,
        is_completed: param.isCompleted,
        user_id: param.userId,
      });
    };

    static updateTodo(param) {
      return this.update({
        title: param.title,
        content: param.content,
        is_completed: param.isCompleted,
      }, {
        where: {
          id: param.id,
        },
      });
    };

    static deleteTodo(id) {
      return this.destroy({
        where: {
          id,
        },
      });
    };
  };

  Todo.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    is_completed: DataTypes.BOOLEAN,
  }, {
    sequelize,
    underscored: true,
    modelName: 'Todo',
  });
  return Todo;
}
