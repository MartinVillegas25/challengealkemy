'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('peliculaoseries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imagen: {
        type: Sequelize.BLOB
      },
      titulo: {
        type: Sequelize.STRING
      },
      fechacreacion: {
        type: Sequelize.STRING
      },
      clasificacion: {
        type: Sequelize.STRING
      },
      personajesasociados: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('peliculaoseries');
  }
};