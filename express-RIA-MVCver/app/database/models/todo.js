const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static getAllTodo() {
      return this.findAll().then((todoList) => todoList);
    };

    static getTodo(id) {
      return this.findByPk(id).then((todo) => todo);
    };

    static addTodo(params) {
      return this.create(params).then((res) => res);
    };

    static updateTodo(params) {
      return this.update({
        title: params.title,
        content: params.content,
      }, {
        where: {
          id: params.id,
        },
      }).then((res) => res);
    };

    static deleteTodo(id) {
      return this.destroy({
        where: {
          id,
        },
      }).then((res) => res);
    };
  };

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
