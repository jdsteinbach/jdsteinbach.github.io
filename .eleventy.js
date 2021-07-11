const { URL } = require('url')
const { DateTime } = require('luxon')
const pluginTOC = require('eleventy-plugin-toc')
const pluginDropcap = require('eleventy-plugin-dropcap')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const markdownItHighlightJS = require('markdown-it-highlightjs')
const typogr = require('typogr')

const webmentions = require('./src/_data/webmentions')

const mdOptions = {
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
}
const mdAnchorOpts = {
  permalink: true,
  permalinkClass: 'anchor-link',
  permalinkSymbol: '#',
  level: [1, 2, 3, 4]
}

const formatDate = date => DateTime.fromJSDate(new Date(date)).toISO({includeOffset: true, suppressMilliseconds: true})

const formatDateYear = date => DateTime.fromJSDate(new Date(date)).get('year')

module.exports = eleventyConfig => {
  // Markdown
  eleventyConfig.setLibrary(
    'md',
    markdownIt(mdOptions)
      .use(markdownItAnchor, mdAnchorOpts)
      .use(markdownItHighlightJS)
  )

  // Plugins
  eleventyConfig.addPlugin(pluginTOC)
  eleventyConfig.addPlugin(pluginDropcap)

  // Filters
  eleventyConfig.addFilter('random', max => {
    return Math.round(Math.random() * max)
  })

  eleventyConfig.addFilter('xml_friendly', string => {
    return string
      .replace(/&\s/g, '&amp; ')
      .replace(/<br>/g, '<br />')
  })

  eleventyConfig.addFilter('paginate_legacy', id => (id > 0) ? `page${id + 1}` : '')

  eleventyConfig.addFilter('paginate_better', id => (id > 0) ? `${id + 1}/` : '')

  eleventyConfig.addFilter('fix_links', url => url.replace('/index.html', ''))

  eleventyConfig.addFilter('rss_last_updated_date', posts => {
    const latest = posts.sort((a, b) => {
      return new Date(a.date) < new Date(b.date)
    })[0].date
    return formatDate(latest)
  })

  eleventyConfig.addFilter('copyright_years', posts => {
    const first = posts[(posts.length - 1)].date
    const last = posts[0].date

    return `${formatDateYear(first)}&ndash;${formatDateYear(last)}`
  })

  eleventyConfig.addFilter('abs_url', (href, base) => new URL(href, base).toString())

  eleventyConfig.addFilter('rss_date', date => formatDate(date))

  eleventyConfig.addFilter('title_class', string => string.length > 30 ? ' is-long' : '')

  eleventyConfig.addFilter('webmentionsPerPost', url => {
    if (webmentions.children) {
      return webmentions.children.filter(mention => {
        return mention['wm-target'] && mention['wm-target'] === url
      })
    } else {
      return []
    }
  })

  // eleventyConfig.addTransform('no_orphan', (content, outputPath) => {
  //   if( outputPath.endsWith(".html") ) {
  //     return typogr(content).chain().widont().value()
  //   }
  //   return content
  // })

  // Create Posts Collection
  eleventyConfig.addCollection('posts', collection => {
    return collection
      .getAllSorted()
      .reverse()
      .filter(item => {
        return item.inputPath.match(/^\.\/src\/posts\//) !== null
      })
  })

  // Create Posts Index Collection
  eleventyConfig.addCollection('postsIndex', collection => {
    return collection
      .getAllSorted()
      .reverse()
      .filter(item => {
        return item.inputPath.match(/^\.\/src\/posts\//) !== null
      })
      .slice(0, 8)
  })

  // Create Posts Feed Collection
  eleventyConfig.addCollection('postsFeed', collection => {
    return collection
      .getAllSorted()
      .reverse()
      .filter(item => {
        return item.inputPath.match(/^\.\/src\/posts\//) !== null
      })
      .slice(0, 10)
  })

  // Create Category Collections
  Array.from(['CSS', 'Sass', 'Misc', 'WordPress', 'Performance']).map(cat => {
    eleventyConfig.addCollection(cat, collection => {
      return collection
        .getAllSorted()
        .filter(item => {
          if ('categories' in item.data) {
            return item.data.categories.filter(category => {
              return category.toLowerCase() === cat.toLowerCase()
            }).length > 0
          }
          return false
        })
        .reverse()
    })
  })

  // Create Nav Collection
  eleventyConfig.addCollection('nav', collection => {
    return collection
      .getAll()
      .filter(item => {
        return 'menu_order' in item.data
      })
      .sort((a, b) => {
        return a.data.menu_order > b.data.menu_order
      })
  })

  // Pass through directories
  eleventyConfig.addPassthroughCopy('src/images')
  eleventyConfig.addPassthroughCopy('src/assets/fonts')
  eleventyConfig.addPassthroughCopy({'src/assets/js/site/site.js': 'js/site.js'})
  eleventyConfig.addPassthroughCopy('src/site.webmanifest')
  eleventyConfig.addPassthroughCopy('src/android-chrome-192x192.png')
  eleventyConfig.addPassthroughCopy('src/android-chrome-512x512.png')
  eleventyConfig.addPassthroughCopy('src/apple-touch-icon.png')
  eleventyConfig.addPassthroughCopy('src/safari-pinned-tab.svg')
  eleventyConfig.addPassthroughCopy('src/favicon.ico')
  eleventyConfig.addPassthroughCopy('src/favicon.svg')
  eleventyConfig.addPassthroughCopy('src/A')
  eleventyConfig.addPassthroughCopy('src/CNAME')
  eleventyConfig.addPassthroughCopy('src/.nojekyll')

  // More watched files
  eleventyConfig.addWatchTarget('./src/assets/js/**/*.js')
  eleventyConfig.addWatchTarget('./src/assets/scss/**/*.scss')

  return {
    templateFormats: [
      'liquid',
      'md',
      '11ty.js'
    ],
    dir: {
      input: './src',
      includes: '_includes',
      data: '_data',
      output: '_site'
    }
  }
}
