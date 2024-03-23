import core from "@actions/core";
import mime from "mime";
import { readFileSync } from "fs";

export const notify = async () => {
  try {
    const to = core.getInput("to");
    const subject = core.getInput("subject");
    const body = core.getInput("body");
    const type = core.getInput("type");
    const payload = { to, subject, body, type };
    const attachmentPath = core.getInput("attachment");
    if (attachmentPath) {
      const file = readFileSync(attachmentPath);
      const attachment = {
        filename: attachmentPath,
        type: mime.getType(attachmentPath),
        content: file.toString("base64"),
      };
      payload.attachments = [attachment];
    }

    const response = await fetch("https://www.cinotify.cc/api/notify", {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "User-Agent": `@cinotify/github-action@${process.env["GITHUB_ACTION_REF"]}`,
      },
      method: "POST",
    });

    if (response.status >= 300) {
      throw new Error(JSON.stringify(await response.json()));
    }
    core.setOutput("status", "ok");

    return response;
  } catch (error) {
    core.setFailed(error.message);
  }
};
