const chromahash = require('./index.js')
const words = require('an-array-of-english-words')
const chalk = require('chalk')

const map = new Map()
words.forEach(w => {
  const c = chromahash(w)

  let count = map.get(c) || 0
  count++
  map.set(c, count)
})

for (let [k, v] of map) {
  console.log(k, chalk.hex(k)('#'.repeat(v / 8)))
}

console.log('\nColours: ', map.size)
