const words = require('an-array-of-english-words')
const chalk = require('chalk')
const chromahash = require('./')

Array(20)
  .fill()
  .forEach(() => {
    const rand = Math.floor(Math.random() * 250000)
    const word = words[rand]
    const hex = '#' + chromahash(word)
    console.log(hex, chalk.bgHex(hex)(word))
  })
