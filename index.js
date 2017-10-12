module.exports = chromahash

function djb2(str){
    var hash = 5381;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash << 5) + hash) + char; /* hash * 33 + c */
    }
    return hash;
}

// simple modulo hash to convert an int to a number from 0 - 255 (or so)
function to256ish(i) {
  // djb2 uses 33 as it's prime... should we then use k = 25 (coprime to 33),
  // m = 10 to get a 256ish number? k = 251 seems to work
  // does k even need to be prime here?
  const k = 251
  const m = 1

  return (Math.abs(i) % k) * m
}

// convert a digit (base 10) to hex (base 16) left padded with 0
function toHex(d) {
  return  ("0"+(Number(d).toString(16))).slice(-2)
}

function chromahash(str) {
  // we need to prefix the string to ensure different values for r/g/b but also
  // if we only suffix we seem to get clustering around purple and yellow
  const rStr = 'red'   + str
  const gStr = 'green' + str
  const bStr = 'blue'  + str

  const rHex = toHex(to256ish(djb2(rStr)))
  const gHex = toHex(to256ish(djb2(gStr)))
  const bHex = toHex(to256ish(djb2(bStr)))

  return `${rHex}${gHex}${bHex}`
}
