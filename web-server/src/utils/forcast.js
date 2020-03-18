const request = require('request')


const forcast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/52523463c5e96311976cfa82ec1b140f/${latitude},${longitude}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service, error: ' + error, undefined)
        } else if (body.error) {
            callback('Counld not find weather location, error: ' + body.error, undefined)
        } else {
            const dailySum = body.daily.data[0].summary
            const temp = body.currently.temperature
            const precipProb = body.currently.precipProbability
            callback(undefined, `${dailySum} Is is currently ${temp} degrees out.  There is a ${precipProb}% chance it is going to rain\n`)
        }
    })
}

module.exports = forcast