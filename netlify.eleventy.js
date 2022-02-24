module.exports = eleventyConfig => {
  eleventyConfig.addPassthroughCopy('netlify.toml')

  return {
    templateFormats: [
      'html'
    ],
    dir: {
      input: './src',
      output: '_netlify'
    }
  }
}
