const geocode = require('./utils/geocode.js')
const forcast = require('./utils/forcast.js')

const address = process.argv[2]

if (address) {
    geocode(process.argv[2], (error, { latitude, longitude, location }) => {
        
        if (error) {
            return console.log(error)
        }
        
        //console.log('error ', error)
        //console.log('data ', data)
        //console.log(`lat: ${latitude}, lon: ${longitude}`)
        
        forcast(latitude, longitude, (error, forcastData) => {
            if (error) {
                return console.log(error)
            }
            console.log('\n', location)
            console.log(forcastData)
        })
    })
} else {
    console.log('Please provide a city via command line argument, ex: "spring hill tn"')
}
