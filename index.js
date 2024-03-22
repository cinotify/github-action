const core = require('@actions/core');
const mime = require('mime');
const {readFileSync} = require('fs');

console.log(process.env);

try {
    const to = core.getInput('to');
    const subject = core.getInput('subject');
    const body = core.getInput('body');
    const type = core.getInput('type');
    const payload = {to, subject, body, type};

    const attachmentPath = core.getInput('attachment');
    if (attachmentPath) {
        const file = readFileSync(attachmentPath);
        const attachment = {
            filename: attachmentPath,
            type: mime.getType(attachmentPath),
            content: file.toString('base64')
        }
        payload.attachments = [attachment];
    }

    fetch('https://www.cinotify.cc/api/notify', {
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    }).then(() => {
        core.setOutput("status", "ok")
    }).catch(err => {
        core.setFailed(err.message)
    })
} catch (error) {
    core.setFailed(error.message);
}
