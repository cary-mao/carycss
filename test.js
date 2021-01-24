const Parser = require('stylus/lib/parser')
const fs = require('fs')

const str = fs.readFileSync('./src/layouts/col.styl').toString()
console.log(str)
const parser = new Parser(str)

const ast = parser.parse()
console.log(ast)

// parser.parse()
