module.exports = {
  title: 'James Steinbach',
  email: 'jdsteinbach@gmail.com',
  description: 'Front-end architect. <br />Speaker & writer. <br />Sass, CSS animation, RWD & WP.',
  baseurl: '',
  url: 'https://jdsteinbach.com',
  twitter_username: 'jdsteinbach',
  github_username: 'jdsteinbach',
  author_name: 'James Steinbach',
  profile_pic: '/images/headshot.png',
  analytics: 'UA-43397146-5',
  mailurl: process.env.ELEVENTY_ENV === 'prod' ? 'https://api-jdsteinbach.netlify.app/.netlify/functions/email' : 'http://localhost:8888/.netlify/functions/email',
  header_shadow: '#131313',
}
