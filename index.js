module.exports = chromahash

function djb2(str) {
  var hash = 5381
  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i)
    hash = (hash << 5) + hash + char /* hash * 33 + c */
  }
  return hash
}

function mainColour(i) {
  let colourFamilies = 6

  return (Math.abs(i) % colourFamilies) + 1
}

// simple modulo hash to convert an int to a number from 0 - 255 (or so)
function to256ish(i) {
  // djb2 uses 33 as it's prime... should we then use k = 25 (coprime to 33),
  // m = 10 to get a 256ish number? k = 251 seems to work
  // does k even need to be prime here?
  const k = 5
  const m = 256 / k

  return (Math.abs(i) % k) * 70
}

// convert a digit (base 10) to hex (base 16) left padded with 0
function toHex(d) {
  return ('0' + Number(d).toString(16)).slice(-2)
}

function chromahash(str) {
  // we need to prefix the string to ensure different values for r/g/b but also
  // if we only suffix we seem to get clustering around purple and yellow
  const rStr = 'red' + str
  const gStr = 'green' + str
  const bStr = 'blue' + str

  let weightTowards = mainColour(djb2(str))

  console.log(weightTowards)

  let weightMatrix = { red: 0, green: 0, blue: 0 }

  switch (weightTowards) {
    case 1:
      weightMatrix = { red: 1, green: 0, blue: 0 }
      break
    case 2:
      weightMatrix = { red: 1, green: 1, blue: 0 }
    case 3:
      weightMatrix = { red: 0, green: 1, blue: 1 }
      break
    case 4:
      weightMatrix = { red: 1, green: 0, blue: 1 }
      break
    case 5:
      weightMatrix = { red: 0, green: 1, blue: 0 }
    case 6:
      weightMatrix = { red: 0, green: 0, blue: 1 }
  }

  console.log(weightMatrix)

  const rHex = toHex(to256ish(djb2(rStr)))
  const gHex = toHex(to256ish(djb2(gStr)))
  const bHex = toHex(to256ish(djb2(bStr)))

  console.log(`${rHex}${gHex}${bHex}`)

  return `${rHex}${gHex}${bHex}`
}
