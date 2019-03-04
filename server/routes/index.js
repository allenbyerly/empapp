const todosController = require('../controllers').todos;
const companiesController = require('../controllers').companies;
const employeesController = require('../controllers').employees;
const employeeHistorysController = require('../controllers').employeeHistorys;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Todos API!',
    }));

    app.post('/api/todos', todosController.create);
    app.post('/api/companies', companiesController.create);
    app.get('/api/companies', companiesController.list);
    app.get('/api/companies/:companyId', companiesController.retrieve);
    app.put('/api/companies/:companyId', companiesController.update);

    app.get('/api/companies/:companyId/employees', employeesController.list);
    app.get('/api/companies/:companyId/employees/:employeeId', employeesController.retrieve);
    app.post('/api/companies/:companyId/employees', employeesController.create);
    app.put('/api/companies/:companyId/employees/:employeeId', employeesController.update);

    app.get('/api/companies/:companyId/employees/:employeeId/titles', employeeHistorysController.list);
};