const db = require("../database/db.js");
const Delivery = require('../database/models/deliveryDB');
const Customer = require('../database/models/customerDB');
const alert = require('alert');

const controller = {
    getFavicon: function (req, res) {
        res.status(204);
    },

    //Page Navigation
    getIndex: function (req,res){
        res.render('index');
    },

    getMain: function (req,res) {
        res.render('main_menu');
    },

    getAddOrder: function (req,res) {
        res.render('add_order');
    },

    getAddCustomer: function (req,res) {
        res.render('add_customer');
    },

    getDeliveryTable: function (req,res) {
        Delivery.find().lean().exec((err, docs2) => {
            if( docs2 ){

                var order = []
                for(var x in docs2){
                    order.push({
                        id: docs2[x]._id,
                        Name: docs2[x].Name,
                        PhoneNumber: docs2[x].PhoneNumber,
                        Date: docs2[x].Date,
                        Type: docs2[x].Type,
                        Address: docs2[x].Address,
                        GallonsOrdered: docs2[x].GallonsOrdered,
                        AmountDue: docs2[x].AmountDue,
                        Status: docs2[x].Status,
                        Remarks: docs2[x].Remarks,
                    });
                }
            }
            res.render('delivery_table', {
                order});
         })
    },

    getCustomerTable: (req,res,next) => {
        Customer.find().lean().exec((err, docs2) => {
            if( docs2 ){

                var people = []
                for(var x in docs2){
                    people.push({
                        id: docs2[x]._id,
                        Name: docs2[x].Name,
                        PhoneNumber: docs2[x].PhoneNumber,
                        Address: docs2[x].Address,
                        Type: docs2[x].Type,
                        Remarks: docs2[x].Remarks,
                    });
                }
            }
            res.render('customer_table', {
                people});
         })
    },

    getUpdateOrder: function (req,res) {
        var reqID = req.query.id;
        db.findOne(Delivery, {_id: reqID}, {}, function(result){
            if(result){
                var delivery = {
                    Name: result.Name,
                    PhoneNumber: result.PhoneNumber,
                    Date: result.Date,
                    Type: result.Type,
                    Address: result.Address,
                    GallonsOrdered: result.GallonsOrdered,
                    AmountDue: result.AmountDue,
                    Status: result.Status,
                    Remarks: result.Remarks,
                }

                res.render('update_delete_order', {
                    id: result._id,
                    name: delivery.Name,
                    phoneNum: delivery.PhoneNumber,
                    date: delivery.Date,
                    type: delivery.Type,
                    address: delivery.Address,
                    galordered: delivery.GallonsOrdered,
                    amtdue: delivery.AmountDue,
                    status: delivery.Status,
                    remarks: delivery.Remarks
                });
            }
        })
    },

    getUpdateCustomer: function (req,res) {
        var reqID = req.query.id;
        db.findOne(Customer, {_id: reqID}, {}, function(result){
            if(result){
                var customer = {
                    Name: result.Name,
                    PhoneNumber: result.PhoneNumber,
                    Address: result.Address,
                    Type: result.Type,
                    Remarks: result.Remarks
                }

                res.render('update_delete_customer', {
                    id: result._id,
                    name: customer.Name,
                    phoneNum: customer.PhoneNumber,
                    address: customer.Address,
                    type: customer.Type,
                    remarks: customer.Remarks
                });
            }
        })
    },

    //DeliveryDB operations
    getSearchDB: function(req, res) {
        // console.log(req.body.search);
        inp = req.body.search
        query = inp.toUpperCase();
        console.log(query);
        db.findOne(Customer, {PhoneNumber: req.body.search}, {}, function (result){
            if(result){
                res.render('add_order', {
                    name: result.Name,
                    phoneNum: result.PhoneNumber,
                    address: result.Address,
                    remarks: result.Remarks
                });
            }
            else {
                db.findOne(Customer, {Address: req.body.search}, {}, function (result){
                    if(result){
                        res.render('add_order', {
                            name: result.Name,
                            phoneNum: result.PhoneNumber,
                            address: result.Address,
                            remarks: result.Remarks
                        });
                    }
                    else{
                        alert("User not in Database!");
                        console.log("User not in customerDB");
                    }
                })
            }
        });
    },

    submitDelivDB: function (req,res) {
        db.findOne(Customer,{Name: req.body.name, 
                            PhoneNumber: req.body.phoneNum,
                            Address: req.body.address}, {}, function (result){
            if(result){
                var customer = result;
            
                var delivery = {
                    Name: req.body.name,
                    PhoneNumber: req.body.phoneNum,
                    Date: req.body.date,
                    Type: customer.Type,
                    Address: req.body.address,
                    GallonsOrdered: req.body.galordered,
                    AmountDue: req.body.amtdue,
                    Status: req.body.status,
                    Remarks: req.body.remarks
                }
        
                console.log(delivery);
        
                db.insertOne(Delivery, delivery, (result) => {
                    console.log("sent to db");
                    res.redirect('/delivery_table');
                });
            } else {
                alert("User not in Database!");
                console.log("User not in customerDB");
            }
            
        });
    },

    postDelivEdit: function (req,res) {
        db.findOne(Customer,{PhoneNumber: req.body.phoneNum}, {}, function (result){
            if(result){
                var customer = result;
                var todo = req.body.todo;
            
                var delivery = {
                    id: req.query.id,
                    Name: req.body.name,
                    PhoneNumber: req.body.phoneNum,
                    Date: req.body.date,
                    Type: customer.Type,
                    Address: req.body.address,
                    GallonsOrdered: req.body.galordered,
                    AmountDue: req.body.amtdue,
                    Status: req.body.status,
                    Remarks: req.body.remarks
                }

                console.log(todo);
                console.log(delivery);

                if (todo == "Update"){
                    if(delivery.Name == customer.Name 
                        && delivery.PhoneNumber == customer.PhoneNumber 
                        && delivery.Address == customer.Address){
                            db.updateOne(Delivery,{_id: delivery.id}, delivery, (result) =>{
                                res.redirect('/delivery_table');
                            });
                        }
                    else{
                        alert("Cannot edit: User not in Database!");
                        console.log("User not in customerDB");
                    }
                }else if(todo == "Delete"){
                    if(delivery.Name == customer.Name 
                        && delivery.PhoneNumber == customer.PhoneNumber 
                        && delivery.Address == customer.Address){
                            db.deleteOne(Delivery,{_id: delivery.id}, (result) => {
                                res.redirect('/delivery_table');
                            });
                        }
                    else{
                        alert("Cannot edit: User not in Database!");
                        console.log("User not in customerDB");
                    }
                }
            } else {
                alert("Cannot edit: User not in Database!");
                console.log("User not in customerDB");
            }
        });
    },

    //CustomerDB operations
    submitCustomDB: function (req,res) {
        var customer = {
            Name: req.body.name,
            PhoneNumber: req.body.phoneNum,
            Type: req.body.type,
            Address: req.body.address,
            Remarks: req.body.remarks
        }

        console.log(customer);

        db.insertOne(Customer, customer, (result) => {
            console.log("sent to db");
            res.redirect('/customer_table');
        });
    },

    postCustomEdit: function (req,res) {
        var todo = req.body.todo;

        var customer = {
            id: req.query.id,
            Name: req.body.name,
            PhoneNumber: req.body.phoneNum,
            Type: req.body.type,
            Address: req.body.address,
            Remarks: req.body.remarks
        }

        console.log(todo);
        console.log(customer);

        if (todo == "Update"){
            db.updateOne(Customer,{_id: customer.id}, customer, (result) =>{
                res.redirect('/customer_table');
            });
        }else if(todo == "Delete"){
            db.deleteOne(Customer,{_id: customer.id}, (result) => {
                res.redirect('/customer_table');
            });
        }
        
    }
}

module.exports = controller;