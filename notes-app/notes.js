const fs = require('fs')
const chalk = require('chalk')

const listNotes = () => {
    // load notes from file
    const notes = loadNotes()
    // log note list header
    console.log(chalk.blue('Note List:'))
    // loop through each object in list
    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) =>{
    const notes = loadNotes()
    // assign note matching title
    const note2read = notes.find((note) => note.title === title)

    // if note found - display
    if (note2read) {
        console.log(chalk.inverse(note2read.title))
        console.log(note2read.body)
    } else {
        console.log(chalk.red.inverse(`Note ${title} not found`))
    }
}

const addNote = (title, body) => {
    const notes = loadNotes()
    //// updated function filter
    //const duplicateNotes = notes.filter((note) => note.title === title)
    //// original notes filter function
    //const duplicateNotes = notes.filter(function (note) {
    //    return note.title === title
    //})

    //n n
    const duplicateNote = notes.find((note) => notes.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNote = (title) => {
    // load the notes from file
    const notes = loadNotes()
    // filter out the notes that don't match the provided title to a new array
    const lessNotes = notes.filter((note) => note.title !== title)

    // compare array lengths to see if anything changed
    if (notes.length === lessNotes.length) {
        console.log(chalk.red.inverse('Title not found, note not removed'))
    } else {
        // save new note array
        saveNotes(lessNotes)
        console.log(chalk.green.inverse(`Note ${title} removed`))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}