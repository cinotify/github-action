const core = require('@actions/core');
const { email } = require('@cinotify/email')

try {
    const to = core.getInput('to');
    const subject = core.getInput('subject');
    const body = core.getInput('body');
    email({
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