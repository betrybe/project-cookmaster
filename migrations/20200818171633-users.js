'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      queryInterface.createTable(
        'users',
        {
          id:      { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
          email:   { type: Sequelize.STRING},
          password:   { type: Sequelize.STRING},
          first_name:   { type: Sequelize.STRING},
          last_name:   { type: Sequelize.STRING}
        },
      )

      await transaction.commit()
    } catch (e) {
      await transaction.rollback()
      throw e
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
