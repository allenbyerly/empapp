'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      supervisor: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      //added relationship with contraints so that a company must exist for an employeee to be created and if the company is deleted the employee will be deleted
      companyId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Companies',
          key: 'id',
          as: 'companyId',
        },
    });
  },
  down: (queryInterface/*, Sequelize*/) => {
    return queryInterface.dropTable('Employees');
  }
};