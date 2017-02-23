'use strict'

/*
 * All credit here goes to @quentin-chen on github
 *
 * https://github.com/quentin-chen/hexo-reference/blob/a86714fe2c2d19b7695dbe9ac571a1e12ff3b81c/src/footnotes.js
 */

var md = require('markdown-it')({
    // allow HTML tags
  html: true
})
const content = require('./dist/content.json')
const fs = require('fs')

/**
 * Render markdown footnotes
 * @param {String} text
 * @returns {String} text
 */
function renderFootnotes (text) {
  var footnotes = []
  var reFootnoteContent = /\[\^(\d+)\]: ?([\S\s]+?)(?=\[\^(?:\d+)\]|\n\n|$)/g
  var reInlineFootnote = /\[\^(\d+)\]\((.+?)\)/g
  var reFootnoteIndex = /\[\^(\d+)\]/g
  var html = ''

    // threat all inline footnotes
  text = text.replace(reInlineFootnote, function (match, index, content) {
    footnotes.push({
      index: index,
      content: content
    })
        // remove content of inline footnote
    return '[^' + index + ']'
  })

    // threat all footnote contents
  text = text.replace(reFootnoteContent, function (match, index, content) {
    footnotes.push({
      index: index,
      content: content
    })
        // remove footnote content
    return ''
  })

    // create map for looking footnotes array
  function createLookMap (field) {
    var map = {}
    for (var i = 0; i < footnotes.length; i++) {
      var item = footnotes[i]
      var key = item[field]
      map[key] = item
    }
    return map
  }
  var indexMap = createLookMap('index')

    // render (HTML) footnotes reference
  text = text.replace(reFootnoteIndex,
        function (match, index) {
          var tooltip = indexMap[index].content
          return '<sup id="fnref:' + index + '">' +
                '<a href="#fn:' + index + '" rel="footnote">' + '[' + index + ']</a></sup>'
        })

    // sort footnotes by their index
  footnotes.sort(function (a, b) {
    return a.index - b.index
  })

    // render footnotes (HTML)
  footnotes.forEach(function (footNote) {
    html += '<li id="fn:' + footNote.index + '">'
    html += '<span style="display: inline-block; vertical-align: top; padding-right: 10px; margin-left: -40px">'
    html += footNote.index
    html += '.</span>'
    html += '<span style="display: inline-block; vertical-align: top; margin-left: 10px;">'
    html += md.renderInline(footNote.content.trim())
    html += '<a href="#fnref:' + footNote.index + '" rev="footnote"> ↩</a></span></li>'
  })

    // add footnotes at the end of the content
  if (footnotes.length) {
    text += '<div id="footnotes">'
    text += '<hr>'
    text += '<div id="footnotelist">'
    text += '<ol style="list-style: none; padding-left: 0; margin-left: 40px">' + html + '</ol>'
    text += '</div></div>'
  }
  return text
}

function removeFootnotes (item) {
  return item.replace(/\[\^[0-9]+\]/, '')
}

function readJSONAndConvert () {
  const footnote = content.map(item => {
    item.content = renderFootnotes(item.content)
    item.excerpt = removeFootnotes(item.excerpt)
    return item
  })
  fs.writeFile('./dist/content.json', JSON.stringify(footnote), 'utf8')
}

readJSONAndConvert()
