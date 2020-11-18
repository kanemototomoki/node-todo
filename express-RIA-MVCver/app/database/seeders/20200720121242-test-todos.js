'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('Todos', [
      {
        title: 'タイトル1',
        content: 'コンテンツ1',
        created_at: now,
        updated_at: now
      },
      {
        title: 'タイトル2',
        content: 'コンテンツ2',
        created_at: now,
        updated_at: now
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todos', null, {});
  }
};
