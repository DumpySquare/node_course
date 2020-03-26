const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

// create user
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

// user login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        //console.log('in post login router', req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

// user logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        // filter out the token the user provided with the list of tokens associated with user account
        // this is done by filtering through all the user tokens on the account and
        //    re-assigning all the tokens that don't match what the user provided in the call
        // the auth call in the router statement captured the userEmail/auth token and compared it to 
        //    existing auth tokens to pass/fail auth, which is where we get req.user.tokens
        // req.user contains the user and tokens in the db
        // req.token contains the token the user provided in the post
        //console.log('current user tokens from regular logout: ', req.user.tokens)
        req.user.tokens = req.user.tokens.filter((token) => {
            // return true for all the tokens on the user account that were not used for this request
            return token.token !== req.token
        })
        // now req.user.tokens should contain all the other tokens and the user changes can be saved back to the db
        await req.user.save()
        // respond with 200
        res.send('Logged Out')
    } catch (e) {
        res.status(500).send()
    }
})

// logout user from ALL sessions
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        // try to clear all user tokens, then save user and respond
        //console.log('current user tokens from logout all: ', req.user.tokens)
        req.user.tokens = [];
        //console.log('cleared user tokens from logout all: ', req.user.tokens)
        await req.user.save()
        res.send('All Sessions logged out')
    } catch (e) {
        res.status(500).send()
    }
})

//get users
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// // get user by id - only used during initian dev since users should not be able to see other users
// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id
//     try {
//         const user = await User.findById(_id)
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Update!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        // something hrouterened with the query, respond with error
        res.status(400).send(e)
    }
})

// delete user
router.delete('/users/me', auth,  async (req, res) => {
    try { 
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router