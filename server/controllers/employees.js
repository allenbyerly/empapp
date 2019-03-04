const Employee = require('../models').Employee;

module.exports = {
    create(req, res) {
        return Employee
            .create({
                name: req.body.name,
                title: req.body.title,
                supervisor: req.body.supervisor,
                companyId: req.params.companyId
            })
            .then(employee => res.status(201).send(employee))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Employee
            .all()
            .then(employees => res.status(200).send(employees))
            .catch(error => res.status(400).send(error));
    },
};