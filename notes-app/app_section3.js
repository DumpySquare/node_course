
//const validator = require('validator')
//import validator from 'validator';        - ES6 version of above require
const getNotes = require('./notes.js')
const chalk = require('chalk')



const msg = getNotes()
console.log(msg)

const mssg = 'sometext'
const blueMsg = chalk.blue('fffffffoooooo')

//console.log(chalk.bold.green('yyyyeeeeeeee!'))
console.log(blueMsg)
console.log(chalk.bgMagentaBright.red(mssg))

//console.log(validator.isEmail('ben@email.com'))
//console.log(validator.isURL('https://mead.io'))
//const addStuff = require('./utils.js')
//const addNote = require('./notes.js')
//const sum = addStuff(4, -2)
//const babynote = addNote()
//console.log(sum)
//console.log(babynote)
