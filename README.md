# empapp
empapp is a a persistent, RESTful web service to manage employment relationships.

Data Model:
- We care about Employees of a single Company
- Each Employee has a globally unique id and a non-unique name.
- Each Employee has exactly one job title at any given time. Employee job titles can change over time, but employees never have multiple concurrent job titles.
- Each Employee has (up to) one boss at any given time. Employees can change who they report to over time, but they never have multiple bosses concurrently.
- Employment can be terminated.

Use Cases:
1. Add a new employee to the system.
2. Assign a new job title to an existing employee.
3. Assign a new boss to an existing employee.
4. Terminate an employee.
5. Enumerate an employee's reporting chain. That is, return their boss's id, their boss's boss's id, and so forth until an employee without a
boss is reached.
6. Enumerate all job title's an employee has held. This operation should continue to work for terminated employees.

##Requirements:
####NodeJS 
####Express
####PostgreSQL
####Sequelize 

##Getting Started


#### 1. Clone and Install

```bash
# Clone the repo
git clone https://github.com/allenbyerly/empapp.git

# Install dependencies
npm install
```


#### 2. Create Database, Run Migrations, & Install SQL Triggers

```bash
# Create DB
createdb empapp-dev

# Run migrations
sequelize db:migrate

# Install SQL Triggers
psql -f triggers.sql empapp-dev
```

#### 2. Start The Server

```
npm  run start:dev
```

The service should be accessible at
```
http//localhost:8000/api/
```

##Using the API

- Create a Company: 

HTTP POST /api/companies with parameters = { name }

- List All Companies (the list includes all the employees (and their details) for each company): 

HTTP GET  /api/companies

- Gets a specific company (this includes all the employees (and their details) for the company): 

HTTP GET  /api/companies/{companyId}
 
 - Gets all the employees (and their details) for the company.  Details include an enumerated list of the supervisor hierarchy for each employee.
 
HTTP GET  /api/companies/{companyId}/employees
 
 - Create an employee
 
HTTP POST  /api/companies/{companyId}/employees with parameters = {name, title, supervisor is optional}

 - Modify an employee (change status to "Terminated", change title, change name, and change supervisor are available)
  
HTTP PUT  /api/companies/{companyId}/employees/{employeeId} with parameters = {name, title, supervisor, status}

 - Gets the details for a specific employee.  Details include an enumerated list of the supervisor hierarchy for each employee.
   
HTTP GET  /api/companies/{companyId}/employees/{employeeId}
 
 - Gets all job titles (history) that an employee has had at a company.
    
HTTP GET  /api/companies/{companyId}/employees/{employeeId}/titles