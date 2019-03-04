'use strict';
module.exports = (sequelize, DataTypes) => {
    const EmployeeHistory = sequelize.define('EmployeeHistory', {
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
       // startdate: {
       //     type: DataTypes.DATE,
       //     defaultValue: Date().toString(),
       // },

    });
    EmployeeHistory.associate = function(models) {
        // associations can be defined here
        EmployeeHistory.belongsTo(models.Employee, {
            foreignKey: 'employeeId',
            onDelete: 'CASCADE',
        });
    };
    return EmployeeHistory;
};