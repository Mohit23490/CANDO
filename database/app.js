const express = require('express');
const dataRoute = require('./route/data.route.js')
const cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json());
app.use('/api/data',dataRoute.router)


module.exports = app