const express = require('express');
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');
const minionRouter = express.Router();

minionRouter.param('minionId', (req, res, next, minionId) => {
    const minion = getFromDatabaseById('minions', minionId);
    if(minion){
        req.minion = minion;
        req.minionId = minionId;
        next();
    } else {
        return res.status(404).send();
    }
})

minionRouter.get('/', (req, res, next) => {
    const minions = getAllFromDatabase('minions')
    res.send(minions);
})


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
});

minionRouter.put('/:minionId', (req, res, next) => {
    const minionToUpdate = Object.assign(req.minion, req.query);
    console.log(minionToUpdate);
    try {
        updateInstanceInDatabase('minions', minionToUpdate);
        const updatedMinion = getFromDatabaseById('minions', req.minionId);
        res.status(200).send(updatedMinion);
    }
    catch(e){
        e.message = 'Couldnt update minion with provided content. Try again';
        next(e);
    }
})

minionRouter.get('/:minionId', (req, res, next) => {
    const minion = req.minion;
    res.send(minion);
});

minionRouter.delete('/:minionId', (req, res, next) => {
    if(deleteFromDatabasebyId('minions', req.minionId)){
        res.status(200).send();
    } else {
        res.status(404).send();
    }
})


minionRouter.use((err, req, res, next) => {
    res.status(500).send(err.message);
})

module.exports = minionRouter;
