const Company = require('../models').Company;

module.exports = {
    create(req, res) {
        return Company
            //create a company requires a name
            .create({
                name: req.body.name,
            })
            .then(company => res.status(201).send(company))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Company
            .all()
            .then(companies => res.status(200).send(companies))
            .catch(error => res.status(400).send(error));
    },
};