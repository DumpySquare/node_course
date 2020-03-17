const path = require('path')
const express = require('express')
const hbs = require('hbs')

// initiates express in node
const app = express()

// define paths for Express config
const publicDirectoryPatch = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// tells express that we have handlebars/express installed and to use it
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// tells express where the static web pages are
app.use(express.static(publicDirectoryPatch))

// main page route
app.get('', (req, res) => {
    // renders the index.hbs view from hbs
    res.render('index', {
        title: 'Weather App',
        name: 'Ben Gordon'
    })
})

// about page route
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ben Gordon'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Helpy helpy',
        title: 'Help',
        name: 'Ben Gordon'
    })
})

// when user requests url, respond with json body defined
app.get('/weather', (req, res) => {
    res.send({
        location: 'spring hill, tn',
        forcast: 'awesome with a sprits of noice!'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ben Gordon',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ben Gordon',
        errorMessage: 'page not found'
    })
})

// start express web server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000.')
})