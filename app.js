const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const routes = require('./routes/routes');
const errorHandler = require('./errors/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use('/', routes);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
