var tab = (function () {
	'use strict';

	/**
	 * @module global
	 * Include all global propterties
	 */
	var cache = true;

	var global = {
		cache: cache
	};

	function createCommonjsModule(fn) {
	  var module = { exports: {} };
		return fn(module, module.exports), module.exports;
	}

	var util = createCommonjsModule(function (module, exports) {
	exports.inherit = function (p) {
	  if (Object.create) {
	    const o = Object.create(p);
	    o.prototype = o.prototype || o.__proto__;
	    return o;
	  }

	  const Fn = function () {};

	  Fn.prototype = p;
	  return new Fn();
	};

	exports.inheritPrototype = function (Sub, Sup) {
	  const o = exports.inherit(Sup.prototype);
	  o.prototype.constructor = Sub;
	  Sub.prototype = o;
	};

	exports.isDef = function (v) {
	  return void 0 !== v;
	};

	exports.isObject = function (v) {
	  return v != null && typeof v === 'object' && Array.isArray(v) === false;
	};

	exports.deepMerge = function (target, source) {
	  for (let k in source) {
	    const v = source[k]; // avoid Object.create(null)

	    if (!source.hasOwnProperty || source.hasOwnProperty(k)) {
	      if (exports.isObject(v) && exports.isObject(target[k])) {
	        arguments.callee(target[k], source);
	      } else {
	        target[k] = v;
	      }
	    }
	  }

	  return target;
	};
	});

	// component id
	let id = 1;

	const {
	  cache: cache$1
	} = global;

	const {
	  isDef
	} = util;
	/**
	 * @exports Component
	 */


	var component = Component;
	/**
	 * @class
	 * @param {string} name component's name
	 * @param {string} selector selector of dom
	 */

	function Component(name, selector) {
	  if (!this instanceof Component) {
	    throw new Error(`[Component ${name}]: ${name} can be used as a constructor.`);
	  }

	  if (cache$1) {
	    this._caches = {};
	    this._cache = true;
	  }

	  this.name = name;
	  this.id = id++;
	  this.selector = selector;
	}

	Component.prototype._get = function (funName, name, selector, root) {
	  name = isDef(name) ? name : this.name;
	  selector = selector || this.selector;
	  root = root || document;
	  let ele = this._cache ? this.getCache(name) : null;
	  const fun = root[funName];

	  if (!ele) {
	    ele = fun.call(root, selector); // if name is truthy and cache is enabled, then ele will be cached

	    this._cache && name && this.cache(name, ele);
	  }

	  return ele;
	};
	/**
	 * @param {string} name
	 * @param {string} selector
	 * @param {Element} root
	 */


	Component.prototype.get = function (name, selector, root) {
	  return this._get('querySelector', name, selector, root);
	};

	Component.prototype.getAll = function (name, selector, root) {
	  return [].slice.call(this._get('querySelectorAll', name, selector, root));
	};

	Component.prototype.cache = function (name, ele) {
	  this._caches[name] = ele;
	};

	Component.prototype.getCache = function (name) {
	  return this._caches[name];
	};

	Component.prototype.toString = function () {
	  return `[Component ${this.name}]: ${this.id}`;
	};

	const {
	  inheritPrototype,
	  isDef: isDef$1,
	  deepMerge,
	  isObject
	} = util;

	var tab = Tab;
	const TOGGLE_CLASS = 'tab_btn';
	const CONTENT_CLASS = 'tab_content';
	const HEADER_CLASS = 'tab_header';
	const TOGGLE_ACTIVE_CLASS = 'tab_btn-active';
	const CONTENT_ACTIVE_CLASS = 'tab_content-active';
	/**
	 * @class
	 * @extends Component
	 * @param {string} selector
	 * @param {object} options
	 */

	function Tab(selector, options) {
	  component.call(this, 'tab', selector);
	  this._options = {
	    selectors: {
	      toggles: '[data-toggle]',
	      header: '[data-header]',
	      contents: '[data-content]',
	      activeToggle: '[data-toggle-active]'
	    },
	    useClasses: false,
	    autoDataset: true
	  };
	  isObject(options) && deepMerge(this._options, options);
	  this.init();
	}

	inheritPrototype(Tab, component);

	Tab.prototype.init = function () {
	  this._prepare(); // dom


	  const dom = this._getDom(); // add events


	  dom.header.addEventListener('click', e => {
	    const target = e.target; // if toggle

	    if (this._hasDataToggle(target)) {
	      // if active
	      if (this._isActiveToggle(target)) {
	        return;
	      }

	      dom.toggles.forEach(t => {
	        if (this._isActiveToggle(t)) {
	          const c = this._findContentByToggle(t, dom.contents);

	          this._removeActiveToggle(t);

	          this._removeActiveContent(c);
	        }

	        if (target === t) {
	          const c = this._findContentByToggle(t, dom.contents);

	          this._setActiveToggle(t);

	          this._setActiveContent(c);
	        }
	      });
	    }
	  });
	};

	Tab.prototype._hasDataToggle = t => isDef$1(t.dataset.toggle);

	Tab.prototype._isActiveToggle = t => isDef$1(t.dataset.toggleActive);

	Tab.prototype._findContentByToggle = function (t, contents) {
	  if (!contents) {
	    contents = this._getDom().contents;
	  }

	  return contents.filter(c => c.dataset.name === t.dataset.for)[0];
	};

	Tab.prototype._setActiveToggle = t => {
	  t.dataset.toggleActive = true;
	  t.classList.add(TOGGLE_ACTIVE_CLASS);
	};

	Tab.prototype._setActiveContent = c => {
	  c.dataset.contentActive = true;
	  c.classList.add(CONTENT_ACTIVE_CLASS);
	};

	Tab.prototype._removeActiveToggle = t => {
	  delete t.dataset.toggleActive;
	  t.classList.remove(TOGGLE_ACTIVE_CLASS);
	};

	Tab.prototype._removeActiveContent = c => {
	  delete c.dataset.contentActive;
	  c.classList.remove(CONTENT_ACTIVE_CLASS);
	};

	Tab.prototype._getDom = function () {
	  const root = this.get();
	  const {
	    selectors
	  } = this._options;
	  return {
	    root,
	    toggles: this.getAll('toggles', selectors.toggles, root),
	    header: this.get('header', selectors.header, root),
	    contents: this.getAll('contents', selectors.contents, root)
	  };
	};

	Tab.prototype._prepare = function () {
	  let {
	    selectors,
	    useClasses,
	    autoDataset
	  } = this._options;

	  if (useClasses) {
	    autoDataset = true;
	    selectors.toggles = '.' + TOGGLE_CLASS;
	    selectors.contents = '.' + CONTENT_CLASS;
	    selectors.header = '.' + HEADER_CLASS;
	    selectors.activeToggle = '.' + TOGGLE_ACTIVE_CLASS;
	  }

	  const {
	    root,
	    contents,
	    toggles,
	    header
	  } = this._getDom();

	  let activeToggle = this.get(null, selectors.activeToggle, root); // prepare dataset

	  if (autoDataset) {
	    header.dataset.header = true;
	    toggles.forEach((t, i) => {
	      if (!t.dataset.toggle) {
	        t.dataset.toggle = true;
	      }

	      if (!t.dataset.for) {
	        t.dataset.for = i;
	        contents[i].dataset.name = i;
	      }
	    });
	  } // set active


	  if (!activeToggle) {
	    activeToggle = toggles[0];
	  }

	  this._setActiveToggle(activeToggle);

	  const activeContent = this._findContentByToggle(activeToggle, contents);

	  this._setActiveContent(activeContent);
	};

	return tab;

}());
