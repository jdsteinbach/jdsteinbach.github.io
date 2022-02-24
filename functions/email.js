const formData = require('form-data')
const Mailgun = require('mailgun.js')

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type'
}

require('dotenv').config()

const {
  MAILGUN_DOMAIN,
  MAILGUN_KEY,
  MAILGUN_TO
} = process.env

const mailgun = new Mailgun(formData)

const client = mailgun.client({
  key: MAILGUN_KEY,
  username: 'api'
})

exports.handler = async (event, context) => {
  const { name, email, message } = JSON.parse(event.body)

  const subject = `Email from ${name}`

  try {
    const res = await client.messages.create(
      MAILGUN_DOMAIN,
      {
        from: `${name} <${email}>`,
        to: MAILGUN_TO,
        subject: subject,
        text: message
      })
      .then(data => {
        return data
      })
      .catch(error => {
        throw new Error(error)
      })

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(res)
    }
  } catch (e) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        error: e
      })
    }
  }
}
