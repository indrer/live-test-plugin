export let selectorGenerator = function (event) {
  event.stopPropagation()
  let el = event.target
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
          textContent = el.childNodes[0].nodeValue === null ? '' : el.childNodes[0].nodeValue.trim()
          selector.unshift(el.tagName.toLowerCase())
        } else {
          selector.unshift(el.tagName.toLowerCase())
        }
        el = el.parentNode
      }
    }
  }
  console.log(textContent)
  return {
    uniqsel: selector.join(' '),
    textcont: textContent
  }
}
