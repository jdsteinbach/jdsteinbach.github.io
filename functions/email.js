const busboy = require('busboy')
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

const parseFormBody = event => {
  return new Promise((resolve) => {
    const fields = {}

    const bb = busboy({
      headers: event.headers
    })

    bb.on(
      'file',
      (fieldname, filestream, filename, transferEncoding, mimeType) => {
        filestream.on('data', (data) => {
          fields[fieldname] = {
            filename,
            type: mimeType,
            content: data,
          }
        })
      }
    )

    bb.on('field', (fieldName, value) => {
      fields[fieldName] = value
    })

    bb.on('finish', () => {
      resolve(fields)
    })

    bb.write(Buffer.from(event.body, 'base64'))
  })
}

exports.handler = async (event, context) => {
  const body = await parseFormBody(event)

  const { name, email, message } = body

  const subject = `Email from ${name}`

  const text = message.replace(/\\n/gi, '\n')

  try {
    const res = await client.messages.create(
      MAILGUN_DOMAIN,
      {
        from: `${name} <${email}>`,
        to: MAILGUN_TO,
        subject,
        text
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
