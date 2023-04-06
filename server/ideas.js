const express = require('express');
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');
const ideaRouter = express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideaRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if(idea){
        req.idea = idea;
        next();
    } else {
        return res.status(404).send();
    }
})

ideaRouter.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    res.send(ideas);
})

ideaRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
})

ideaRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
})

ideaRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    let updatedIdeaInstance = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdeaInstance);
})

ideaRouter.delete('/:ideaId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if(deleted) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
})

module.exports = ideaRouter;