const https = require('https')

const url = `https://api.darksky.net/forecast/52523463c5e96311976cfa82ec1b140f/35.7512,-86.93`

const request = https.request(url, (response) => {
    let data = ''
    response.on('data', (chunk) => {
        data = data + chunk.toString()
        //console.log(chunk)
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })

})

request.on('error', (error) => {
    console.log('An error: ', error)
})

request.end()


// video 41 - Bonus
