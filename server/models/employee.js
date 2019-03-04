'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: DataTypes.STRING,
    supervisor: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: "Active",
    },
  });
  Employee.associate = function(models) {
    // Employee belongs to Company and has a
    Employee.belongsTo(models.Company, {
      foreignKey: 'companyId',
      onDelete: 'CASCADE',
    });
    Employee.hasMany(models.EmployeeHistory, {
      foreignKey: 'employeeId',
      as: 'employeeHistorys',
    });
    Employee.hasMany(models.Employee, {
      foreignKey: 'supervisor',
      as: 'supervisors',
    });
  };
  return Employee;
};