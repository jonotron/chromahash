const chromahash = require('../')

test('successive hashes are the same for a given word', () => {
  const a = chromahash('same')
  const b = chromahash('same')

  expect(a).toEqual(b)
})
