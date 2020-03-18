
const request = require('request')

const geocode = (address, callback) => {
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYnVub29rYW5hIiwiYSI6ImNrN3FpdDI5YzAwNGEzZW10bzAyNzNndW0ifQ.c5iKH4Is1ebYNrrMVp6MDQ&limit=1'

    request({ url: geoUrl, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to geoLocation service, error: ' + error, undefined)
        } else if (body.features.length === 0) {
            callback('Could not find location - not enough details', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode