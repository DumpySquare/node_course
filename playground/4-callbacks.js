setTimeout(() => {
    console.log('2 seconds')
}, 2000)

const names = ['Ben', 'Jess', 'Rick']
const shortNmaes = names.filter((name) => {
    return name.length <= 4  
})

const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        }
        callback(data)
    }, 2000)
}

geocode('Nashville', (data2) => {
    console.log(data2)
})

const add = (a, b, callback) => {
    setTimeout(() => {
        callback(a + b)
    }, 2000)
}

add(1, 4, (sum) => {
    console.log(sum) // should print: 5
})