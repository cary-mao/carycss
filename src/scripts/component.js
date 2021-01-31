// component id
let id = 1

const { cache } = require('./global')
const { isDef } = require('./util')

/**
 * @exports Component
 */
module.exports = Component

/**
 * @class
 * @param {string} name component's name
 * @param {string} selector selector of dom
 */
function Component (name, selector) {
  if (!this instanceof Component) {
    throw new Error(`[Component ${name}]: ${name} can be used as a constructor.`)
  }

  if (cache) {
    this._caches = {}
    this._cache = true
  }

  this.name = name
  this.id = id++
  this.selector = selector
}


Component.prototype._get = function (funName, name, selector, root) {
  name = isDef(name) ? name : this.name
  selector = selector || this.selector
  root = root || document
  let ele = this._cache ? this.getCache(name) : null
  const fun = root[funName]

  if (!ele) {
    ele = fun.call(root, selector)
    // if name is truthy and cache is enabled, then ele will be cached
    this._cache && name && this.cache(name, ele)
  }

  return ele
}

/**
 * @param {string} name
 * @param {string} selector
 * @param {Element} root
 */
Component.prototype.get = function (name, selector, root) {
  return this._get('querySelector', name, selector, root)
}

Component.prototype.getAll = function (name, selector, root) {
  return [].slice.call(this._get('querySelectorAll', name, selector, root))
}

Component.prototype.cache = function (name, ele) {
  this._caches[name] = ele
}

Component.prototype.getCache = function (name) {
  return this._caches[name]
}

Component.prototype.toString = function () {
  return `[Component ${this.name}]: ${this.id}`
}
