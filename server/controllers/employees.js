const Employee = require('../models').Employee;

module.exports = {
    // Add a new employee to the system.  Required Params are name and title.
    // An employee defaults to no supervisor and has a status of active
    // Employee status can be anything but expected values are "Active" or "Terminated"
    beforeCreate(req, res) {

    },
    create(req, res) {
        return Employee
            .create({
                name: req.body.name,
                title: req.body.title,
                supervisor: req.body.supervisor,
                companyId: req.params.companyId,
                status: req.body.status,
            })
            .then(employee => res.status(201).send(employee))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Employee
            .all({
                raw: true,
            })
            .then(employees =>
            {
                var map = {};
                for(var i = 0; i < employees.length; i++){

                    var emp = employees[i];
                    emp.supervisors = [emp.supervisor];
                    map[employees[i].id] = emp;
                }
                for(var i = 0; i < employees.length; i++){
                    try {
                        var emp = employees[i];
                        var sup = map[emp.supervisor].supervisor;
                        while (map[sup]) {
                            console.log(map[sup]);
                            emp.supervisors.push(sup);
                            sup = map[sup].supervisor;
                            console.log(emp);

                        }
                        // console.log(emp);
                    } catch (error){}
                }
                // var r = convert(arry);

                // var emp = arry.find(findEmployee);
                function getEmployee(employee) {
                    return employee.id == req.params.employeeId;
                }
                console.log(map)
                var emp = employees.find(function(element) {
                    console.log(element.id);
                    return element.id == req.params.employeeId;

                });

                console.log(req.params.employeeId);
                res.status(200).send(employees);
            })
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return Employee
            .all({
                raw: true,
            })
            .then(employees =>
            {

                    var map = {};
                    for(var i = 0; i < employees.length; i++){

                        var emp = employees[i];
                        emp.supervisors = [emp.supervisor];
                        map[employees[i].id] = emp;
                    }



                    for(var i = 0; i < employees.length; i++){
                        try {
                            var emp = employees[i];
                            var sup = map[emp.supervisor].supervisor;
                            while (map[sup]) {
                                console.log(map[sup]);
                                emp.supervisors.push(sup);
                                sup = map[sup].supervisor;
                                console.log(emp);

                            }
                           // console.log(emp);
                        } catch (error){}
                    }
                    // var r = convert(arry);

                    // var emp = arry.find(findEmployee);
                    function getEmployee(employee) {
                        return employee.id == req.params.employeeId;
                    }
                console.log(map)
                    var emp = employees.find(function(element) {
                        console.log(element.id);
                        return element.id == req.params.employeeId;

                    });

                    console.log(req.params.employeeId);
                    res.status(200).send(emp);
                })

            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Employee
            .find({
                where: {
                    id: req.params.employeeId,
                    companyId: req.params.companyId,
                },
            })
            .then(employee => {
                if (!employee) {
                    return res.status(404).send({
                        message: 'Employee Not Found',
                    });
                }

                return employee
                    .update({
                        supervisor: req.body.supervisor || employee.supervisor,
                        title: req.body.title || employee.title,
                        status: req.body.status || employee.status,
                        name: req.body.name  || employee.name,
                    })
                    .then(updatedEmployee => res.status(200).send(updatedEmployee))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        return Employee
            .find({
                where: {
                    id: req.params.employeeId,
                    companyId: req.params.companyId,
                },
            })
            .then(employee => {
                if (!employee) {
                    return res.status(404).send({
                        message: 'Employee Not Found',
                    });
                }
                return employee
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};
