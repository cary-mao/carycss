exports.inherit = function (p) {
  if (Object.create) {
    return Object.create(p)
  }
  const Fn = function () {}
  Fn.prototype = p
  return new Fn()
}

exports.inheritPrototype = function (Sub, Sup) {
  const o = exports.inhert(Sup.prototype)
  o.prototype.constructor = Sub
  Sub.prototype = o
}

