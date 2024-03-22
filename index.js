const core = require('@actions/core');
const mime = require('mime');
const {readFileSync} = require('fs');

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

    fetch('https://staging.cinotify.cc/api/notify', {
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': `@cinotify/github-action@${process.env['GITHUB_ACTION_REF']}`
        },
        method: 'POST'
    }).then((response) => {
        if(response.status > 299) {
            response.json().then(data => {
                core.setFailed(data.error);
            });
        } else {
            core.setOutput("status", "ok")
        }
    }).catch(err => {
        core.setFailed(err.message)
    })
} catch (error) {
    core.setFailed(error.message);
}
