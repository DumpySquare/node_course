<<<<<<< HEAD
const app = require('./app')
const port = process.env.PORT

=======
const express = require('express')
require('./db/mongoose.js')
//const User = require('./models/user.js')
//const Task = require('./models/task.js')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

>>>>>>> 46c46a53bbb50c032f49c79eef7a8aeb71ace689
app.listen(port, () => {
    console.log('Server is up on port', port)
})

// // test upload section
// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error('Please upload a word doc'))
//         }
//         cb(undefined, true)
//     }
// })

// app.post('/upload', upload.single('upload'), (req, res) => {
//     //console.log(req)
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })
                        
                        
                        
                        
// // example middleware setup
// app.use((req, res, next) => {
//     console.log(req.method, req.path)
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// // middleware setup for maintenance page
// app.use((req, res, next) => {
//     res.status(503).send('Site Under Maintenance...')
// })


// // // exmples about how to setup mongoose relationships between users and tasks by IDs
// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
//     // example 1// finds task by id, then grabs associated user information based on "owner"
//     // const task = await Task.findById('5e7b79b582790d498ac4a4c7')
//     // console.log(task)
//     // // users the "ownder" id to find the associated user account and populates all it's information
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     // exmple 2 // find tasks by user
//     const user = await User.findById('5e7b7671ddf2a0495593c298')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }
// main()

// // jwt token setup example
// const jwt = require('jsonwebtoken')

// const myFuntion = async () => {
//     //create token with user id and a random set of characters as a "secrete"
//     const token = jwt.sign({ _id: 'abc123'}, 'thisismynewcourse', { expiresIn: '0 seconds'})
//     console.log(token)
//     // verify jwt token with secrete key
//     const data = jwt.verify(token, 'thisismynewcourse')
//     console.log(data)
// }
// myFuntion()



// // password hashing example
// const bcrypt = require('bcryptjs')
// const myFuntion = async () => {
//     const password = 'cami223!'
//     const hashedPassword = await bcrypt.hash(password, 8)
//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare('cami223!', hashedPassword)
//     console.log(isMatch)
// }

// myFuntion()