const Employee = require('../models').Employee;

module.exports = {
    create(req, res) {
        return Employee
            .create({
                name: req.body.name,
            })
            .then(employee => res.status(201).send(employee))
            .catch(error => res.status(400).send(error));
    },
};