const express = require(`express`);
const controller = require(`../controller/controller.js`);

const app = express();

app.get('/favicon.ico', controller.getFavicon);

app.get('/', controller.getIndex);

app.get('/content', controller.getContent)

app.post('/submit-post', controller.submitDB);

module.exports = app;