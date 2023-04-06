const express = require('express');
const apiRouter = express.Router();
const minionRouter = require('./minions');
const ideaRouter = require('./ideas');


module.exports = apiRouter;

apiRouter.use('/minions', minionRouter);

apiRouter.use('/ideas', ideaRouter);