const matter = require('gray-matter')
const changeCase = require('change-case')
const hljs = require('highlightjs')
const fs = require('fs')
const excerptHtml = require('excerpt-html')
const markdown = require('markdown-it')({
  highlight: function (str, lang) {
    return hljs.highlightAuto(str).value
  },
  html: true,
  linkify: true,
  typographer: true
}).use(require('markdown-it-footnote'))

function convertMarkdownToJson (file) {
  const parsed = matter.read(file)

  const post = parsed.data

  post.content = parsed.content

  post.categories = post.categories ? post.categories.split(' ') : []

  post.slug = changeCase.paramCase(post.title)

  post.content = markdown.render(post.content)

  post.date = new Date(post.date)

  post.excerpt = excerptHtml(post.content, {
    moreRegExp: /\s*<!--\s*more\s*-->/i,
    stripTags: true,
    pruneLength: 1000,
    pruneString: '',
    pruneSeparator: ' '
  })

  post.content = post.content.replace(/\s*<!--\s*more\s*-->/i, '')

  return post
}

function getAllPostFilepaths () {
  const postsDir = './posts/'
  return fs.readdirSync(postsDir).map(post => `${postsDir}${post}`)
}

const json = getAllPostFilepaths().map(post => convertMarkdownToJson(post))

fs.writeFile('./src/posts.json', JSON.stringify(json.reverse()), 'utf8')

const RSS = require('rss')

/* lets create an rss feed */
const feed = new RSS({
  title: 'Un(Commit)ed',
  feed_url: 'https://donniewest.com/rss.xml',
  site_url: 'https://donniewest.com',
  image_url: 'https://donniewest.com/images/rss.png',
  managingEditor: 'Donnie West',
  webMaster: 'Donnie West',
  copyright: '2017 Donnie West',
  language: 'en',
  pubDate: Date.now(),
  ttl: '60'
})

json.map(post => {
  feed.item({
    title: post.title,
    description: post.excerpt,
    url: `https://donniewest.com/${post.slug}`,
    categories: post.categories,
    date: post.date
  })
})

const xml = feed.xml()

fs.writeFile('./public/atom.xml', xml, 'utf8')
