import { escape } from 'safe-string-literal'
// Method used to escape strings in Java rules
export let escapeString = function (str) {
  let exclude = ['`', '\'', '\t', '\n', '\r']
  return escape(str, exclude)
}
