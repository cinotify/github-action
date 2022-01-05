# CI Notify Node JS Client

```
npm install -s @cinotify/email
```

```js
const {email} = require("@cinotify/email");
email({
  to: 'example@example.com',
  subject: 'hello',
  body: 'hey there from js'
})
```