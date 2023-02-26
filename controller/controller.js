const db = require("../database/db.js");
const delivery = require('../database/model/deliveryDB');
const customer = require('../database/model/customerDB');

const controller = {
    getFavicon: function (req, res) {
        res.status(204);
    },

    getIndex: function (req,res){
        res.render('index');
    },

    getContent: async (req, res) => {
        const cont = await delivery.find({})
        res.render('entry', [cont])
    }
}

module.exports = controller;