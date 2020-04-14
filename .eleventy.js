const {URL} = require('url')
const {DateTime} = require('luxon')
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const pluginTOC = require('eleventy-plugin-toc')

const formatDate = date => DateTime.fromJSDate(new Date(date)).toISO({includeOffset: true, suppressMilliseconds: true})

module.exports = eleventyConfig => {
  eleventyConfig.addPlugin(pluginSyntaxHighlight)
  eleventyConfig.addPlugin(pluginTOC)

  // Layouts
  eleventyConfig.addLayoutAlias('post', 'layouts/post.liquid')
  eleventyConfig.addLayoutAlias('page', 'layouts/page.liquid')
  eleventyConfig.addLayoutAlias('category', 'layouts/category.liquid')
  eleventyConfig.addLayoutAlias('blog', 'layouts/blog.liquid')
  eleventyConfig.addLayoutAlias('feed', 'layouts/feed.liquid')

  // Filters
  eleventyConfig.addFilter('random', max => {
    return Math.round(Math.random() * max)
  })

  eleventyConfig.addFilter('xml_friendly', string => {
    return string
      .replace(/&\s/g, '&amp; ')
      .replace(/<br>/g, '<br />')
  })

  eleventyConfig.addFilter('paginate_better', id => (id > 0) ? `page${id + 1}` : '')

  eleventyConfig.addFilter('fix_links', url => url.replace('/index.html', ''))

  eleventyConfig.addFilter('debug', something => typeof something)

  eleventyConfig.addFilter('rss_last_updated_date', posts => {
    const latest = posts.sort((a, b) => {
      return new Date(a.date) < new Date(b.date)
    })[0].date
    return formatDate(latest)
  })

  eleventyConfig.addFilter('abs_url', (href, base) => new URL(href, base).toString())

  eleventyConfig.addFilter('rss_date', date => formatDate(date))

  // Create Posts Collection
  eleventyConfig.addCollection('posts', collection => {
    return collection
      .getAllSorted()
      .reverse()
      .filter(item => {
        return item.inputPath.match(/^\.\/posts\//) !== null
      })
  })

  // Create Posts Collection
  eleventyConfig.addCollection('postsIndex', collection => {
    return collection
      .getAllSorted()
      .reverse()
      .filter(item => {
        return item.inputPath.match(/^\.\/posts\//) !== null
      })
      .slice(0, 8)
  })

  // Create Posts Collection
  eleventyConfig.addCollection('postsFeed', collection => {
    return collection
      .getAllSorted()
      .reverse()
      .filter(item => {
        return item.inputPath.match(/^\.\/posts\//) !== null
      })
      .slice(0, 10)
  })

  // Create Category Collections
  eleventyConfig.addCollection('CSS', collection => {
    return collection
      .getAllSorted()
      .reverse()
      .filter(item => {
        if ('categories' in item.data) {
          return item.data.categories.filter(category => {
            return category.toLowerCase() === 'CSS'.toLowerCase()
          }).length > 0
        }
        return false
      })
  })

  eleventyConfig.addCollection('Sass', collection => {
    return collection
      .getAllSorted()
      .reverse()
      .filter(item => {
        if ('categories' in item.data) {
          return item.data.categories.filter(category => {
            return category.toLowerCase() === 'Sass'.toLowerCase()
          }).length > 0
        }
        return false
      })
  })

  eleventyConfig.addCollection('Misc', collection => {
    return collection
      .getAllSorted()
      .reverse()
      .filter(item => {
        if ('categories' in item.data) {
          return item.data.categories.filter(category => {
            return category.toLowerCase() === 'Misc'.toLowerCase()
          }).length > 0
        }
        return false
      })
  })

  eleventyConfig.addCollection('WordPress', collection => {
    return collection
      .getAllSorted()
      .reverse()
      .filter(item => {
        if ('categories' in item.data) {
          return item.data.categories.filter(category => {
            return category.toLowerCase() === 'WordPress'.toLowerCase()
          }).length > 0
        }
        return false
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
  eleventyConfig.addPassthroughCopy('images')
  eleventyConfig.addPassthroughCopy('assets/fonts')
  eleventyConfig.addPassthroughCopy('site.webmanifest')
  eleventyConfig.addPassthroughCopy('android-chrome-192x192.png')
  eleventyConfig.addPassthroughCopy('android-chrome-512x512.png')
  eleventyConfig.addPassthroughCopy('apple-touch-icon.png')
  eleventyConfig.addPassthroughCopy('safari-pinned-tab.svg')
  eleventyConfig.addPassthroughCopy('favicon.ico')
  eleventyConfig.addPassthroughCopy('favicon-16x16.png')
  eleventyConfig.addPassthroughCopy('A')
  eleventyConfig.addPassthroughCopy('CNAME')

  // More watched files
  eleventyConfig.addWatchTarget('./assets/js/**/*.js')
  eleventyConfig.addWatchTarget('./assets/scss/**/*.scss')

  // Markdown
  const markdownIt = require('markdown-it')
  const markdownItAnchor = require('markdown-it-anchor')
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

  eleventyConfig.setLibrary('md', markdownIt(mdOptions).use(markdownItAnchor, mdAnchorOpts))

  return {
    templateFormats: [
      'md',
      '11ty.js'
    ],
    dir: {
      input: '.',
      includes: '_includes',
      data: '_data',
      output: '_site'
    }
  }
}
