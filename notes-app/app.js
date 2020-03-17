const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

// Customize yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note boby',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        //console.log('Title: ' + argv.title)
        //console.log('Body: ' + argv.body)
        notes.addNote(argv.title, argv.body)
    }
})

// remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        //console.log('Removing a note')
        notes.removeNote(argv.title)
    }
})

// list command
yargs.command({
    command: 'list',
    describe: 'list notes',
    handler(argv) {
        //console.log('Listing notes')
        notes.listNotes()
    }
})

// read command
yargs.command({
    command: 'read',
    describe: 'read note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

// add, remove, read, list

yargs.parse()
//console.log(yargs.argv)






//const command = process.argv[2]
//if (command === 'add') {
//    console.log('Adding Note!')
//} else if (command === 'remove') {
//    console.log('Removing Note!')
//}