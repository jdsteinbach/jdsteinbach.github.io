const axios = require('axios')

const url = 'https://api.jdsteinbach.com/.netlify/functions/newsletter'

const getNewsletter = () => axios.get(url)
  .then(({ data }) => {
    return data
  })
  .catch(error => {
    console.error(error)
  })

module.exports = getNewsletter()
