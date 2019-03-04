const todosController = require('../controllers').todos;
const companiesController = require('../controllers').companies;
const employeesController = require('../controllers').employees;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Todos API!',
    }));

    app.post('/api/todos', todosController.create);
    app.post('/api/companies', companiesController.create);
    app.get('/api/companies', companiesController.list);
    app.post('/api/companies/:companyId/employees', employeesController.create);
    app.get('/api/employees', employeesController.list);
};