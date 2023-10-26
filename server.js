const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const budgetRoutes = require('./budgetRoutes');

app.use(bodyParser.json()); // Parse JSON request body

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

app.use('/', express.static('public'));
app.use('/budget', budgetRoutes);

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});