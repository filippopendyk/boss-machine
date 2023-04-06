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

minionRouter.get('/:minionId/work', (req, res, next) => {
    const work = getAllFromDatabase('work').filter(singleWork => {
        return singleWork.minionId === req.params.minionId;
    });
    res.send(work);
})

minionRouter.post('/:minionId/work', (req, res, next) => {
    req.body.minionId = req.params.minionId;
    const newWork = addToDatabase('work', req.body);
    res.status(201).send(newWork);
})

minionRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if(req.params.minionId !== req.body.minionId){
        res.status(400).send();
    } else {
        updatedWork = updateInstanceInDatabase('work', req.body);
        res.send(updatedWork);
    }
})

minionRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('work', req.params.workId);
    if(deleted){
        res.status(204).send();
    } else {
        res.status(500).send();
    }
})

module.exports = minionRouter;
