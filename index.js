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
  return (Math.abs(i) % 47) * 5 // almost 256
}

function toHex(d) {
  return  ("0"+(Number(d).toString(16))).slice(-2)
}

function chromahash(str) {
  const r = toHex(to256ish(djb2('red' + str)))
  const g = toHex(to256ish(djb2('gre' + str)))
  const b = toHex(to256ish(djb2('blu' + str)))

  return `${r}${g}${b}`
}
