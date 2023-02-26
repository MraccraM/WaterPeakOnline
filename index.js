const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const db = require("./database/db.js");
const routes = require("./routes/routes.js")

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/view/partials');

//require('dotenv').config();
PORT = process.env.PORT || 3000;
hostname = "127.0.0.1";

db.connect();

//success and error message configuration
// app.use(flash());

// app.use((req, res, next) => {
//     res.locals.success_msg = req.flash('success_msg');
//     res.locals.error_msg = req.flash('error_msg');
//     next();
//   });

//app.use(express.static('public'));
app.use('/', routes);

app.listen(PORT, function() {
    console.log("Server is running at:");
//    console.log("http://" + hostname + ":" + port);
})
