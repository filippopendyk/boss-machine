const express = require('express');
const { getAllFromDatabase } = require('./db');
const ideaRouter = express.Router();

ideaRouter.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    res.send(ideas);
})

module.exports = ideaRouter;