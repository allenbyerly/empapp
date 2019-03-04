module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Company.associate = (models) => {
    Company.hasMany(models.Employee, {
      foreignKey: 'employeeId',
      as: 'employees',
    });
  };

  return Company;
};