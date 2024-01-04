const http = require('axios');

module.exports.email = ({ to, subject, body, attachments }) => {
    const payload = { to, subject, body }
    if (attachments) {
        payload.attachments = attachments
    }
    return http.post('https://www.cinotify.cc/api/notify', payload)
        .catch(err => {
            console.error(err.response.data.error)
            throw new Error(err)
        })
}
