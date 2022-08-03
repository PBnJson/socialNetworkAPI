const { urlencoded } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const connection = require('./config/connection');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(routes);

connection.once('open', function () {
    app.listen(PORT, () => {
        console.log('App Is Listening');
    });
})
