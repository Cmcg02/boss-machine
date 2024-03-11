const express = require('express');
const { getAllFromDatabase, addToDatabase, deleteAllFromDatabase, createMeeting } = require('./db');
const meetingsRouter = express.Router();


// GET /api/meetings to get an array of all meetings.
meetingsRouter.get('/', (req, res, next)=>{
    res.send(getAllFromDatabase("meetings"))
})

// POST /api/meetings to create a new meeting and save it to the database.
meetingsRouter.post('/', (req, res, next)=> {
    const newMeeting = createMeeting()
    addToDatabase('meetings', newMeeting)
    res.status(201).send(newMeeting)
})


// DELETE /api/meetings to delete all meetings from the database.
meetingsRouter.delete('/', (req, res, next)=> {
    const id = req.params.ideaId
    deleteAllFromDatabase('meetings')
    res.sendStatus(204)
})

module.exports = meetingsRouter;
