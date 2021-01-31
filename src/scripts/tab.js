const Component = require('./component')
const { inheritPrototype, isDef, deepMerge, isObject } = require('./util')

module.exports = Tab

const TOGGLE_CLASS = 'tab_btn'
const CONTENT_CLASS = 'tab_content'
const HEADER_CLASS = 'tab_header'
const TOGGLE_ACTIVE_CLASS = 'tab_btn-active'
const CONTENT_ACTIVE_CLASS = 'tab_content-active'

/**
 * @class
 * @extends Component
 * @param {string} selector
 * @param {object} options
 */
function Tab (selector, options) {
  Component.call(this, 'tab', selector)
  this._options = {
    selectors: {
      toggles: '[data-toggle]',
      header: '[data-header]',
      contents: '[data-content]',
      activeToggle: '[data-toggle-active]'
    },
    useClasses: false,
    autoDataset: true
  }
  isObject(options) && deepMerge(this._options, options)
  this.init()
}

inheritPrototype(Tab, Component)

Tab.prototype.init = function () {
  this._prepare()

  // dom
  const dom = this._getDom()

  // add events
  dom.header.addEventListener('click', e => {
    const target = e.target

    // if toggle
    if (this._hasDataToggle(target)) {
      // if active
      if (this._isActiveToggle(target)) {
        return;
      }

      dom.toggles.forEach(t => {
        if (this._isActiveToggle(t)) {
          const c = this._findContentByToggle(t, dom.contents)
          this._removeActiveToggle(t)
          this._removeActiveContent(c)
        }
        if (target === t) {
          const c = this._findContentByToggle(t, dom.contents)
          this._setActiveToggle(t)
          this._setActiveContent(c)
        }
      })
    }
  })
}

Tab.prototype._hasDataToggle = t => isDef(t.dataset.toggle)

Tab.prototype._isActiveToggle = t => isDef(t.dataset.toggleActive)

Tab.prototype._findContentByToggle = function (t, contents) {
  if (!contents) {
    contents = this._getDom().contents
  }
  return contents.filter(c => c.dataset.name === t.dataset.for)[0]
}

Tab.prototype._setActiveToggle = t => {
  t.dataset.toggleActive = true
  t.classList.add(TOGGLE_ACTIVE_CLASS)
}

Tab.prototype._setActiveContent = c => {
  c.dataset.contentActive = true
  c.classList.add(CONTENT_ACTIVE_CLASS)
}

Tab.prototype._removeActiveToggle = t => {
  delete t.dataset.toggleActive
  t.classList.remove(TOGGLE_ACTIVE_CLASS)
}

Tab.prototype._removeActiveContent = c => {
  delete c.dataset.contentActive
  c.classList.remove(CONTENT_ACTIVE_CLASS)
}

Tab.prototype._getDom = function () {
  const root = this.get()
  const { selectors } = this._options
  return {
    root,
    toggles: this.getAll('toggles', selectors.toggles, root),
    header: this.get('header', selectors.header, root),
    contents: this.getAll('contents', selectors.contents, root)
  }
}

Tab.prototype._prepare = function () {
  let { selectors, useClasses, autoDataset } = this._options

  if (useClasses) {
    autoDataset = true
    selectors.toggles = '.' + TOGGLE_CLASS
    selectors.contents = '.' + CONTENT_CLASS
    selectors.header = '.' + HEADER_CLASS
    selectors.activeToggle = '.' + TOGGLE_ACTIVE_CLASS
  }

  const { root, contents, toggles, header } = this._getDom()
  let activeToggle = this.get(null, selectors.activeToggle, root)

  // prepare dataset
  if (autoDataset) {
    header.dataset.header = true

    toggles.forEach((t, i) => {
      if (!t.dataset.toggle) {
        t.dataset.toggle = true
      }
      if (!t.dataset.for) {
        t.dataset.for = i
        contents[i].dataset.name = i
      }
    })
  }

  // set active
  if (!activeToggle) {
    activeToggle = toggles[0]
  }
  this._setActiveToggle(activeToggle)

  const activeContent = this._findContentByToggle(activeToggle, contents)
  this._setActiveContent(activeContent)
}
