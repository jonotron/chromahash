const chalk = require('chalk')

function djb2(str){
    var hash = 5381;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash << 5) + hash) + char; /* hash * 33 + c */
    }
    return hash;
}

function to256ish(i) {
  return (Math.abs(i) % 47) * 5 // almost 256
}

function chromahash(str) {
  const r = to256ish(djb2('red' + str)).toString(16)
  const g = to256ish(djb2('gre' + str)).toString(16)
  const b = to256ish(djb2('blu' + str)).toString(16)

  return `${r}${g}${b}`
}

const words = 'hello there how are you doing today and what other ' + 
  'wonderful things can we accomplish today ' +
  'we seem to not be able to generate different enough colors'

words.split(' ').forEach(w => {
  const hex = '#' + chromahash(w)
  console.log(hex, chalk.bgHex(hex)(w))
})
