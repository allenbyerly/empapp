//We care about employees of a single company,  this data structure supports explicitly defining that company and supports multiple companies in the future
'use strict';
module.exports = (sequelize, DataTypes) => {
  //A Company has a name
  const Company = sequelize.define('Company', {
    name: DataTypes.STRING,
    allowNull: false,
  }, {});
  Company.associate = function(models) {
    // A company has many employees
    Company.hasMany(models.Employee, {
      foreignKey: 'companyId',
      as: 'employees'
    });
  };
  return Company;
};