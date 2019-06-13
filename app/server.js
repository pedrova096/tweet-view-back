require('../config.js');

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { connect } = require('./database');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(require('./routes'));

connect(process.env.URLDB);

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});