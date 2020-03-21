

//  5e74ab535e343963f1560248

require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('5e74ab535e343963f1560248').then((task) => {
    console.log(task)
    return Task.countDocuments({ completed: false })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})