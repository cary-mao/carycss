const Component = require('./component')
const { inheritPrototype } = require('./util')

/**
 * @class
 * @extends Component
 * @param {string} selector
 */
function Tab (selector) {
  Component.call(this, 'tab', selector)
}

inheritPrototype(Tab, Component)

Tab.prototype.init = function () {
  const root = this.get()

}

