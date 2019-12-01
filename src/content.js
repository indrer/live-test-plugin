let selector = ''
let elTagName = ''
let i = 1

window.addEventListener('click', function (event) {
  event.stopPropagation()
  let clickedElement = event.target
  while (clickedElement.parentNode !== null) {
    this.console.log('rann')
    if (clickedElement.id) {
      selector = '#' + clickedElement.id + ' ' + selector
      break
    } else {
      elTagName = clickedElement.tagName.toLowerCase()
      let children = clickedElement.parentNode.children
      if (children !== null) {
        let repeats = false
        // check if any previous elements repeat
        for (let j = 0; j < children.length; j++) {
          this.console.log(children[j])
          if (clickedElement !== children[j] && elTagName === children[j].tagName) {
            repeats = true
          }
        }
        this.console.log(repeats)
        if (!repeats) {
          selector = elTagName + ' ' + selector
        } else {
          while (clickedElement.previousElementSibling) {
            clickedElement = clickedElement.previousElementSibling
            i++
          }
          selector = elTagName + ':nth-child(' + i + ') ' + selector
          i = 1
        }
      } else {
        selector = elTagName + ' ' + selector
      }
    }
    clickedElement = clickedElement.parentNode
  }
  console.log(selector)
  selector = ''
  elTagName = ''
  i = 1
})
