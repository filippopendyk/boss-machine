const express = require('express');
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');
const minionRouter = express.Router();
const transformSalary = require('../helpers/transformSalary');

minionRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if(minion){
        req.minion = minion;
        next();
    } else {
        return res.status(404).send();
    }
})

minionRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
})


minionRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

minionRouter.put('/:minionId', (req, res, next) => {
    let updatedMinionInstance = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinionInstance);
})

minionRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

minionRouter.delete('/:minionId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('minions', req.params.minionId);
    if(deleted) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
})


module.exports = minionRouter;
