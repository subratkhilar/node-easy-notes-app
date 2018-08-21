const Customer = require('../models/customer.model.js');

// Create and Save a new customer

exports.create=(req,res)=>{
	console.log("inside create coustomer method>> ");
	//validate request
	if(!req.body.customerName){
		return res.status(400).send({
			message:"Customer name can not be empty"
		}
		);
		
	}
	//create a customer
	const customer = new Customer(
	{
		 customerName: req.body.customerName || "Untitled customer", 
        address: req.body.address
	});
	
	 // Save customer in the database
	 customer.save().then(data=>{
		 res.send(data);
	 }).catch(err=>{
		 res.status(500).send({
			  message: err.message || "Some error occurred while creating the customer."
		 });
	 });
};

//find all  data fron db
exports.findAll2=(req,res)=>{
	Customer.find().then(customer=>{
		res.send(customer);
	}).catch(err=>{
		res.status(500).send({
			 message: err.message || "Some error occurred while creating the customer."
		});
	});
};

//find by node id
exports.findOne=(req,res)=>{
	Customer.findById(req.param,customerId).then(customer=>{
		if(!customer) {
            return res.status(404).send({
                message: "customer not found with id " + req.params.customerId
            });            
        }
		res.send(customer);
	}).catch(err=>{
		if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "customer not found with id " + req.params.customerId
            });                
        }
		return resp.status(500).send({
			message: "Error retrieving customer with id " + req.params.customerId
		});
	});
	
};

// Update a customer identified by the customerId in the request
exports.update = (req, res) => {
	// Validate Request
    if(!req.body.customerName) {
        return res.status(400).send({
            message: "customer content can not be empty"
        });
    }
 Customer.findByIdAndUpdate(req.params.customerId, {
        customerName: req.body.customerName || "Untitled customer",
        address: req.body.address
    }, {new: true})
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "customer not found with id " + req.params.customerId
            });
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "customer not found with id " + req.params.customerId
            });                
        }
        return res.status(500).send({
            message: "Error updating customer with id " + req.params.customerId
        });
    });
};


// Delete a customer with the specified customerId in the request
exports.delete = (req, res) => {
Customer.findByIdAndRemove(req.params.customerId)
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "customer not found with id " + req.params.customerId
            });
        }
        res.send({message: "customer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "customer not found with id " + req.params.customerId
            });                
        }
        return res.status(500).send({
            message: "Could not delete customer with id " + req.params.customerId
        });
    });
};