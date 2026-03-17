const express = require('express')
const datamanage = require('../controllers/data.controller.js')
const router = express();
router.post('/',datamanage.retrivedata)
router.get('/get',datamanage.sendData)
router.delete('/:id',datamanage.DeleteTask)
module.exports = {router};