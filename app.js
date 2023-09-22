const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/UserData')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });



app.get('/', (req, res) => {
  res.send("Welcome!")
});
app.listen(3000, () => {
  console.log('server is running')
});

app.options('*', cors());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(routes);
