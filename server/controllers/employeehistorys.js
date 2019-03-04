const EmployeeHistory = require('../models').EmployeeHistory;

module.exports = {
    // Add a new employee to the system.  Required Params are name and title.
    // An employee defaults to no supervisor and has a status of active
    // Employee status can be anything but expected values are "Active" or "Terminated"
    beforeCreate(req, res) {

    },
    list(req, res) {
        return EmployeeHistory
            .findAll({
                where: {
                    employeeId: req.params.employeeId
                }
            })
            .then(employeeHistory => {
                if (!employeeHistory) {
                    return res.status(404).send({
                        message: 'Employee History Not Found',
                    });
                }
                return res.status(200).send(employeeHistory);
            })
            .catch(error => res.status(400).send(error));
    }
};
