const express = require('express');
const { getAllFromDatabase, addToDatabase } = require('./db');
const meetingRouter = express.Router();

meetingRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});

meetingRouter.post('/', (req, res, next) => {
    const newMeeting = addToDatabase('meetings', req.body);
    res.status(201).send(newMeeting);
})

module.exports = meetingRouter;