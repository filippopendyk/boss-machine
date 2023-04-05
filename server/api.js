const express = require('express');
const apiRouter = express.Router();
const minionRouter = require('./minions');



module.exports = apiRouter;

apiRouter.use('/minions', minionRouter);