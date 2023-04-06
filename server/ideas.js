const express = require('express');
const { getAllFromDatabase, getFromDatabaseById, addToDatabase } = require('./db');
const ideaRouter = express.Router();

ideaRouter.param(':ideaId', (req, res, next, id) => {
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

ideaRouter.post('/', (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
})

ideaRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
})

module.exports = ideaRouter;