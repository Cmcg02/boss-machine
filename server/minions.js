const express = require('express');
const minionsRouter = express.Router();
const {getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId} = require('./db')

minionsRouter.use('/:minionId', (req, res, next)=>{
    const id = req.params.minionId
    if(isNaN(id) || !getFromDatabaseById('minions', id)){
        res.sendStatus(404)
    }else{
        next()
    }
})

// GET /api/minions to get an array of all minions.
minionsRouter.get('/',(req, res, next)=>{
    res.send(getAllFromDatabase("minions"))
} )

// POST /api/minions to create a new minion and save it to the database.
minionsRouter.post('/', (req, res, next)=>{
    const newMinion = req.body;
    const addedMinion = addToDatabase('minions', newMinion)

    if(!addedMinion){
        res.sendStatus(500)
    }else{
        res.status(201).send(addedMinion)
    }
})

// GET /api/minions/:minionId to get a single minion by id.
minionsRouter.get('/:minionId', (req, res, next)=>{
    const id = req.params.minionId
    const minion = getFromDatabaseById("minions", id)
    res.send(minion)
})

// PUT /api/minions/:minionId to update a single minion by id.
minionsRouter.put('/:minionId', (req, res, next)=>{
    const id = req.params.minionId
    const {name, title, weaknesses, salary} = req.body
    const newMinion = {id, name, title, weaknesses, salary}
    updateInstanceInDatabase('minions', newMinion)
    res.send(newMinion)
})

// DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.delete('/:minionId', (req, res, next)=> {
    const id = req.params.minionId
    deleteFromDatabasebyId('minions', id)
    res.sendStatus(204)
})


module.exports = minionsRouter;