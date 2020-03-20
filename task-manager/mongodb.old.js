// CRUD create read update delete

//const mongodb = require('mongodb')
//const MongoClient = mongodb.MongoClient
//const ObjectID = mongodb.ObjectID
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

//const id = new ObjectID()
//console.log(id)
//console.log(id.getTimestamp())


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to db: ', error)
    } 

    console.log('Connected to db!')
    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     name: 'Ben',
    //     age: 35
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user: ', error)
    //     }

         console.log('Result: ', result.ops)
     })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28
    //     },
    //     {
    //         name: 'Marly',
    //         age: 80
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert docs!')
    //     }

    //     console.log(result)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Clean House',
    //         completed: true
    //     },
    //     {
    //         description: 'task1',
    //         completed: false
    //     },
    //     {
    //         description: 'task2',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert tasks!')
    //     }

    //     console.log(result.ops)
    // })
})