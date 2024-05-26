// Dependencies
const express = require('express')
const mongoose = require('mongoose')
const {info, error} = require('./utils/logger')
const {NODE_ENV, MONGO_DB_URI, MONGO_DB_URI_TEST} = require('./utils/config')

// Connect to DB
const connectionString = NODE_ENV === 'production'
    ? MONGO_DB_URI
    : MONGO_DB_URI_TEST
mongoose
    .connect(connectionString)
    .then(() => info('Database connected'))
    .catch(e => error(e))

const app = express()
module.exports = app