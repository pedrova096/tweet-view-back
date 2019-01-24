require('./config/config.js');

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//Configuracion de las rutas globales
app.use(require('./routes/twitter.js'));

mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) throw err;
    console.log('Conectado a DB mongo');
});
app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});