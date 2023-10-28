const core = require('@actions/core');
const mime = require('mime');
const { email } = require('@cinotify/js');
const {readFileSync} = require('fs');

try {
    const to = core.getInput('to');
    const subject = core.getInput('subject');
    const body = core.getInput('body');
    const payload = {to, subject, body};

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

    email(payload).then(() => {
        core.setOutput("status", "ok")
    }).catch(err => {
        core.setFailed(err.message)
    })
} catch (error) {
    core.setFailed(error.message);
}
