import { escapeString } from './stringEscape'

export let selectorGenerator = function (el) {
  let selector = []
  let textContent = ''
  if (el.id) {
    return {
      uniqsel: '#' + el.id,
      textcont: textContent
    }
  } else {
    while (el.parentNode !== null) {
      if (el.id) {
        selector.unshift('#' + el.id)
        selector = [selector[0], selector[selector.length - 1]]
        break
      } else {
        if (selector.length === 0) {
          if (el.tagName.toLowerCase() === 'img' || el.childNodes.length === 0) {
            textContent = ''
          } else {
            textContent = el.childNodes[0].nodeValue === null ? '' : escapeString(el.childNodes[0].nodeValue.trim())
          }
          if (el.tagName.toLowerCase() === 'img') {
            selector.unshift(`img[src='${escapeString(el.src)}']`)
          } else {
            selector.unshift(el.tagName.toLowerCase())
          }
        } else {
          selector.unshift(el.tagName.toLowerCase())
        }
        el = el.parentNode
      }
    }
  }
  return {
    uniqsel: selector.join(' '),
    textcont: textContent
  }
}
