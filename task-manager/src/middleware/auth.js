const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    //console.log('auth middleware')
    try {
        // get auth token from request header, removing "Bearer " prefix
        const token = req.header('Authorization').replace('Bearer ', '')
        // decode token with psk
        const decoded = jwt.verify(token, 'thisismynewcourse')
        // lookup user by decoded id and validate token against valid tokens associated with the user account
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token})
        //console.log(token)
        // if everything worked, it should have returned a user, if not error
        if (!user) {
            throw new Error()
        }
        // assign the token to the request so other handlers can use it
        req.token = token
        // attach user to request to get sent back as the response
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
    //next()
}

module.exports = auth