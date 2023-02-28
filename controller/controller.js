const db = require("../database/db.js");
const Delivery = require('../database/models/deliveryDB');
const customer = require('../database/models/customerDB');

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
        res.render('delivery_table');
    },

    getCustomerTable: function (req,res) {
        res.render('customer_table');
    },

    getUpdateOrder: function (req,res) {
        res.render('update_delete_order');
    },

    getUpdateCustomer: function (req,res) {
        res.render('update_delete_customer');
    },

    //DeliveryDB operations
    submitDelivDB: function (req,res) {
        var delivery = {
            Name: req.body.name,
            PhoneNumber: req.body.phonenumber,
            Date: req.body.date,
            Type: req.body.type,
            Address: req.body.address,
            GallonsOrdered: req.body.galordered,
            AmountDue: req.body.amtdue,
            Status: req.body.status,
            Remarks: req.body.remarks
        }

        console.log(delivery);

        db.insertOne(Delivery, delivery, (result) => {
            console.log("sent to db");
            res.render('index');
        });
    },

    getDelivDelete: function (req, res) {
        //fix with part that will get data
        

        //change PhoneNumber to queried phone#
        db.deleteOne(Delivery,{PhoneNumber: "09985861098"}, function(result) {
            res.send();
        })
    },

    getDelivEdit: function (req,res) {
        db.findOne(Delivery,{PhoneNumber: "09985861098"}, {}, function(result) {
            //console.log(result);
            if (result){
                var entry = {
                    Name: result.Name,
                    PhoneNumber: result.PhoneNumber,
                    Date: result.Date,
                    Type: result.Type,
                    Address: result.Address,
                    GallonsOrdered: result.GallonsOrdered,
                    AmountDue: result.AmountDue,
                    Status: result.Status,
                    Remarks: result.Remarks
                }
                console.log(entry);
                res.render('edit');
            } else {
                console.log("not there rip")
            }
        })
    },

    postDelivEdit: function (req,res) {
        var delivery = {
            Name: req.body.name,
            PhoneNumber: req.body.phonenumber,
            Date: req.body.date,
            Type: req.body.type,
            Address: req.body.address,
            GallonsOrdered: req.body.galordered,
            AmountDue: req.body.amtdue,
            Status: req.body.status,
            Remarks: req.body.remarks
        }

        console.log(delivery);
        db.updateOne(Delivery,{PhoneNumber: "09985861098"}, delivery, (result) =>{
            res.render('index');
        })
    },

    //CustomerDB operations
    submitCustomDB: function (req,res) {
        var delivery = {
            Name: req.body.name,
            PhoneNumber: req.body.phonenumber,
            Date: req.body.date,
            Type: req.body.type,
            Address: req.body.address,
            GallonsOrdered: req.body.galordered,
            AmountDue: req.body.amtdue,
            Status: req.body.status,
            Remarks: req.body.remarks
        }

        console.log(delivery);

        db.insertOne(Delivery, delivery, (result) => {
            console.log("sent to db");
            res.render('index');
        });
    },

    getCustomDelete: function (req, res) {
        //fix with part that will get data
        

        //change PhoneNumber to queried phone#
        db.deleteOne(Delivery,{PhoneNumber: "09985861098"}, function(result) {
            res.send();
        })
    },

    getCustomEdit: function (req,res) {
        db.findOne(Delivery,{PhoneNumber: "09985861098"}, {}, function(result) {
            //console.log(result);
            if (result){
                var entry = {
                    Name: result.Name,
                    PhoneNumber: result.PhoneNumber,
                    Date: result.Date,
                    Type: result.Type,
                    Address: result.Address,
                    GallonsOrdered: result.GallonsOrdered,
                    AmountDue: result.AmountDue,
                    Status: result.Status,
                    Remarks: result.Remarks
                }
                console.log(entry);
                res.render('edit');
            } else {
                console.log("not there rip")
            }
        })
    },

    postCustomEdit: function (req,res) {
        var delivery = {
            Name: req.body.name,
            PhoneNumber: req.body.phonenumber,
            Date: req.body.date,
            Type: req.body.type,
            Address: req.body.address,
            GallonsOrdered: req.body.galordered,
            AmountDue: req.body.amtdue,
            Status: req.body.status,
            Remarks: req.body.remarks
        }

        console.log(delivery);
        db.updateOne(Delivery,{PhoneNumber: "09985861098"}, delivery, (result) =>{
            res.render('index');
        })
    }
}

module.exports = controller;