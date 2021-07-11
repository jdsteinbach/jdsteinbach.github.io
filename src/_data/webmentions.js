const https = require('https')

const url = 'https://webmention.io/api/mentions.jf2?domain=indiewebcamp.com&token=aKs-nlB_-kQV8JGQ5RIw7Q'

const getWebmentions = () => {
  return new Promise((resolve, reject) => {
    https.get(
      url,
      res => {
        let data = ''

        res.on('data', d => {
          data += d
        })

        res.on('end', () => {
          resolve(JSON.parse(data))
        })
      }
    ).on('error', error => {
      console.error(error)
      reject(error)
    })
  })
}

module.exports = getWebmentions()
