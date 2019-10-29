module.exports = chromahash

function djb2(str) {
  var hash = 5381
  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i)
    hash = (hash << 5) + hash + char /* hash * 33 + c */
  }

  return hash
}

// simple modulo hash to convert an int to a number from 0 - 255 (or so)
function to256ish(i) {
  // djb2 uses 33 as it's prime... should we then use k = 25 (coprime to 33),
  // m = 10 to get a 256ish number? k = 251 seems to work
  // does k even need to be prime here?
  let ret = Math.abs(i % 240) + 30
  return ret < 255 ? ret : 255
}

// convert a digit (base 10) to hex (base 16) left padded with 0
function toHex(d) {
  let r = djb2('red' + d)
  let g = djb2('green' + d)
  let b = djb2('blue' + d)

  let red = Math.abs((r + 85) % 240) + 30
  let green = Math.abs((g + 170) % 240) + 30
  let blue = Math.abs(b % 240) + 30

  red = red < 255 ? red : 255
  green = green < 255 ? green : 255
  blue = blue < 255 ? blue : 255

  return (
    ('0' + Number(red).toString(16)).slice(-2) +
    ('0' + Number(green).toString(16)).slice(-2) +
    ('0' + Number(blue).toString(16)).slice(-2)
  )
}

function chromahash(str) {
  // we need to prefix the string to ensure different values for r/g/b but also
  // if we only suffix we seem to get clustering around purple and yellow

  const hex = toHex(str)

  console.log(hex)

  return hex
}
