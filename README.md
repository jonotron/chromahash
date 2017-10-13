# chromahash

Hash strings into colors

## Usage

    npm install chromahash

```javascript
const chromahash = require('chromahash')

const rgbHex = chromahash('chromahash') // returns a rgb hex color
```

## Why

* You have strings and want to associate colors to them
* You want those color associations to be deterministic
* You can't be bothered to pre-associate words with colours

Say you have a decentralized or offline application, and your users want to tag
things and those tags should be have colours. Your users want these colours to
be consistent across devices and for their friends. You need to hash the tags
into colours... chromahash!
