const db = require("../database/db.js");
const Delivery = require('../database/models/deliveryDB');
const Customer = require('../database/models/customerDB');

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
        var phoneNum = req.query.phoneNum;
        db.findOne(Delivery, {PhoneNumber: phoneNum}, {}, function(result){
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
        var phoneNum = req.query.phoneNum;
        db.findOne(Customer, {PhoneNumber: phoneNum}, {}, function(result){
            if(result){
                var customer = {
                    Name: result.Name,
                    PhoneNumber: result.PhoneNumber,
                    Address: result.Address,
                    Type: result.Type,
                    Remarks: result.Remarks
                }

                res.render('update_delete_customer', {
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
    submitDelivDB: function (req,res) {
        db.findOne(Customer,{PhoneNumber: req.body.phoneNum}, {}, function (result){
            // var x = JSON.stringify(result);
            // customer = JSON.parse(x);
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
                    Delivery.find().lean().exec((err, docs2) => {
                        if( docs2 ){
            
                            var order = []
                            for(var x in docs2){
                                order.push({
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
                     });
                });
            } else {
                console.log("User not in customerDB");
                //replace with a way to notify the user
            }
            
        });
    },

    postDelivEdit: function (req,res) {
        db.findOne(Customer,{PhoneNumber: req.body.phoneNum}, {}, function (result){
            console.log(req.body.phoneNum);
            if(result){
                var customer = result;
                var todo = req.body.todo;
            
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

                console.log(todo);
                console.log(delivery);

                if (todo == "Update"){
                    db.updateOne(Delivery,{PhoneNumber: delivery.PhoneNumber}, delivery, (result) =>{
                        Delivery.find().lean().exec((err, docs2) => {
                            if( docs2 ){
                
                                var order = []
                                for(var x in docs2){
                                    order.push({
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
                        });
                    });
                }else if(todo == "Delete"){
                    db.deleteOne(Delivery, {PhoneNumber: delivery.PhoneNumber}, (result) => {
                        Delivery.find().lean().exec((err, docs2) => {
                            if( docs2 ){
                
                                var order = []
                                for(var x in docs2){
                                    order.push({
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
                        });
                    });
                }
            } else {
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
            Customer.find().lean().exec((err, docs2) => {
                if( docs2 ){
    
                    var people = []
                    for(var x in docs2){
                        people.push({
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
             });
        });
    },

    postCustomEdit: function (req,res) {
        var todo = req.body.todo;

        var customer = {
            Name: req.body.name,
            PhoneNumber: req.body.phoneNum,
            Type: req.body.type,
            Address: req.body.address,
            Remarks: req.body.remarks
        }

        console.log(todo);
        console.log(customer);

        if (todo == "Update"){
            db.updateOne(Customer,{PhoneNumber: customer.PhoneNumber}, customer, (result) =>{
                Customer.find().lean().exec((err, docs2) => {
                    if( docs2 ){
        
                        var people = []
                        for(var x in docs2){
                            people.push({
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
                 });
            });
        }else if(todo == "Delete"){
            db.deleteOne(Customer, {PhoneNumber: customer.PhoneNumber}, (result) => {
                Customer.find().lean().exec((err, docs2) => {
                    if( docs2 ){
                        var people = []
                        for(var x in docs2){
                            people.push({
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
                 });
            });
        }
        
    }
}

module.exports = controller;