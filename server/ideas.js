const express = require('express');
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const ideasRouter = express.Router();

ideasRouter.use('/:ideaId', (req, res, next) => {
    const id = req.params.ideaId
    if(isNaN(id) || !getFromDatabaseById('ideas', id)){
        res.sendStatus(404)
    }else{
        next()
    }
})

// GET /api/ideas to get an array of all ideas.
ideasRouter.get('/', (req, res, next)=>{
    res.send(getAllFromDatabase("ideas"))
})

// POST /api/ideas to create a new idea and save it to the database.
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next)=> {
    const newIdea = req.body;
    const addedIdea = addToDatabase('ideas', newIdea)

    if(!addedIdea){
        res.sendStatus(500)
    }else{
        res.status(201).send(addedIdea)
    }
})

// GET /api/ideas/:ideaId to get a single idea by id.
ideasRouter.get('/:ideaId', (req, res, next)=>{
    const id = req.params.ideaId
    const idea = getFromDatabaseById("ideas", id)
    res.send(idea)
})

// PUT /api/ideas/:ideaId to update a single idea by id.
ideasRouter.put('/:ideaId', (req, res, next)=>{
    const id = req.params.ideaId
    const {name, description, numWeeks, weeklyRevenue } = req.body
    const newidea = {id, name, description, numWeeks, weeklyRevenue }
    updateInstanceInDatabase('ideas', newidea)
    res.send(newidea)
})

// DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasRouter.delete('/:ideaId', (req, res, next)=> {
    const id = req.params.ideaId
    deleteFromDatabasebyId('ideas', id)
    res.sendStatus(204)
})

module.exports = ideasRouter;
