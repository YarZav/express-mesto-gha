const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', routes);

app.listen(PORT);
