const https = require('https')

const url = 'https://api.jdsteinbach.com/newsletter/'

const get = () => {
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

module.exports = get()
