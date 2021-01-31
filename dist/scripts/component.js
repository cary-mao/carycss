var component = (function () {
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

	return component;

}());
