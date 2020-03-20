// CRUD create read update delete

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to db: ', error)
    } 

    const db = client.db(databaseName)

    db.collection('tasks').deleteMany({
        description: 'task1'
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
    
    // db.collection('users').deleteMany({
    //     age: 30
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('users').updateOne({
    //     _id: new ObjectID("5e73733d240bb6ddc7f0b016")
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result.matchedCount)
    // }).catch((error) => {
    //     console.log(error)
    // })



})