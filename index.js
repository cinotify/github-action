const core = require('@actions/core');
const http = require('axios')

try {
    const to = core.getInput('to');
    const subject = core.getInput('subject');
    const body = core.getInput('body');

    http.post('https://www.cinotify.cc/api/notify', {
        to,
        subject,
        body
    }).then(() => {
        core.setOutput("status", "ok")
    }).catch(err => {
        core.setFailed(err.message)
    })
} catch (error) {
    core.setFailed(error.message);
}