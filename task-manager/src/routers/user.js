const express = require('express')
const User = require('../models/user')
const router = new express.Router()

// create user
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        //console.log('in post login router', req.body.email, req.body.password)
        res.send(user)
    } catch (e) {
        res.status(400).send()
    }
})

//get users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

// get user by id
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/users/:id', async (req, res) => {
    // get request body to keyed list
    const updates = Object.keys(req.body)
    // set allowed updates fields
    const allowedUpdates = ['name', 'email', 'password', 'age']
    // compare update body to allowed fields above
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    // if field validation from above failed, respond with error
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Update!' })
    }

    // valide update field, attemp to update user
    try {

        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        // try to find user by id and update, running data validators
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        // if the update returned no users
        if(!user) {
            return res.status(404).send()
        }
        // found a user and updated, so return updated user data
        res.send(user)
    } catch (e) {
        // something hrouterened with the query, respond with error
        res.status(400).send(e, 'error from user patch')
    }
})

// delete user
router.delete('/users/:id', async (req, res) => {
    try { 
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router