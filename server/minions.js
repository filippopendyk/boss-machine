const express = require('express');
const { getAllFromDatabase, getFromDatabaseById, addToDatabase } = require('./db');
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
});

minionRouter.post('/', (req, res, next) => {
    const newMinion = req.query;
    try {
        addToDatabase('minions', newMinion);
        res.status(201).send(newMinion);
    } 
    catch(e){
        e.message = 'Please provide correct minion instance.'
        next(e);
    }
})

minionRouter.use((err, req, res, next) => {
    res.status(500).send(err.message);
})

module.exports = minionRouter;
