const fs = require('fs')

const fileData = fs.readFileSync('1-json.json')
const data = JSON.parse(fileData.toString())

console.log(data)

data.name = 'Cami'
data.age = 30

console.log(data)

fs.writeFileSync('1-json.json', JSON.stringify(data))


//const dataBuffer = fs.readFileSync('1-json.json')
//const dataJSON = dataBuffer.toString()
//const data = JSON.parse(dataJSON)
//console.log(data.title)

// json book object
//const book = {
//    title: 'Ego is the enemy',
//    author: 'Ryan Holiday'
//}

//const bookJSON = JSON.stringify(book)
//const parsedData = JSON.parse(bookJSON)
//console.log(bookJSON)
//console.log(book.title)
//console.log(parsedData.author)
//fs.writeFileSync('1-json.json', bookJSON)