const chalk = require('chalk')
const chromahash = require('./')

const words =
  'hello there how are you doing today and what other ' +
  'wonderful things can we accomplish today ' +
  'we seem to not be able to generate different enough colors'

words.split(' ').forEach(w => {
  const hex = '#' + chromahash(w)
  console.log(hex, chalk.bgHex(hex)(w))
})
