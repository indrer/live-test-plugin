export function saveText (filename, text) {
  var tempElem = document.createElement('a')
  tempElem.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
  tempElem.download = filename
  tempElem.click()
}
