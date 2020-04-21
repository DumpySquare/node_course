const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()


// Create task
router.post('/tasks', auth, async (req, res) => {
    //const task = new Task(req.body)

    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Get tasks?completed=true
// GET tasks?limit=10&skip=0
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}

<<<<<<< HEAD
    //console.log('/tasks - ', req.user.name)
=======
    console.log('/tasks - ', req.user.name)
>>>>>>> 46c46a53bbb50c032f49c79eef7a8aeb71ace689
    // if the query parameter complete is there
    if (req.query.completed) {
        // make boolean true if value is "true"
        match.completed = req.query.completed === 'true'
<<<<<<< HEAD
        //console.log('/tasks query parameter = ', req.query.completed)
    } else {
        //console.log('/tasks - no query parameter supplied')
=======
        console.log('/tasks query parameter = ', req.query.completed)
    } else {
        console.log('/tasks - no query parameter supplied')
>>>>>>> 46c46a53bbb50c032f49c79eef7a8aeb71ace689
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
<<<<<<< HEAD
        //console.log('/tasks - sort: ', sort)
=======
        console.log('/tasks - sort: ', sort)
>>>>>>> 46c46a53bbb50c032f49c79eef7a8aeb71ace689
    }

    try {
        // // option 1 - return tasks with user ID matching current user
        //const tasks = await Task.find({ owner: req.user._id })
        //res.send(tasks)

        // // option 2 - populate all tasks by looking up user by ID and finding associated tasks
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})

// GET /tasks?completed=true

// get task by id
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        //const task = await Task.findById(_id)
        // get task by ID but also owned by current user
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

// update task by id
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invlide update!' })
    }
    try {
        // find task by id with matching user id 
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        
        if (!task) {
            return res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// delete task by id
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router