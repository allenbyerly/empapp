'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: DataTypes.STRING,
    supervisor: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: "Active",
    },
  });
  Employee.associate = function(models) {
    // associations can be defined here
    Employee.belongsTo(models.Company, {
      foreignKey: 'companyId',
      onDelete: 'CASCADE',
    });
  };
  return Employee;
};