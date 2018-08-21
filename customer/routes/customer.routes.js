module.exports = (app) => {
    const customers = require('../controllers/customer.controller.js');
console.log("customer router>> ");
    // Create a new customer
    app.post('/customers', customers.create);

    // Retrieve all customers
    app.get('/customers', customers.findAll2);

    // Retrieve a single customer with customerId
    app.get('/customers/:customerId', customers.findOne);

    // Update a customer with customerId
    app.put('/customers/:customerId', customers.update);

    // Delete a customer with customerId
    app.delete('/customers/:customerId', customers.delete);
}