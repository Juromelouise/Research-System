const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors')

const user = require ('./routes/user')
const products = require('./routes/product')

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use('/api/v1', user);
app.use('/api/v1', products);

module.exports = app