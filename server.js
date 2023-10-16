const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const Budget = require('./budget'); // Import the Mongoose model

app.use(bodyParser.json());

// Endpoint to get budget data from the database
app.get('/budget', (req, res) => {
  Budget.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(data);
    }
  });
});

// Endpoint to add new budget data to the database
app.post('/budget', (req, res) => {
    const { title, value, color } = req.body;
    const budgetEntry = new Budget({ title, value, color });
  
    budgetEntry.save((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).json(data);
      }
    });
});

app.use('/', express.static('public'));

// const budget = require('./budget.json');
// app.get('/budget', (req, res) => {
//     res.json(budget);
// });

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});