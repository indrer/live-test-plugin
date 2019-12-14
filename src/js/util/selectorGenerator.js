export let selectorGenerator = function (target) {
  let el = target
  let selector = []
  let textContent = ''
  if (el.id) {
    return el.id
  } else {
    while (el.parentNode !== null) {
      if (el.id) {
        selector.unshift('#' + el.id)
        break
      } else {
        if (selector.length == null) {
          textContent = el.textContent.trim()
        } else {
          selector.unshift(el.tagName)
        }
        el = el.parentNode
      }
    }
  }

  return {
    uniqsel: selector.join('>'),
    textcont: textContent
  }
}
