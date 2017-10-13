const chromahash = require('../')

test('successive hashes are the same for a given word', () => {
  const a = chromahash('same')
  const b = chromahash('same')

  expect(a).toEqual(b)
})

test('different words return different colors', () => {
  const a = chromahash('letterA')
  const b = chromahash('letterB')

  expect(a).not.toEqual(b)
})

test('colors are hex', () => {
  const a = chromahash('someword')
  const n = parseInt(a, 16)

  // TODO: this is a pretty poor test. Surely we can do better.
  expect(n).toBeGreaterThan(1)
})
