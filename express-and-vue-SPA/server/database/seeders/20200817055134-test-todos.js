'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('Todos', [
      {
        title: 'タイトル1',
        content: 'コンテンツ1',
        user_id: 1,
        is_completed: true,
        created_at: now,
        updated_at: now
      },
      {
        title: 'タイトル2',
        content: 'コンテンツ2',
        user_id: 2,
        is_completed: true,
        created_at: now,
        updated_at: now
      },
      {
        title: 'タイトル3',
        content: 'コンテンツ3',
        user_id: 1,
        is_completed: false,
        created_at: now,
        updated_at: now
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todos', null, {});
  }
};
