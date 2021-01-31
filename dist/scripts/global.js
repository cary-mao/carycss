var global = (function (exports) {
	'use strict';

	/**
	 * @module global
	 * Include all global propterties
	 */
	var cache = true;

	var global = {
		cache: cache
	};

	exports.cache = cache;
	exports.default = global;

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

}({}));
