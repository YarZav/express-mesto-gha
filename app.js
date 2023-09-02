const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes/users');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);

// Temporary hack ->
app.use((req, res, next) => {
  req.user = {
    _id: '64f338ba61cfe28fa71b2ced',
  };

  next();
});
//

app.listen(PORT);
