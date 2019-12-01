document.getElementById('navbar-brand-centered').addEventListener('mousedown', function (event) {
  event.stopPropagation()
  let elTag = event.target.tagName.toLowerCase()
  let elText = event.target.textContent.trim()
  let url = window.location.href

  console.log('visit "' + url + '"\n' +
  'in "#navbar-brand-centered" {\n' +
  '\tclick "' + elTag + '" with text "' + elText + '"\n' +
  '}')
})

window.addEventListener('mousedown', function (event) {
  event.stopPropagation()
  let clickedElement = event.target
  let selector = []
  let elTagName = ''
  let i = 1
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
  // console.log(selector.join(' > '))
})
