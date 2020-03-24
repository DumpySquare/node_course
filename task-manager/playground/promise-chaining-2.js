

//  5e74ab535e343963f1560248

require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5e74ab535e343963f1560248').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('5e73f92bcc827a1677eb5f64').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})