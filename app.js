const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Temporary hack ->
app.use((req, res, next) => {
  req.user = {
    _id: '64f338ba61cfe28fa71b2ced',
  };
  next();
});
// <- Remove it

app.use('/', routes);

app.listen(PORT);
