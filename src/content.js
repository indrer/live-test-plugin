let selector = []
let elTagName = ''
let i = 1

window.addEventListener('click', function (event) {
  event.stopPropagation()
  let clickedElement = event.target
  while (clickedElement.parentNode !== null) {
    // IDs are used on a single element, so no need to go anywhere further
    if (clickedElement.id) {
      selector.unshift('#' + clickedElement.id)
      break
    } else {
      elTagName = clickedElement.tagName.toLowerCase()
      let children = clickedElement.parentNode.children
      // Checks if current element has siblings
      if (children !== null) {
        let repeats = false
        // checks if any previous elements repeat (if we need to generate 'nth-child')
        for (let j = 0; j < children.length; j++) {
          if (clickedElement === children[j]) {
            continue
          }
          if (elTagName === children[j].tagName.toLowerCase()) {
            repeats = true
          }
        }
        if (!repeats) {
          selector.unshift(elTagName)
        } else {
          // Counts which child it is
          while (clickedElement.previousElementSibling) {
            clickedElement = clickedElement.previousElementSibling
            i++
          }
          selector.unshift(elTagName + ':nth-child(' + i + ')')
          i = 1
        }
      } else {
        selector.unshift(elTagName)
      }
    }
    clickedElement = clickedElement.parentNode
  }
  console.log(selector.join(' > '))
  selector = []
  elTagName = ''
  i = 1
})
