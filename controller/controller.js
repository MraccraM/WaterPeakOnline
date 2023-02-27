const db = require("../database/db.js");
const Delivery = require('../database/models/deliveryDB');
const customer = require('../database/models/customerDB');

const controller = {
    getFavicon: function (req, res) {
        res.status(204);
    },

    getIndex: function (req,res){
        res.render('index');
    },

    getContent: async (req, res) => {
        db.findMany(Delivery, {}, {__id: 0, Name: 1, PhoneNumber: 1, Date: 1, Type: 1, Address: 1, GallonsOrdered: 1, AmountDue: 1, Status: 1, Remarks: 1}, (result) => {
            console.log(result);
            res.render('entry', {content: result});
        })
    },

    submitDB: function (req,res) {
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
    }
}

module.exports = controller;