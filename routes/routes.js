const express = require(`express`);
const controller = require(`../controller/controller.js`);

const app = express();

app.get('/favicon.ico', controller.getFavicon);

app.get('/', controller.getIndex);

app.get('/content', controller.getContent)

module.exports = app;