const express = require('express');
const { getAllFromDatabase, addToDatabase, deleteAllFromDatabase, createMeeting } = require('./db');
const meetingRouter = express.Router();

meetingRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});

meetingRouter.post('/', (req, res, next) => {
    const newMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeeting);
})

meetingRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send();
})

module.exports = meetingRouter;