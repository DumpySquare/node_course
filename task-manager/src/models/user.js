const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error ('Password cannot contain "password"')
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error ('Email invalid')
            }
        }
    },
    age: {
        type: Number,
        defaul: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postitive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
},
{
    timestamps: true
})

// associates owner field of a Task with the local user field _id
//    so we can find all tasks by a user
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

// setup public user data
userSchema.methods.toJSON = function () {
    // capture user data passed in from the function call
    const user = this
    // convert it to an object
    const userObject = user.toObject()
    // delete the object items we don't want to expose
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    // return the object
    return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        //console.log('User not found by email')
        throw new Error('Unable to login-')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        //console.log('User input password hash does not match hash in DB')
        throw new Error('Unable to login')
    }
    return user
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    //console.log('Auth token generatored')
    return token
}

// hash plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    //console.log('Hashing password before save')
    next()
})

userSchema.pre('remove', async function (next) {
    const user = this
    task = await Task.deleteMany({ owner: user._id })
    //console.log(`Deleting all ${user.name} task: ${task}`)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User