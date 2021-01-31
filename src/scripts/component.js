// component id
let id = 1

const { cache } = require('./global')

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

  if (this.cache) {
    this._caches = {}
    this._cache = true
  }

  this.name = name
  this.id = id++
  this.selector = selector
}

/**
 * @param {string} name
 * @param {string} selector
 * @param {Element} root
 */
Component.prototype.get = function (name, selector, root) {
  name = name || this.name
  selector = selector || this.selector
  root = root || document
  let ele = this._cache ? this.getCache(name) : null

  if (!ele) {
    ele = document.querySelector(selector)
    this._cache && this.cache(name, ele)
  }

  return ele
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
