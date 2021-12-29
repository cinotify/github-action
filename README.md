# CI Notify JavaScript action

This action sends an email notification to the specified recipient.

**Motivation**:

- Zero domain/DNS configuration
- No need to give out SMTP credentials
- It Just Works™️

## Inputs

### `to`

**Required** The recipient of the email

### `subject`

Email subject

### `body`

Email body

## Outputs

### `status`

"ok" if the notification sent successfully.

## Example usage

```yaml
uses: jshawl/cinotify-action@main
with:
  to: 'jesse@jesse.sh'
  subject: 'building main'
  body: 'This is a notification from GitHub actions.'
```
