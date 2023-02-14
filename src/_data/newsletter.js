const https = require('https')

const url = 'https://api.jdsteinbach.com/newsletter/'

const getNewsletter = () => {
  return new Promise((resolve, reject) => {
    https.get(
      url,
      res => {
        let data = ''

        res.on('data', d => {
          data += d
        })

        res.on('end', () => {
          if(typeof data === 'string' && data.indexOf('<') === 0) throw new Error('ERROR: Newsletter API did not receive JSON.')
          resolve(JSON.parse(data))
        })
      }
    ).on('error', error => {
      console.error(error)
      reject(error)
    })
  })
}

module.exports = getNewsletter()
