export function saveText (filename, text) {
  var tempElem = document.createElement('a')
  tempElem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  tempElem.setAttribute('download', filename)
  tempElem.click()
}
