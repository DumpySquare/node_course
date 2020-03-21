require('../src/db/mongoose')
const User = require('../src/models/user')
const Task = require('../src/models/task')
//5e74a2cd3f4d9662790a65ef

User.findByIdAndUpdate('5e73f88870c0b71642333c1c', { age: 1 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 1 })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})

