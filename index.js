const core = require('@actions/core');
const mime = require('mime');
const { email } = require('@cinotify/js');
const { readFileSync, lstatSync, readdirSync, statSync } = require('fs');
const { join, relative } = require('path');

try {
    const to = core.getInput('to');
    const subject = core.getInput('subject');
    const body = core.getInput('body');
    const payload = {to, subject, body};

    const attachmentPath = core.getInput('attachment');
    if (attachmentPath) {
        const isDirectory = lstatSync(attachmentPath).isDirectory();
        if (isDirectory) {
            const files = getFilesFromDirectory(attachmentPath);
    
            files.forEach(filePath => {
                const fileContent = readFileSync(filePath);
                const attachment = {
                    filename: relative(attachmentPath, filePath),
                    type: mime.getType(filePath),
                    content: fileContent.toString('base64')
                }
                payload.attachments.push(attachment);
            });
        } else {
            const file = readFileSync(attachmentPath);
            const attachment = {
                filename: attachmentPath,
                type: mime.getType(attachmentPath),
                content: file.toString('base64')
            }
            payload.attachments = [attachment];
        }
    }

    email(payload).then(() => {
        core.setOutput("status", "ok")
    }).catch(err => {
        core.setFailed(err.message)
    })
} catch (error) {
    core.setFailed(error.message);
}


function getFilesFromDirectory(dir) {
    const files = readdirSync(dir);
    let fileList = [];

    files.forEach(file => {
        const filePath = join(dir, file);
        const stats = statSync(filePath);
        
        if (stats.isDirectory()) {
            fileList = fileList.concat(getFilesFromDirectory(filePath));
        } else {
            fileList.push(filePath);
        }
    });

    return fileList;
}