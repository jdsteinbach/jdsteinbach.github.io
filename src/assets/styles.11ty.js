const path = require('path')
const sass = require('sass')
const postcss = require('postcss')

const fileName = 'main.scss'

module.exports = class {
  async data () {
    const rawFilepath = path.join(__dirname, `/scss/${fileName}`)

    return {
      permalink: `css/${path.basename(fileName, '.scss')}.css`,
      rawFilepath
    }
  }

  async render ({ rawFilepath }) {
    const compiledSass = sass.renderSync({
      file: rawFilepath
    })

    let postcssOpts = [
      require('autoprefixer')({
        grid: false
      })
    ]

    if (process.env.ELEVENTY_ENV === 'prod') {
      postcssOpts.push(require('cssnano'))
    }

    return await postcss(postcssOpts)
      .process(compiledSass.css, { from: rawFilepath })
      .then(result => result.css)
  }
}
