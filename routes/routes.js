const express = require(`express`);
const controller = require(`../controller/controller.js`);

const app = express();

app.get('/favicon.ico', controller.getFavicon);

//page navigation
app.get('/', controller.getIndex);
app.get('/main_menu', controller.getMain);
app.get('/add_order_page', controller.getAddOrder);
app.get('/add_customer_page', controller.getAddCustomer);
app.get('/delivery_table', controller.getDeliveryTable);
app.get('/customer_table', controller.getCustomerTable);
app.get('/update_order_page', controller.getUpdateOrder);
app.get('/update_customer_page', controller.getUpdateCustomer);

// Delivery
app.post('/add_order', controller.submitDelivDB);
app.get('/delete', controller.getDelivDelete);
app.get('/update_order', controller.getDelivEdit);
app.post('/edit', controller.postDelivEdit);

//Customer
app.post('/add_customer', controller.submitCustomDB);
app.get('/delete', controller.getCustomDelete);
app.get('/update_customer', controller.getCustomEdit);
app.post('/edit', controller.postCustomEdit);

module.exports = app;