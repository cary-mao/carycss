const { parse } = require('./parse_code')

hexo.extend.filter.register('marked:renderer', function (renderer) {
  renderer.code = parse
})
