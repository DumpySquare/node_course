const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forcast = require('./utils/forcast.js')

// initiates express in node
const app = express()

// capture environment port from Heroku or 3000
const port = process.env.PORT || 3000

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
    if (!req.query.address) {
        return res.send({
            error: 'provide an address to get the weather for that location'
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        console.log(req.query.address)
        console.log(location)
        console.log(latitude)
        console.log(longitude)
        forcast(latitude, longitude, (error, forcastData) => {
            if (error) {
                return res.send({ error })
            }
            console.log(forcastData)

            res.send({
                address: req.query.address,
                location,
                forcast: forcastData
            })
        })
    })

})

app.get('/products', (req, res) => {
    console.log('\nProducts request query: ', req.query.search)

    if (!req.query.search) {
        return res.send({
            error: 'Provide a search term'
        })
    }
    res.send({
        products: []
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
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
})