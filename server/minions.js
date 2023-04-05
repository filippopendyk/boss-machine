const express = require('express');
const { getAllFromDatabase, getFromDatabaseById } = require('./db');
const minionRouter = express.Router();

minionRouter.param('minionId', (req, res, next, minionId) => {
    const minion = getFromDatabaseById('minions', minionId);
    if(minion){
        req.minion = minion;
        next();
    } else {
        return res.status(404).send();
    }
})

minionRouter.get('/', (req, res, next) => {
    const minions = getAllFromDatabase('minions')
    res.send(minions);
})

minionRouter.get('/:minionId', (req, res, next) => {
    const minion = req.minion;
    res.send(minion);
})

module.exports = minionRouter;
