const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('Users', [
      {
        username: 'user1',
        password: 'sugoi_pw',
        password_hash: bcrypt.hashSync('sugoi_pw', bcrypt.genSaltSync(10)),
        created_at: now,
        updated_at: now
      },
      {
        username: 'user2',
        password: 'yabai_pw',
        password_hash: bcrypt.hashSync('yabai_pw', bcrypt.genSaltSync(10)),
        created_at: now,
        updated_at: now
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
