// Create reference instance
const marked = require('marked');

// const lexer = new marked.Lexer()
marked.Tokenizer.prototype.codetab = function (src) {
  const cap = /:::(\w+)([\w\W]*?):::/.exec(src);
  if (cap) {
    if (cap[0].length > 1) {
      return {
        type: 'codetab',
        raw: cap[0],
        text: cap[1]
      };
    }
  }
}
marked.Lexer.rules.block.codetab = /:::(\w+)([\w\W]*?):::/

var ast = marked.lexer(`
:::codetab
  sdfsdfsdf
:::
`)

console.log(ast[0])
