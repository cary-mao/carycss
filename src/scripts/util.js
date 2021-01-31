exports.inherit = function (p) {
  if (Object.create) {
    const o = Object.create(p)
    o.prototype = o.prototype || o.__proto__
    return o
  }
  const Fn = function () {}
  Fn.prototype = p
  return new Fn()
}

exports.inheritPrototype = function (Sub, Sup) {
  const o = exports.inherit(Sup.prototype)
  o.prototype.constructor = Sub
  Sub.prototype = o
}

exports.isDef = function (v) {
  return void 0 !== v
}

exports.isObject = function (v) {
  return v != null && typeof v === 'object' && Array.isArray(v) === false
}

exports.deepMerge = function (target, source) {
  for (let k in source) {
    const v = source[k]
    // avoid Object.create(null)
    if (!source.hasOwnProperty || source.hasOwnProperty(k)) {
      if (exports.isObject(v) && exports.isObject(target[k])) {
        arguments.callee(target[k], source)
      } else {
        target[k] = v
      }
    }
  }
  return target
}
