const express = require('express');
const { getAllFromDatabase, getFromDatabaseById } = require('./db');
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

module.exports = ideaRouter;