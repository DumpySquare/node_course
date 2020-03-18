//console.log('Client side javascript')
//
//fetch('http://puzzle.mead.io/puzzle').then((Response) => {
//    Response.json().then((data) => {
//        console.log(data)
//    })
//})



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageOne.textContent = ''
    console.log('Search value:', location)
    fetch('http://192.168.200.111:3000/weather?address=' + location).then((Response) => {
        Response.json().then((data) => {
            //console.log(data)
            if (data.error) {
                //console.log(data.error)
                messageOne.textContent = data.error
            } else {
                //console.log(data.location)
                //console.log(data.forcast)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forcast
            }
        })
    })
})

//http://192.168.200.111:3000/weather?address=spring%20hill%20tn