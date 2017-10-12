module.exports = chromahash

function djb2(str){
    var hash = 5381;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash << 5) + hash) + char; /* hash * 33 + c */
    }
    return hash;
}

function to256ish(i) {
  //return (Math.abs(i) % 47) * 5 // almost 256
  return (Math.abs(i) % 251)
}

function toHex(d) {
  return  ("0"+(Number(d).toString(16))).slice(-2)
}

function chromahash(str) {
  const rStr = 'red'
  const gStr = 'green'
  const bStr = 'blue'

  const rHex = toHex(to256ish(djb2(rStr + str)))
  const gHex = toHex(to256ish(djb2(gStr + str)))
  const bHex = toHex(to256ish(djb2(bStr + str)))

  return `${rHex}${gHex}${bHex}`
}
