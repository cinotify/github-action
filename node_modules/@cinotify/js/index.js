const http = require('axios');

module.exports.email = ({ to, subject, body }) => {
    return http.post('https://www.cinotify.cc/api/notify', {
        to,
        subject,
        body
    })
}