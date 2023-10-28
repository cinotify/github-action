# CI Notify Node JS Client

This package is used by the [CI Notify GitHub Action](https://github.com/cinotify/github-action).

## Installation

```
$ npm install -s @cinotify/js
```

## Usage

```js
const {email} = require("@cinotify/js");
const mime = require('mime');

email({
  to: 'example@example.com',
  subject: 'hello',
  body: 'hey there from js',
  attachments: [
    {
      content: Buffer.from("Hello, World!").toString('base64'),
      type: mime.getType("txt"),
      filename: "example.txt"
    }
  ]
})
```
