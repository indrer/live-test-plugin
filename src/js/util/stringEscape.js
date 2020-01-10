// Method used to escape strings in Java rules
export let escapeString = function (str) {
  const escape = require('safe-string-literal').escape
  let exclude = ['`', '\'', '\t', '\n', '\r']
  return escape(str, exclude)
}
