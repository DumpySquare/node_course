const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'bunookana@gmail.com',
        subject: 'Thanks for joining',
        text: `Hey ${name}, your pretty awesome...`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'bunookana@gmail.com',
        subject: 'Sorry to see you go',
        text: `Hey ${name}, your still pretty awesome...`
    }).then(() => {
        console.log('Message Sent')
    }).catch((error) => {
        console.log(error.response.body)
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}



//  // example message
// const msg = {
//     to: 'bunookana@gmail.com',
//     from: 'bunookana@gmail.com',
//     subject: 'First email from api',
//     text: 'email text'
// }

// sgMail.send(msg).then(() => {
//     console.log('Message sent')
// }).catch((error) => {
//     console.log(error.response.body)
//     // console.log(error.response.body.errors[0].message)
// })