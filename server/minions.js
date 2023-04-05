const express = require('express');
const { getAllFromDatabase } = require('./db');
const minionRouter = express.Router();

minionRouter.get('/', (req, res, next) => {
    const minions = getAllFromDatabase('minions')
    res.send(minions);
})

module.exports = minionRouter;
