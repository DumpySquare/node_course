const squar = function (x) {
    return x * x
}
console.log(squar(3))

const square2 = (x) => {
    return x * x
}
console.log(square2(3))

const square3 = (x) => x * x
console.log(square3(3))

const event = {
    name: 'Birthday Party',
    guestList: ['Andrew', 'Jen', 'Mike'],
    printGuestList() {
        console.log('guest list for ' + this.name)
        this.guestList.forEach((guest) => {
            console.log(guest + ' is attending' + this.name)
        })
    }
}

event.printGuestList()