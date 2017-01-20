/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _siftSdkWeb = __webpack_require__(1);
	
	var _chess = __webpack_require__(9);
	
	var _chess2 = _interopRequireDefault(_chess);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global ChessBoard */
	
	
	var DetailView = function (_SiftView) {
	  _inherits(DetailView, _SiftView);
	
	  function DetailView() {
	    _classCallCheck(this, DetailView);
	
	    var _this = _possibleConstructorReturn(this, (DetailView.__proto__ || Object.getPrototypeOf(DetailView)).call(this));
	
	    ['recalc', 'onDrop', 'onDragStart', 'onSnapEnd', 'resetPosition'].forEach(function (method) {
	      return _this[method] = _this[method].bind(_this);
	    });
	    _this.controller.subscribe('recalc', _this.recalc);
	    _this.game = new _chess2.default();
	    _this.plannedMove = document.getElementsByClassName('detail--planned')[0];
	    _this.resetButton = document.getElementsByClassName('detail--reset')[0];
	    _this.board = new ChessBoard('detail--board', {
	      draggable: true,
	      dropOffBoard: 'trash',
	      onDragStart: _this.onDragStart,
	      onDrop: _this.onDrop,
	      onSnapEnd: _this.onSnapEnd
	    });
	    _this.resetButton.onclick = _this.resetPosition;
	    return _this;
	  }
	
	  _createClass(DetailView, [{
	    key: 'presentView',
	    value: function presentView(got) {
	      this.updateView(got.data);
	    }
	  }, {
	    key: 'recalc',
	    value: function recalc(got) {
	      this.updateView(got);
	    }
	  }, {
	    key: 'updateView',
	    value: function updateView(position) {
	      if (position) {
	        this.startPosition = position;
	        this.resetPosition();
	      }
	    }
	  }, {
	    key: 'resetPosition',
	    value: function resetPosition() {
	      this.game.load(this.startPosition);
	      this.board.position(this.startPosition);
	      this.plannedMove.innerText = '';
	    }
	  }, {
	    key: 'onDragStart',
	    value: function onDragStart(_, piece) {
	      return !this.game.game_over() && piece.indexOf(this.game.turn()) > -1;
	    }
	  }, {
	    key: 'onDrop',
	    value: function onDrop(from, to) {
	      var move = this.game.move({ from: from, to: to, promotion: 'q' });
	      if (move === null) return 'snapback';
	      this.plannedMove.innerText = this.plannedMove.innerText === '' ? '[ ' + move.san + ' ]' : this.plannedMove.innerText;
	      return;
	    }
	  }, {
	    key: 'onSnapEnd',
	    value: function onSnapEnd() {
	      this.board.position(this.game.fen());
	    }
	  }]);
	
	  return DetailView;
	}(_siftSdkWeb.SiftView);
	
	exports.default = DetailView;
	
	
	(0, _siftSdkWeb.registerSiftView)(new DetailView(window));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(console, global) {(function (global, factory) {
	     true ? factory(exports) :
	    typeof define === 'function' && define.amd ? define(['exports'], factory) :
	    (factory((global.Redsift = global.Redsift || {})));
	}(this, (function (exports) {
	
	var EmailClientController = function EmailClientController() {
	  this._proxy = self;
	  this._registerMessageListeners();
	};
	
	EmailClientController.prototype._registerMessageListeners = function _registerMessageListeners () {
	    var this$1 = this;
	
	  if(!this._proxy) return;
	  this._proxy.onmessage = function (e) {
	    // console.log('[SiftController::onmessage]: ', e.data);
	    var method = e.data.method;
	    if (this$1['_' + method]) {
	      this$1['_' + method](e.data.params);
	    }
	    else {
	      // console.log('[EmailClientController::onmessage]: method not implemented: ', method);
	    }
	  };
	};
	
	EmailClientController.prototype._emailStats = function _emailStats (stats) {
	  if(this.onstats) {
	    this.onstats(stats.name, stats.value);
	  }
	};
	
	EmailClientController.prototype._getThreadRowDisplayInfo = function _getThreadRowDisplayInfo (params) {
	    var this$1 = this;
	
	  // console.log('[EmailClientController::_getThreadRowDisplayInfo]: ', params);
	  var trdis = {};
	  params.tris.forEach(function (thread) {
	    if (thread.value !== undefined && thread.value.list !== undefined && this$1.loadThreadListView) {
	      trdis[thread.key] = this$1.loadThreadListView(thread.value.list, params.supportedTemplates);
	    }
	  });
	  // Notify the client
	  this._proxy.postMessage({
	    method: 'getThreadRowDisplayInfoCallback',
	    params: trdis
	  });
	};
	
	/**
	 * Observable pattern implementation.
	 * Supports topics as String or an Array.
	 */
	var Observable = function Observable() {
	  this._observers = [];
	};
	
	Observable.prototype.subscribe = function subscribe (topic, observer) {
	  this._op('_sub', topic, observer);
	};
	
	Observable.prototype.unsubscribe = function unsubscribe (topic, observer) {
	  this._op('_unsub', topic, observer);
	};
	
	Observable.prototype.unsubscribeAll = function unsubscribeAll (topic) {
	  if (!this._observers[topic]) {
	    return;
	  }
	  delete this._observers[topic];
	};
	
	Observable.prototype.publish = function publish (topic, message) {
	  this._op('_pub', topic, message);
	};
	
	/**
	 * Internal methods
	 */
	Observable.prototype._op = function _op (op, topic, value) {
	    var this$1 = this;
	
	  if (Array.isArray(topic)) {
	    topic.forEach(function (t) {
	      this$1[op](t, value);
	    });
	  }
	  else {
	    this[op](topic, value);
	  }
	};
	
	Observable.prototype._sub = function _sub (topic, observer) {
	  this._observers[topic] || (this._observers[topic] = []);
	  if(observer && this._observers[topic].indexOf(observer) === -1) {
	    this._observers[topic].push(observer);
	  }
	};
	
	Observable.prototype._unsub = function _unsub (topic, observer) {
	  if (!this._observers[topic]) {
	    return;
	  }
	  var index = this._observers[topic].indexOf(observer);
	  if (~index) {
	    this._observers[topic].splice(index, 1);
	  }
	};
	
	Observable.prototype._pub = function _pub (topic, message) {
	    var this$1 = this;
	
	  if (!this._observers[topic]) {
	    return;
	  }
	  for (var i = this._observers[topic].length - 1; i >= 0; i--) {
	    this$1._observers[topic][i](message)
	  }
	};
	
	var SiftView = function SiftView() {
	  this._resizeHandler = null;
	  this._proxy = parent;
	  this.controller = new Observable();
	  this._registerMessageListeners();
	};
	
	SiftView.prototype.publish = function publish (topic, value) {
	 this._proxy.postMessage({
	    method: 'notifyController',
	    params: {
	      topic: topic,
	      value: value } },
	    '*');
	};
	
	SiftView.prototype._registerMessageListeners = function _registerMessageListeners () {
	    var this$1 = this;
	
	  window.addEventListener('message', function (e) {
	    var method = e.data.method;
	    var params = e.data.params;
	    if(method === 'notifyView') {
	      this$1.controller.publish(params.topic, params.value);
	    }
	    else if(this$1[method]) {
	      this$1[method](params);
	    }
	    else {
	      console.warn('[SiftView]: method not implemented: ', method);
	    }
	  }, false);
	};
	
	var EmailClient = (function (Observable) {
	  function EmailClient(proxy) {
	    Observable.call(this);
	    this._proxy = proxy;
	  }
	
	  if ( Observable ) EmailClient.__proto__ = Observable;
	  EmailClient.prototype = Object.create( Observable && Observable.prototype );
	  EmailClient.prototype.constructor = EmailClient;
	
	  EmailClient.prototype.goto = function goto (params) {
	    this._postMessage('goto', params);
	  };
	
	  EmailClient.prototype.close = function close () {
	    this._postMessage('close');
	  };
	
	  EmailClient.prototype._postMessage = function _postMessage (topic, value) {
	    this._proxy.postMessage({
	      method: 'notifyClient',
	      params: {
	        topic: topic,
	        value: value
	      }
	    });
	  };
	
	  return EmailClient;
	}(Observable));
	
	var SiftStorage = (function (Observable) {
	  function SiftStorage() {
	    Observable.call(this);
	    this._storage = null;
	  }
	
	  if ( Observable ) SiftStorage.__proto__ = Observable;
	  SiftStorage.prototype = Object.create( Observable && Observable.prototype );
	  SiftStorage.prototype.constructor = SiftStorage;
	
	  SiftStorage.prototype.init = function init (storage) {
	    this._storage = storage;
	  };
	
	  SiftStorage.prototype.get = function get (d) { return this._storage.get(d) };
	  SiftStorage.prototype.getIndexKeys = function getIndexKeys (d) { return this._storage.getIndexKeys(d) };
	  SiftStorage.prototype.getIndex = function getIndex (d) { return this._storage.getIndex(d) };
	  SiftStorage.prototype.getWithIndex = function getWithIndex (d) { return this._storage.getWithIndex(d) };
	  SiftStorage.prototype.getAllKeys = function getAllKeys (d) { return this._storage.getAllKeys(d) };
	  SiftStorage.prototype.getAll = function getAll (d) { return this._storage.getAll(d) };
	  SiftStorage.prototype.getUser = function getUser (d) { return this._storage.getUser(d) };
	  SiftStorage.prototype.putUser = function putUser (d) { return this._storage.putUser(d) };
	  SiftStorage.prototype.delUser = function delUser (d) { return this._storage.delUser(d) };
	
	  return SiftStorage;
	}(Observable));
	
	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {}
	
	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}
	
	var loglevel = createCommonjsModule(function (module) {
	/*
	* loglevel - https://github.com/pimterry/loglevel
	*
	* Copyright (c) 2013 Tim Perry
	* Licensed under the MIT license.
	*/
	(function (root, definition) {
	    "use strict";
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module === 'object' && module.exports) {
	        module.exports = definition();
	    } else {
	        root.log = definition();
	    }
	}(commonjsGlobal, function () {
	    "use strict";
	    var noop = function() {};
	    var undefinedType = "undefined";
	
	    function realMethod(methodName) {
	        if (typeof console === undefinedType) {
	            return false; // We can't build a real method without a console to log to
	        } else if (console[methodName] !== undefined) {
	            return bindMethod(console, methodName);
	        } else if (console.log !== undefined) {
	            return bindMethod(console, 'log');
	        } else {
	            return noop;
	        }
	    }
	
	    function bindMethod(obj, methodName) {
	        var method = obj[methodName];
	        if (typeof method.bind === 'function') {
	            return method.bind(obj);
	        } else {
	            try {
	                return Function.prototype.bind.call(method, obj);
	            } catch (e) {
	                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
	                return function() {
	                    return Function.prototype.apply.apply(method, [obj, arguments]);
	                };
	            }
	        }
	    }
	
	    // these private functions always need `this` to be set properly
	
	    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
	        return function () {
	            if (typeof console !== undefinedType) {
	                replaceLoggingMethods.call(this, level, loggerName);
	                this[methodName].apply(this, arguments);
	            }
	        };
	    }
	
	    function replaceLoggingMethods(level, loggerName) {
	        var this$1 = this;
	
	        /*jshint validthis:true */
	        for (var i = 0; i < logMethods.length; i++) {
	            var methodName = logMethods[i];
	            this$1[methodName] = (i < level) ?
	                noop :
	                this$1.methodFactory(methodName, level, loggerName);
	        }
	    }
	
	    function defaultMethodFactory(methodName, level, loggerName) {
	        /*jshint validthis:true */
	        return realMethod(methodName) ||
	               enableLoggingWhenConsoleArrives.apply(this, arguments);
	    }
	
	    var logMethods = [
	        "trace",
	        "debug",
	        "info",
	        "warn",
	        "error"
	    ];
	
	    function Logger(name, defaultLevel, factory) {
	      var self = this;
	      var currentLevel;
	      var storageKey = "loglevel";
	      if (name) {
	        storageKey += ":" + name;
	      }
	
	      function persistLevelIfPossible(levelNum) {
	          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();
	
	          // Use localStorage if available
	          try {
	              window.localStorage[storageKey] = levelName;
	              return;
	          } catch (ignore) {}
	
	          // Use session cookie as fallback
	          try {
	              window.document.cookie =
	                encodeURIComponent(storageKey) + "=" + levelName + ";";
	          } catch (ignore) {}
	      }
	
	      function getPersistedLevel() {
	          var storedLevel;
	
	          try {
	              storedLevel = window.localStorage[storageKey];
	          } catch (ignore) {}
	
	          if (typeof storedLevel === undefinedType) {
	              try {
	                  var cookie = window.document.cookie;
	                  var location = cookie.indexOf(
	                      encodeURIComponent(storageKey) + "=");
	                  if (location) {
	                      storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
	                  }
	              } catch (ignore) {}
	          }
	
	          // If the stored level is not valid, treat it as if nothing was stored.
	          if (self.levels[storedLevel] === undefined) {
	              storedLevel = undefined;
	          }
	
	          return storedLevel;
	      }
	
	      /*
	       *
	       * Public API
	       *
	       */
	
	      self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
	          "ERROR": 4, "SILENT": 5};
	
	      self.methodFactory = factory || defaultMethodFactory;
	
	      self.getLevel = function () {
	          return currentLevel;
	      };
	
	      self.setLevel = function (level, persist) {
	          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
	              level = self.levels[level.toUpperCase()];
	          }
	          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
	              currentLevel = level;
	              if (persist !== false) {  // defaults to true
	                  persistLevelIfPossible(level);
	              }
	              replaceLoggingMethods.call(self, level, name);
	              if (typeof console === undefinedType && level < self.levels.SILENT) {
	                  return "No console available for logging";
	              }
	          } else {
	              throw "log.setLevel() called with invalid level: " + level;
	          }
	      };
	
	      self.setDefaultLevel = function (level) {
	          if (!getPersistedLevel()) {
	              self.setLevel(level, false);
	          }
	      };
	
	      self.enableAll = function(persist) {
	          self.setLevel(self.levels.TRACE, persist);
	      };
	
	      self.disableAll = function(persist) {
	          self.setLevel(self.levels.SILENT, persist);
	      };
	
	      // Initialize with the right level
	      var initialLevel = getPersistedLevel();
	      if (initialLevel == null) {
	          initialLevel = defaultLevel == null ? "WARN" : defaultLevel;
	      }
	      self.setLevel(initialLevel, false);
	    }
	
	    /*
	     *
	     * Package-level API
	     *
	     */
	
	    var defaultLogger = new Logger();
	
	    var _loggersByName = {};
	    defaultLogger.getLogger = function getLogger(name) {
	        if (typeof name !== "string" || name === "") {
	          throw new TypeError("You must supply a name when creating a logger.");
	        }
	
	        var logger = _loggersByName[name];
	        if (!logger) {
	          logger = _loggersByName[name] = new Logger(
	            name, defaultLogger.getLevel(), defaultLogger.methodFactory);
	        }
	        return logger;
	    };
	
	    // Grab the current global log variable in case of overwrite
	    var _log = (typeof window !== undefinedType) ? window.log : undefined;
	    defaultLogger.noConflict = function() {
	        if (typeof window !== undefinedType &&
	               window.log === defaultLogger) {
	            window.log = _log;
	        }
	
	        return defaultLogger;
	    };
	
	    return defaultLogger;
	}));
	});
	
	var loglevel$1 = (loglevel && typeof loglevel === 'object' && 'default' in loglevel ? loglevel['default'] : loglevel);
	
	var index$2 = createCommonjsModule(function (module) {
	'use strict';
	var toString = Object.prototype.toString;
	
	module.exports = function (x) {
		var prototype;
		return toString.call(x) === '[object Object]' && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}));
	};
	});
	
	var require$$0$2 = (index$2 && typeof index$2 === 'object' && 'default' in index$2 ? index$2['default'] : index$2);
	
	var index$1 = createCommonjsModule(function (module, exports) {
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = range;
	
	var _isPlainObj = require$$0$2;
	
	var _isPlainObj2 = _interopRequireDefault(_isPlainObj);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Parse `opts` to valid IDBKeyRange.
	 * https://developer.mozilla.org/en-US/docs/Web/API/IDBKeyRange
	 *
	 * @param {Object} opts
	 * @return {IDBKeyRange}
	 */
	
	function range(opts) {
	  var IDBKeyRange = commonjsGlobal.IDBKeyRange || commonjsGlobal.webkitIDBKeyRange;
	  if (opts instanceof IDBKeyRange) return opts;
	  if (typeof opts === 'undefined' || opts === null) return null;
	  if (!(0, _isPlainObj2.default)(opts)) return IDBKeyRange.only(opts);
	  var keys = Object.keys(opts).sort();
	
	  if (keys.length === 1) {
	    var key = keys[0];
	    var val = opts[key];
	
	    switch (key) {
	      case 'eq':
	        return IDBKeyRange.only(val);
	      case 'gt':
	        return IDBKeyRange.lowerBound(val, true);
	      case 'lt':
	        return IDBKeyRange.upperBound(val, true);
	      case 'gte':
	        return IDBKeyRange.lowerBound(val);
	      case 'lte':
	        return IDBKeyRange.upperBound(val);
	      default:
	        throw new TypeError('"' + key + '" is not valid key');
	    }
	  } else {
	    var x = opts[keys[0]];
	    var y = opts[keys[1]];
	    var pattern = keys.join('-');
	
	    switch (pattern) {
	      case 'gt-lt':
	        return IDBKeyRange.bound(x, y, true, true);
	      case 'gt-lte':
	        return IDBKeyRange.bound(x, y, true, false);
	      case 'gte-lt':
	        return IDBKeyRange.bound(x, y, false, true);
	      case 'gte-lte':
	        return IDBKeyRange.bound(x, y, false, false);
	      default:
	        throw new TypeError('"' + pattern + '" are conflicted keys');
	    }
	  }
	}
	module.exports = exports['default'];
	});
	
	var require$$0$1 = (index$1 && typeof index$1 === 'object' && 'default' in index$1 ? index$1['default'] : index$1);
	
	var idbIndex = createCommonjsModule(function (module) {
	var parseRange = require$$0$1;
	
	/**
	 * Expose `Index`.
	 */
	
	module.exports = Index;
	
	/**
	 * Initialize new `Index`.
	 *
	 * @param {Store} store
	 * @param {String} name
	 * @param {String|Array} field
	 * @param {Object} opts { unique: false, multi: false }
	 */
	
	function Index(store, name, field, opts) {
	  this.store = store;
	  this.name = name;
	  this.field = field;
	  this.opts = opts;
	  this.multi = opts.multi || opts.multiEntry || false;
	  this.unique = opts.unique || false;
	}
	
	/**
	 * Get `key`.
	 *
	 * @param {Object|IDBKeyRange} key
	 * @param {Function} cb
	 */
	
	Index.prototype.get = function(key, cb) {
	  var result = [];
	  var isUnique = this.unique;
	  var opts = { range: key, iterator: iterator };
	
	  this.cursor(opts, function(err) {
	    if (err) return cb(err);
	    isUnique ? cb(null, result[0]) : cb(null, result);
	  });
	
	  function iterator(cursor) {
	    result.push(cursor.value);
	    cursor.continue();
	  }
	};
	
	/**
	 * Count records by `key`.
	 *
	 * @param {String|IDBKeyRange} key
	 * @param {Function} cb
	 */
	
	Index.prototype.count = function(key, cb) {
	  var name = this.store.name;
	  var indexName = this.name;
	
	  this.store.db.transaction('readonly', [name], function(err, tr) {
	    if (err) return cb(err);
	    var index = tr.objectStore(name).index(indexName);
	    var req = index.count(parseRange(key));
	    req.onerror = cb;
	    req.onsuccess = function onsuccess(e) { cb(null, e.target.result) };
	  });
	};
	
	/**
	 * Create cursor.
	 * Proxy to `this.store` for convinience.
	 *
	 * @param {Object} opts
	 * @param {Function} cb
	 */
	
	Index.prototype.cursor = function(opts, cb) {
	  opts.index = this.name;
	  this.store.cursor(opts, cb);
	};
	});
	
	var require$$0 = (idbIndex && typeof idbIndex === 'object' && 'default' in idbIndex ? idbIndex['default'] : idbIndex);
	
	var index$3 = createCommonjsModule(function (module) {
	/**
	 * toString ref.
	 */
	
	var toString = Object.prototype.toString;
	
	/**
	 * Return the type of `val`.
	 *
	 * @param {Mixed} val
	 * @return {String}
	 * @api public
	 */
	
	module.exports = function(val){
	  switch (toString.call(val)) {
	    case '[object Date]': return 'date';
	    case '[object RegExp]': return 'regexp';
	    case '[object Arguments]': return 'arguments';
	    case '[object Array]': return 'array';
	    case '[object Error]': return 'error';
	  }
	
	  if (val === null) return 'null';
	  if (val === undefined) return 'undefined';
	  if (val !== val) return 'nan';
	  if (val && val.nodeType === 1) return 'element';
	
	  val = val.valueOf
	    ? val.valueOf()
	    : Object.prototype.valueOf.apply(val)
	
	  return typeof val;
	};
	});
	
	var require$$2 = (index$3 && typeof index$3 === 'object' && 'default' in index$3 ? index$3['default'] : index$3);
	
	var idbStore = createCommonjsModule(function (module) {
	var type = require$$2;
	var parseRange = require$$0$1;
	
	/**
	 * Expose `Store`.
	 */
	
	module.exports = Store;
	
	/**
	 * Initialize new `Store`.
	 *
	 * @param {String} name
	 * @param {Object} opts
	 */
	
	function Store(name, opts) {
	  this.db = null;
	  this.name = name;
	  this.indexes = {};
	  this.opts = opts;
	  this.key = opts.key || opts.keyPath || undefined;
	  this.increment = opts.increment || opts.autoIncretement || undefined;
	}
	
	/**
	 * Get index by `name`.
	 *
	 * @param {String} name
	 * @return {Index}
	 */
	
	Store.prototype.index = function(name) {
	  return this.indexes[name];
	};
	
	/**
	 * Put (create or replace) `key` to `val`.
	 *
	 * @param {String|Object} [key] is optional when store.key exists.
	 * @param {Any} val
	 * @param {Function} cb
	 */
	
	Store.prototype.put = function(key, val, cb) {
	  var name = this.name;
	  var keyPath = this.key;
	  if (keyPath) {
	    if (type(key) == 'object') {
	      cb = val;
	      val = key;
	      key = null;
	    } else {
	      val[keyPath] = key;
	    }
	  }
	
	  this.db.transaction('readwrite', [name], function(err, tr) {
	    if (err) return cb(err);
	    var objectStore = tr.objectStore(name);
	    var req = keyPath ? objectStore.put(val) : objectStore.put(val, key);
	    tr.onerror = tr.onabort = req.onerror = cb;
	    tr.oncomplete = function oncomplete() { cb(null, req.result) };
	  });
	};
	
	/**
	 * Get `key`.
	 *
	 * @param {String} key
	 * @param {Function} cb
	 */
	
	Store.prototype.get = function(key, cb) {
	  var name = this.name;
	  this.db.transaction('readonly', [name], function(err, tr) {
	    if (err) return cb(err);
	    var objectStore = tr.objectStore(name);
	    var req = objectStore.get(key);
	    req.onerror = cb;
	    req.onsuccess = function onsuccess(e) { cb(null, e.target.result) };
	  });
	};
	
	/**
	 * Del `key`.
	 *
	 * @param {String} key
	 * @param {Function} cb
	 */
	
	Store.prototype.del = function(key, cb) {
	  var name = this.name;
	  this.db.transaction('readwrite', [name], function(err, tr) {
	    if (err) return cb(err);
	    var objectStore = tr.objectStore(name);
	    var req = objectStore.delete(key);
	    tr.onerror = tr.onabort = req.onerror = cb;
	    tr.oncomplete = function oncomplete() { cb() };
	  });
	};
	
	/**
	 * Count.
	 *
	 * @param {Function} cb
	 */
	
	Store.prototype.count = function(cb) {
	  var name = this.name;
	  this.db.transaction('readonly', [name], function(err, tr) {
	    if (err) return cb(err);
	    var objectStore = tr.objectStore(name);
	    var req = objectStore.count();
	    req.onerror = cb;
	    req.onsuccess = function onsuccess(e) { cb(null, e.target.result) };
	  });
	};
	
	/**
	 * Clear.
	 *
	 * @param {Function} cb
	 */
	
	Store.prototype.clear = function(cb) {
	  var name = this.name;
	  this.db.transaction('readwrite', [name], function(err, tr) {
	    if (err) return cb(err);
	    var objectStore = tr.objectStore(name);
	    var req = objectStore.clear();
	    tr.onerror = tr.onabort = req.onerror = cb;
	    tr.oncomplete = function oncomplete() { cb() };
	  });
	};
	
	/**
	 * Perform batch operation.
	 *
	 * @param {Object} vals
	 * @param {Function} cb
	 */
	
	Store.prototype.batch = function(vals, cb) {
	  var name = this.name;
	  var keyPath = this.key;
	  var keys = Object.keys(vals);
	
	  this.db.transaction('readwrite', [name], function(err, tr) {
	    if (err) return cb(err);
	    var store = tr.objectStore(name);
	    var current = 0;
	    tr.onerror = tr.onabort = cb;
	    tr.oncomplete = function oncomplete() { cb() };
	    next();
	
	    function next() {
	      if (current >= keys.length) return;
	      var currentKey = keys[current];
	      var currentVal = vals[currentKey];
	      var req;
	
	      if (currentVal === null) {
	        req = store.delete(currentKey);
	      } else if (keyPath) {
	        if (!currentVal[keyPath]) currentVal[keyPath] = currentKey;
	        req = store.put(currentVal);
	      } else {
	        req = store.put(currentVal, currentKey);
	      }
	
	      req.onerror = cb;
	      req.onsuccess = next;
	      current += 1;
	    }
	  });
	};
	
	/**
	 * Get all.
	 *
	 * @param {Function} cb
	 */
	
	Store.prototype.all = function(cb) {
	  var result = [];
	
	  this.cursor({ iterator: iterator }, function(err) {
	    err ? cb(err) : cb(null, result);
	  });
	
	  function iterator(cursor) {
	    result.push(cursor.value);
	    cursor.continue();
	  }
	};
	
	/**
	 * Create read cursor for specific `range`,
	 * and pass IDBCursor to `iterator` function.
	 * https://developer.mozilla.org/en-US/docs/Web/API/IDBCursor
	 *
	 * @param {Object} opts:
	 *   {IDBRange|Object} range - passes to .openCursor()
	 *   {Function} iterator - function to call with IDBCursor
	 *   {String} [index] - name of index to start cursor by index
	 * @param {Function} cb - calls on end or error
	 */
	
	Store.prototype.cursor = function(opts, cb) {
	  var name = this.name;
	  this.db.transaction('readonly', [name], function(err, tr) {
	    if (err) return cb(err);
	    var store = opts.index
	      ? tr.objectStore(name).index(opts.index)
	      : tr.objectStore(name);
	    var req = store.openCursor(parseRange(opts.range));
	
	    req.onerror = cb;
	    req.onsuccess = function onsuccess(e) {
	      var cursor = e.target.result;
	      cursor ? opts.iterator(cursor) : cb();
	    };
	  });
	};
	});
	
	var require$$1 = (idbStore && typeof idbStore === 'object' && 'default' in idbStore ? idbStore['default'] : idbStore);
	
	var schema$1 = createCommonjsModule(function (module) {
	var type = require$$2;
	var Store = require$$1;
	var Index = require$$0;
	
	/**
	 * Expose `Schema`.
	 */
	
	module.exports = Schema;
	
	/**
	 * Initialize new `Schema`.
	 */
	
	function Schema() {
	  if (!(this instanceof Schema)) return new Schema();
	  this._stores = {};
	  this._current = {};
	  this._versions = {};
	}
	
	/**
	 * Set new version.
	 *
	 * @param {Number} version
	 * @return {Schema}
	 */
	
	Schema.prototype.version = function(version) {
	  if (type(version) != 'number' || version < 1 || version < this.getVersion())
	    throw new TypeError('not valid version');
	
	  this._current = { version: version, store: null };
	  this._versions[version] = {
	    stores: [],      // db.createObjectStore
	    dropStores: [],  // db.deleteObjectStore
	    indexes: [],     // store.createIndex
	    dropIndexes: [], // store.deleteIndex
	    version: version // version
	  };
	
	  return this;
	};
	
	/**
	 * Add store.
	 *
	 * @param {String} name
	 * @param {Object} [opts] { key: false }
	 * @return {Schema}
	 */
	
	Schema.prototype.addStore = function(name, opts) {
	  if (type(name) != 'string') throw new TypeError('`name` is required');
	  if (this._stores[name]) throw new TypeError('store is already defined');
	  var store = new Store(name, opts || {});
	  this._stores[name] = store;
	  this._versions[this.getVersion()].stores.push(store);
	  this._current.store = store;
	  return this;
	};
	
	/**
	 * Drop store.
	 *
	 * @param {String} name
	 * @return {Schema}
	 */
	
	Schema.prototype.dropStore = function(name) {
	  if (type(name) != 'string') throw new TypeError('`name` is required');
	  var store = this._stores[name];
	  if (!store) throw new TypeError('store is not defined');
	  delete this._stores[name];
	  this._versions[this.getVersion()].dropStores.push(store);
	  return this;
	};
	
	/**
	 * Add index.
	 *
	 * @param {String} name
	 * @param {String|Array} field
	 * @param {Object} [opts] { unique: false, multi: false }
	 * @return {Schema}
	 */
	
	Schema.prototype.addIndex = function(name, field, opts) {
	  if (type(name) != 'string') throw new TypeError('`name` is required');
	  if (type(field) != 'string' && type(field) != 'array') throw new TypeError('`field` is required');
	  var store = this._current.store;
	  if (store.indexes[name]) throw new TypeError('index is already defined');
	  var index = new Index(store, name, field, opts || {});
	  store.indexes[name] = index;
	  this._versions[this.getVersion()].indexes.push(index);
	  return this;
	};
	
	/**
	 * Drop index.
	 *
	 * @param {String} name
	 * @return {Schema}
	 */
	
	Schema.prototype.dropIndex = function(name) {
	  if (type(name) != 'string') throw new TypeError('`name` is required');
	  var index = this._current.store.indexes[name];
	  if (!index) throw new TypeError('index is not defined');
	  delete this._current.store.indexes[name];
	  this._versions[this.getVersion()].dropIndexes.push(index);
	  return this;
	};
	
	/**
	 * Change current store.
	 *
	 * @param {String} name
	 * @return {Schema}
	 */
	
	Schema.prototype.getStore = function(name) {
	  if (type(name) != 'string') throw new TypeError('`name` is required');
	  if (!this._stores[name]) throw new TypeError('store is not defined');
	  this._current.store = this._stores[name];
	  return this;
	};
	
	/**
	 * Get version.
	 *
	 * @return {Number}
	 */
	
	Schema.prototype.getVersion = function() {
	  return this._current.version;
	};
	
	/**
	 * Generate onupgradeneeded callback.
	 *
	 * @return {Function}
	 */
	
	Schema.prototype.callback = function() {
	  var versions = Object.keys(this._versions)
	    .map(function(v) { return this._versions[v] }, this)
	    .sort(function(a, b) { return a.version - b.version });
	
	  return function onupgradeneeded(e) {
	    var db = e.target.result;
	    var tr = e.target.transaction;
	
	    versions.forEach(function(versionSchema) {
	      if (e.oldVersion >= versionSchema.version) return;
	
	      versionSchema.stores.forEach(function(s) {
	        var options = {};
	
	        // Only pass the options that are explicitly specified to createObjectStore() otherwise IE/Edge
	        // can throw an InvalidAccessError - see https://msdn.microsoft.com/en-us/library/hh772493(v=vs.85).aspx
	        if (typeof s.key !== 'undefined') options.keyPath = s.key;
	        if (typeof s.increment !== 'undefined') options.autoIncrement = s.increment;
	
	        db.createObjectStore(s.name, options);
	      });
	
	      versionSchema.dropStores.forEach(function(s) {
	        db.deleteObjectStore(s.name);
	      });
	
	      versionSchema.indexes.forEach(function(i) {
	        var store = tr.objectStore(i.store.name);
	        store.createIndex(i.name, i.field, {
	          unique: i.unique,
	          multiEntry: i.multi
	        });
	      });
	
	      versionSchema.dropIndexes.forEach(function(i) {
	        var store = tr.objectStore(i.store.name);
	        store.deleteIndex(i.name);
	      });
	    });
	  };
	};
	});
	
	var require$$2$1 = (schema$1 && typeof schema$1 === 'object' && 'default' in schema$1 ? schema$1['default'] : schema$1);
	
	var index = createCommonjsModule(function (module, exports) {
	var type = require$$2;
	var Schema = require$$2$1;
	var Store = require$$1;
	var Index = require$$0;
	
	/**
	 * Expose `Treo`.
	 */
	
	exports = module.exports = Treo;
	
	/**
	 * Initialize new `Treo` instance.
	 *
	 * @param {String} name
	 * @param {Schema} schema
	 */
	
	function Treo(name, schema) {
	  if (!(this instanceof Treo)) return new Treo(name, schema);
	  if (type(name) != 'string') throw new TypeError('`name` required');
	  if (!(schema instanceof Schema)) throw new TypeError('not valid schema');
	
	  this.name = name;
	  this.status = 'close';
	  this.origin = null;
	  this.stores = schema._stores;
	  this.version = schema.getVersion();
	  this.onupgradeneeded = schema.callback();
	
	  // assign db property to each store
	  Object.keys(this.stores).forEach(function(storeName) {
	    this.stores[storeName].db = this;
	  }, this);
	}
	
	/**
	 * Expose core classes.
	 */
	
	exports.schema = Schema;
	exports.cmp = cmp;
	exports.Treo = Treo;
	exports.Schema = Schema;
	exports.Store = Store;
	exports.Index = Index;
	
	/**
	 * Use plugin `fn`.
	 *
	 * @param {Function} fn
	 * @return {Treo}
	 */
	
	Treo.prototype.use = function(fn) {
	  fn(this, exports);
	  return this;
	};
	
	/**
	 * Drop.
	 *
	 * @param {Function} cb
	 */
	
	Treo.prototype.drop = function(cb) {
	  var name = this.name;
	  this.close(function(err) {
	    if (err) return cb(err);
	    var req = indexedDB().deleteDatabase(name);
	    req.onerror = cb;
	    req.onsuccess = function onsuccess() { cb() };
	  });
	};
	
	/**
	 * Close.
	 *
	 * @param {Function} cb
	 */
	
	Treo.prototype.close = function(cb) {
	  if (this.status == 'close') return cb();
	  this.getInstance(function(err, db) {
	    if (err) return cb(err);
	    db.origin = null;
	    db.status = 'close';
	    db.close();
	    cb();
	  });
	};
	
	/**
	 * Get store by `name`.
	 *
	 * @param {String} name
	 * @return {Store}
	 */
	
	Treo.prototype.store = function(name) {
	  return this.stores[name];
	};
	
	/**
	 * Get db instance. It starts opening transaction only once,
	 * another requests will be scheduled to queue.
	 *
	 * @param {Function} cb
	 */
	
	Treo.prototype.getInstance = function(cb) {
	  if (this.status == 'open') return cb(null, this.origin);
	  if (this.status == 'opening') return this.queue.push(cb);
	
	  this.status = 'opening';
	  this.queue = [cb]; // queue callbacks
	
	  var that = this;
	  var req = indexedDB().open(this.name, this.version);
	  req.onupgradeneeded = this.onupgradeneeded;
	
	  req.onerror = req.onblocked = function onerror(e) {
	    that.status = 'error';
	    that.queue.forEach(function(cb) { cb(e) });
	    delete that.queue;
	  };
	
	  req.onsuccess = function onsuccess(e) {
	    that.origin = e.target.result;
	    that.status = 'open';
	    that.origin.onversionchange = function onversionchange() {
	      that.close(function() {});
	    };
	    that.queue.forEach(function(cb) { cb(null, that.origin) });
	    delete that.queue;
	  };
	};
	
	/**
	 * Create new transaction for selected `stores`.
	 *
	 * @param {String} type (readwrite|readonly)
	 * @param {Array} stores - follow indexeddb semantic
	 * @param {Function} cb
	 */
	
	Treo.prototype.transaction = function(type, stores, cb) {
	  this.getInstance(function(err, db) {
	    err ? cb(err) : cb(null, db.transaction(stores, type));
	  });
	};
	
	/**
	 * Compare 2 values using IndexedDB comparision algotihm.
	 *
	 * @param {Mixed} value1
	 * @param {Mixed} value2
	 * @return {Number} -1|0|1
	 */
	
	function cmp() {
	  return indexedDB().cmp.apply(indexedDB(), arguments);
	}
	
	/**
	 * Dynamic link to `global.indexedDB` for polyfills support.
	 *
	 * @return {IDBDatabase}
	 */
	
	function indexedDB() {
	  return commonjsGlobal._indexedDB
	    || commonjsGlobal.indexedDB
	    || commonjsGlobal.msIndexedDB
	    || commonjsGlobal.mozIndexedDB
	    || commonjsGlobal.webkitIndexedDB;
	}
	});
	
	var treo = (index && typeof index === 'object' && 'default' in index ? index['default'] : index);
	
	var logger = loglevel$1.getLogger('RSStorage:operations');
	logger.setLevel('warn');
	
	// Email msg buckets
	var EMAIL_BUCKETS = ['_email.id', '_email.tid'];
	// Message Db schema
	var MSG_DB_VERSIONED_SCHEMA = [
	  // version 1
	  [
	    { name: '_id.list', indexes: ['sift.guid'] },
	    { name: '_tid.list', indexes: ['sift.guid'] }
	  ],
	  // version 2
	  [
	    { name: '_email.id', indexes: ['sift.guid'] },
	    { name: '_email.tid', indexes: ['sift.guid'] },
	    { name: '_id.list', drop: true },
	    { name: '_tid.list', drop: true }
	  ]
	];
	// Sync DB schema
	var SYNC_DB_SCHEMA = [
	  { name: 'events', indexes: ['value.sift.guid'] },
	  { name: 'admin' }];
	// Client DB schema
	var CLIENT_DB_SCHEMA = [
	  { name: 'tour'},
	  { name: 'spm' },
	  { name: 'auth' }];
	
	/*****************************************************************
	 * Operations (alphabetically ordered)
	 *****************************************************************/
	// Create Db
	function opCreateDb(dbInfo) {
	  logger.trace('[opCreateDb]: ', dbInfo);
	  var dbs = {};
	  switch (dbInfo.type) {
	    case 'MSG':
	      dbs.msg = treo('rs_msg_db-' + dbInfo.accountGuid, _getVersionedTreoSchema(MSG_DB_VERSIONED_SCHEMA));
	      break;
	    case 'SIFT':
	      if (!dbInfo.siftGuid) {
	        throw new Error('[opCreateDb]: dbInfo.siftGuid undefined');
	      }
	      logger.trace('[opCreateDb]: creating SIFT db');
	      var schema = _getTreoSchema(dbInfo.schema, true);
	      // Add user and redsift stores to sift db.
	      schema = schema.addStore('_user.default').addStore('_redsift');
	      dbs.db = treo(dbInfo.siftGuid + '-' + dbInfo.accountGuid, schema);
	      dbs.msg = treo('rs_msg_db-' + dbInfo.accountGuid, _getVersionedTreoSchema(MSG_DB_VERSIONED_SCHEMA));
	      break;
	    case 'SYNC':
	      logger.trace('[opCreateDb]: creating SYNC db');
	      dbs.db = treo('rs_sync_log-' + dbInfo.accountGuid, _getTreoSchema(SYNC_DB_SCHEMA));
	      break;
	    case 'CLIENT':
	      dbs.db = treo('rs_client_db-' + dbInfo.clientName, _getTreoSchema(CLIENT_DB_SCHEMA));
	      break;
	    default:
	      throw new Error('[opCreateDb]: unsupported db type: ' + dbInfo.type);
	  }
	  return dbs;
	}
	
	// Del
	function opDel(dbs, params, siftGuid) {
	  logger.trace('[opDel]: ', params, siftGuid);
	  if (!params.bucket) {
	    return Promise.reject('[opDel]: params.bucket undefined');
	  }
	  if (!params.keys || params.keys.length === 0) {
	    logger.trace('[opDel]: params.keys undefined');
	    return Promise.resolve();
	  }
	  if (EMAIL_BUCKETS.indexOf(params.bucket) !== -1) {
	    var keys = params.keys.map(function (k) {
	      return siftGuid + '/' + k;
	    });
	    return _batchDelete(dbs.msg, { bucket: params.bucket, keys: keys });
	  }
	  return _batchDelete(dbs.db, params);
	}
	
	// Get
	function opGet(dbs, params, siftGuid) {
	  logger.trace('[opGet]: ', params);
	  if (!params.bucket) {
	    return Promise.reject('[opGet]: params.bucket undefined');
	  }
	  if (!params.keys || params.keys.length === 0) {
	    return Promise.reject('[opGet]: param.keys undefined');
	  }
	  if (EMAIL_BUCKETS.indexOf(params.bucket) !== -1) {
	    var keys = params.keys.map(function (k) {
	      return siftGuid + '/' + k;
	    });
	    return _findIn(dbs.msg, { bucket: params.bucket, keys: keys }).then(function (result) {
	      return result.map(function (r) {
	        return { key: r.key.split('/')[1], value: r.value };
	      });
	    });
	  }
	  return _findIn(dbs.db, params);
	}
	
	// Get All
	function opGetAll(dbs, params, siftGuid) {
	  logger.trace('[opGetAll]: ', params, siftGuid);
	  if (!params.bucket) {
	    return Promise.reject('[opGetAll]: params.bucket undefined');
	  }
	  if (EMAIL_BUCKETS.indexOf(params.bucket) !== -1) {
	    return _getAll(dbs.msg, { bucket: params.bucket, index: 'sift.guid', range: siftGuid }, true)
	      .then(function (result) { return result.map(function (r) { return ({ key: r.key.split('/')[1], value: r.value }); }); }
	      );
	  }
	  return _getAll(dbs.db, params, true);
	}
	
	// Get All Keys
	function opGetAllKeys(dbs, params, siftGuid) {
	  logger.trace('[opGetAllKeys]: ', params, siftGuid);
	  if (!params.bucket) {
	    return Promise.reject('[opGetAllKeys]: params.bucket undefined');
	  }
	  if (EMAIL_BUCKETS.indexOf(params.bucket) !== -1) {
	    return _getAll(dbs.msg, { bucket: params.bucket, index: 'sift.guid', range: siftGuid }, false)
	      .then(function (result) { return result.map(function (r) { return r.key.split('/')[1]; }); });
	  }
	  return _getAll(dbs.db, params, false);
	}
	
	// Get Index
	function opGetIndex(dbs, params, siftGuid) {
	  logger.trace('[opGetIndex]: ', params, siftGuid);
	  if (!params.bucket) {
	    return Promise.reject('[opGetIndex]:params.bucket undefined');
	  }
	  if (EMAIL_BUCKETS.indexOf(params.bucket) !== -1) {
	    return _getAll(dbs.msg, { bucket: params.bucket, index: 'sift.guid', range: siftGuid }, true).then(function (result) {
	      return result.map(function (r) {
	        return { key: r.key.split('/')[1], value: r.value };
	      });
	    });
	  }
	  if (!params.index) {
	    return Promise.reject('[opGetIndex]:params.index undefined');
	  }
	  return _getAll(dbs.db, params, true);
	}
	
	// Get Index Keys
	function opGetIndexKeys(dbs, params, siftGuid) {
	  logger.trace('[opGetIndexKeys]: ', params, siftGuid);
	  if (!params.bucket) {
	    return Promise.reject('[opGetIndexKeys]: params.bucket undefined');
	  }
	  if (EMAIL_BUCKETS.indexOf(params.bucket) !== -1) {
	    return _getAll(dbs.msg, { bucket: params.bucket, index: 'sift.guid', range: siftGuid }, false).then(function (result) {
	      return result.map(function (r) {
	        return { key: r.key.split('/')[1], value: r.value };
	      });
	    });
	  }
	  if (!params.index) {
	    return Promise.reject('[opGetIndexKeys]: params.index undefined');
	  }
	  return _getAll(dbs.db, params, false);
	}
	
	// Get With Index
	function opGetWithIndex(dbs, params, siftGuid) {
	  logger.trace('[opGetWithIndex]: ', params, siftGuid);
	  if (!params.bucket) {
	    return Promise.reject('[opGetWithIndex]:params.bucket undefined');
	  }
	  if (!params.keys) {
	    return Promise.reject('[opGetWithIndex]:params.keys undefined');
	  }
	  if (EMAIL_BUCKETS.indexOf(params.bucket) !== -1) {
	    var keys = params.keys.map(function (k) {
	      return siftGuid + '/' + k;
	    });
	    return _getWithIndexRange(dbs.msg, { bucket: params.bucket, keys: keys, index: 'sift.guid', range: siftGuid }).then(function (result) {
	      return result.map(function (r) {
	        return { key: r.key.split('/')[1], value: r.value };
	      });
	    });
	  }
	  if (!params.index) {
	    return Promise.reject('[opGetWithIndex]:params.index undefined');
	  }
	  if (!params.range) {
	    return Promise.reject('[opGetWithIndex]:params.range undefined');
	  }
	  return _getWithIndexRange(dbs.db, params);
	}
	
	// Put
	function opPut(dbs, params, raw, siftGuid) {
	  logger.trace('[opPut]: ', params, raw, siftGuid);
	  var db = dbs.db;
	  if (!params.bucket) {
	    return Promise.reject('[opPut]: params.bucket undefined');
	  }
	  if (!params.kvs || params.kvs.length === 0) {
	    logger.warn('[opPut]: params.kvs undefined');
	    return Promise.resolve();
	  }
	  var kvs = params.kvs;
	  if (!raw) {
	    // Wrap value into a {value: object}
	    kvs = kvs.map(function (kv) {
	      return { key: kv.key, value: { value: kv.value } };
	    });
	  }
	  if (EMAIL_BUCKETS.indexOf(params.bucket) !== -1) {
	    db = dbs.msg;
	    var kvs = kvs.map(function (kv) {
	      return { key: siftGuid + '/' + kv.key, value: kv.value };
	    });
	  }
	  return _batchPut(db, { bucket: params.bucket, kvs: kvs }, raw);
	}
	
	/*****************************************************************
	 * Internal functions
	 *****************************************************************/
	
	// define db schema
	function _getTreoSchema(stores, sift) {
	  logger.trace('[_getTreoSchema]: ', stores, sift);
	  var schema = treo.schema().version(1);
	  stores.forEach(function (os) {
	    if (!(sift && (EMAIL_BUCKETS.indexOf(os.name) !== -1))) {
	      if (os.keypath) {
	        schema = schema.addStore(os.name, { key: os.keypath });
	      }
	      else {
	        schema = schema.addStore(os.name);
	      }
	      if (os.indexes) {
	        os.indexes.forEach(function (idx) {
	          schema = schema.addIndex(idx, idx, { unique: false });
	        });
	      }
	    }
	  });
	  return schema;
	}
	
	// versioned db schema
	function _getVersionedTreoSchema(versions, sift) {
	  logger.trace('[_getVersionedTreoSchema]: ', versions, sift);
	  var schema = treo.schema();
	  versions.forEach(function (stores, i) {
	    schema = schema.version(i + 1);
	    stores.forEach(function (os) {
	      if (!(sift && (EMAIL_BUCKETS.indexOf(os.name) !== -1))) {
	        if (os.drop) {
	          logger.trace('[_getVersionedTreoSchema]: dropping store: ', os.name);
	          schema = schema.dropStore(os.name);
	        }
	        else if (os.keypath) {
	          schema = schema.addStore(os.name, { key: os.keypath });
	        }
	        else {
	          schema = schema.addStore(os.name);
	        }
	        if (os.indexes) {
	          os.indexes.forEach(function (idx) {
	            if (os.drop) {
	              logger.trace('[_getVersionedTreoSchema]: dropping store/index: ' + os.name + '/' + idx);
	              schema = schema.dropIndex(idx);
	            }
	            else {
	              schema = schema.addIndex(idx, idx, { unique: false });
	            }
	          });
	        }
	      }
	    });
	  });
	  return schema;
	}
	
	// Batch deletion supports numeric keys
	function _batchDelete(db, params) {
	  logger.trace('[_batchDelete]: ', params);
	  return new Promise(function (resolve, reject) {
	    db.transaction('readwrite', [params.bucket], function (err, tr) {
	      if (err) { return reject(err); }
	      var store = tr.objectStore(params.bucket);
	      var current = 0;
	      var next = function () {
	        if (current >= params.keys.length) { return; }
	        var currentKey = params.keys[current];
	        var req;
	        req = store.delete(currentKey);
	        req.onerror = reject;
	        req.onsuccess = next;
	        current += 1;
	      };
	      tr.onerror = tr.onabort = reject;
	      tr.oncomplete = function () { resolve(); };
	      next();
	    });
	  });
	}
	
	function _batchPut(db, params) {
	  logger.trace('[_batchPut]: ', params);
	  return new Promise(function (resolve, reject) {
	    var count = params.kvs.length;
	    db.transaction('readwrite', [params.bucket], function (err, tr) {
	      if (err) { return reject(err); }
	      var store = tr.objectStore(params.bucket);
	      var current = 0;
	      var next = function () {
	        if (current >= count) { return; }
	        logger.trace('[_batchPut: put: ', params.kvs[current]);
	        var req;
	        req = store.put(params.kvs[current].value, params.kvs[current].key);
	        req.onerror = reject;
	        req.onsuccess = next;
	        current += 1;
	      };
	      tr.onerror = tr.onabort = reject;
	      tr.oncomplete = function () { resolve(); };
	      next();
	    });
	  });
	}
	
	function _getWithIndexRange(db, params) {
	  logger.trace('[_getWithIndexRange]: ', params);
	  return new Promise(function (resolve, reject) {
	    var store = db.store(params.bucket);
	    var result = [];
	    var found = 0;
	    var iterator = function (cursor) {
	      var ki = params.keys.indexOf(cursor.primaryKey);
	      if (ki !== -1) {
	        logger.trace('[found key: ', cursor.primaryKey);
	        result[ki].value = cursor.value.value;
	        found++;
	      }
	      if (found === params.keys.length) {
	        return done();
	      }
	      cursor.continue();
	    };
	    var done = function (err) {
	      logger.trace('[_getWithIndexRange: result: ', result);
	      err ? reject(err) : resolve(result);
	    };
	    params.keys.forEach(function (k) {
	      result.push({ key: k, value: undefined });
	    });
	    store.cursor({ index: params.index, range: params.range, iterator: iterator }, done);
	  });
	}
	
	function _findIn(db, params) {
	  logger.trace('[_findIn]: ', params);
	  return new Promise(function (resolve, reject) {
	    var store = db.store(params.bucket);
	    var result = [];
	    var current = 0;
	    var iterator = function (cursor) {
	      logger.trace('[_findIn]: iterator: ', cursor);
	      if (cursor.key > sKeys[current]) {
	        logger.trace('[_findIn]: cursor ahead: ', cursor.key, sKeys[current]);
	        while (cursor.key > sKeys[current] && current < sKeys.length) {
	          current += 1;
	          logger.trace('[_findIn]: moving to next key: ', cursor.key, sKeys[current]);
	        }
	        if (current > sKeys.length) {
	          logger.trace('[_findIn]: exhausted keys. done.');
	          return done();
	        }
	      }
	      if (cursor.key === sKeys[current]) {
	        logger.trace('[_findIn]: found key: ', cursor.key, cursor.value);
	        result[params.keys.indexOf(sKeys[current])] = { key: cursor.key, value: cursor.value.value };
	        current += 1;
	        (current < sKeys.length) ? cursor.continue(sKeys[current]) : done();
	      }
	      else {
	        logger.trace('[_findIn]: continuing to next key: ', sKeys[current]);
	        cursor.continue(sKeys[current]); // go to next key
	      }
	    };
	    var done = function (err) {
	      logger.trace('[findIn]: result: ', result);
	      err ? reject(err) : resolve(result);
	    };
	    var sKeys = params.keys.slice();
	    sKeys = sKeys.sort(treo.cmp);
	    logger.trace('[findIn: sorted keys: ', sKeys);
	    params.keys.forEach(function (k) {
	      result.push({ key: k, value: undefined });
	    });
	    store.cursor({ iterator: iterator }, done);
	  });
	}
	
	function _getAll(db, params, loadValue) {
	  logger.trace('[_getAll]: ', params, loadValue);
	  return new Promise(function (resolve, reject) {
	    var result = [];
	    var keys = [];
	    var store = db.store(params.bucket);
	    var iterator = function (cursor) {
	      var kv = { key: cursor.primaryKey };
	      logger.trace('[_getAll]: cursor', cursor);
	      if (loadValue) {
	        kv.value = cursor.value.value;
	      }
	      if (params.index) {
	        kv.index = cursor.key;
	      }
	      result.push(kv);
	      keys.push(cursor.primaryKey);
	      cursor.continue();
	    };
	    var opts = { iterator: iterator };
	    if (params.index) {
	      opts.index = params.index;
	    }
	    if (params.range) {
	      opts.range = params.range;
	    }
	    store.cursor(opts, function (err) {
	      if (err) {
	        reject(err);
	      }
	      else {
	        if (!params.index && !params.range && !loadValue) {
	          logger.trace('[_getAll]: resolving: ', keys);
	          resolve(keys);
	        }
	        else {
	          logger.trace('[_getAll]: resolving: ', result);
	          resolve(result);
	        }
	      }
	    });
	  });
	}
	
	/**
	 * Redsift SDK. Sift Storage module.
	 * Based on APIs from https://github.com/CrowdProcess/riak-pb
	 *
	 * Copyright (c) 2016 Redsift Limited. All rights reserved.
	 */
	var _siftGuid = new WeakMap();
	var _dbs = new WeakMap();
	
	var Storage = function Storage(dbInfo, ll) {
	  this._logger = loglevel$1.getLogger('RSStorage');
	  this._logger.setLevel(ll || 'warn');
	  if (!dbInfo.accountGuid) {
	    throw new Error('[Storage]: dbInfo.accountGuid undefined');
	  }
	  _siftGuid.set(this, dbInfo.siftGuid);
	  _dbs.set(this, opCreateDb(dbInfo));
	};
	
	/*****************************************************************
	 * External Operations
	 *****************************************************************/
	Storage.prototype.get = function get (params) {
	  this._logger.trace('[Storage::get]: ', params);
	  return opGet(_dbs.get(this), params, _siftGuid.get(this));
	};
	
	Storage.prototype.getAll = function getAll (params) {
	  this._logger.trace('[Storage::getAll]: ', params);
	  return opGetAll(_dbs.get(this), params, _siftGuid.get(this));
	};
	
	Storage.prototype.getAllKeys = function getAllKeys (params) {
	  this._logger.trace('[Storage::getAllKeys]: ', params);
	  return opGetAllKeys(_dbs.get(this), params, _siftGuid.get(this))
	};
	
	Storage.prototype.getIndex = function getIndex (params) {
	  this._logger.trace('[Storage::getIndex]: ', params);
	  return opGetIndex(_dbs.get(this), params, _siftGuid.get(this));
	};
	
	Storage.prototype.getIndexKeys = function getIndexKeys (params) {
	  this._logger.trace('[Storage::getIndexKeys]: ', params);
	  return opGetIndexKeys(_dbs.get(this), params, _siftGuid.get(this));
	};
	
	Storage.prototype.getWithIndex = function getWithIndex (params) {
	  this._logger.trace('[Storage::getWithIndex]: ', params);
	  return opGetWithIndex(_dbs.get(this), params, _siftGuid.get(this));
	};
	
	///////////////////////////////////////////////////////////////////////////////////////////////
	// Sift-only operations
	///////////////////////////////////////////////////////////////////////////////////////////////
	Storage.prototype.delUser = function delUser (params) {
	  params.bucket = '_user.default';
	  this._logger.trace('[Storage::delUser]: ', params);
	  return opDel(_dbs.get(this), params, _siftGuid.get(this));
	};
	
	Storage.prototype.getUser = function getUser (params) {
	  params.bucket = '_user.default';
	  this._logger.trace('[Storage::getUser]: ', params);
	  return opGet(_dbs.get(this), params, _siftGuid.get(this));
	};
	
	Storage.prototype.putUser = function putUser (params) {
	  params.bucket = '_user.default';
	  this._logger.trace('[Storage::putUser]: ', params);
	  if (!params.kvs || params.kvs.length === 0) {
	    return Promise.reject('[Storage::putUser]: params.kvs undefined');
	  }
	  return opPut(_dbs.get(this), params, false, _siftGuid.get(this));
	};
	
	var SiftController = function SiftController() {
	  this._proxy = self;
	  this.view = new Observable();
	  this.emailclient = new EmailClient(self);
	  this._registerMessageListeners();
	};
	
	SiftController.prototype.publish = function publish (topic, value) {
	  this._proxy.postMessage({
	    method: 'notifyView',
	    params: {
	      topic: topic,
	      value: value
	    }
	  });
	};
	
	SiftController.prototype._registerMessageListeners = function _registerMessageListeners () {
	    var this$1 = this;
	
	  if (!this._proxy) return;
	  this._proxy.onmessage = function (e) {
	    // console.log('[SiftController::onmessage]: ', e.data);
	    var method = e.data.method;
	    if (this$1['_' + method]) {
	      this$1['_' + method](e.data.params);
	    }
	    else {
	      // console.log('[SiftController:onmessage]: method not implemented: ', method);
	    }
	  };
	};
	
	SiftController.prototype._init = function _init (params) {
	  // console.log('[SiftController::_init]: ', params);
	  this.storage = new SiftStorage();
	  this.storage.init(
	    new Storage({
	      type: 'SIFT',
	      siftGuid: params.siftGuid,
	      accountGuid: params.accountGuid,
	      schema: params.dbSchema
	    })
	  );
	  // Initialise sift details
	  this._guid = params.siftGuid;
	  this._account = params.accountGuid;
	  // Init is done, post a message to the iframe_controller
	  this._proxy.postMessage({
	    method: 'initCallback',
	    result: params
	  });
	};
	
	SiftController.prototype._terminate = function _terminate () {
	  if (!this._proxy) return;
	  // console.log('[SiftController::_terminate]');
	  this._proxy.close();
	};
	
	SiftController.prototype._postCallback = function _postCallback (params, _result) {
	  this._proxy.postMessage({
	    method: 'loadViewCallback',
	    params: {
	      user: { guid: this._account },
	      sift: { guid: this._guid },
	      type: params.type,
	      sizeClass: params.sizeClass,
	      result: _result
	    }
	  });
	};
	
	SiftController.prototype._loadView = function _loadView (params) {
	    var this$1 = this;
	
	  // console.log('[SiftController::_loadView]: ', params);
	  if (!this.loadView) {
	    console.error('[SiftController::_loadView]: Sift controller must implement the loadView method');
	    return;
	  }
	  // Invoke loadView method
	  var result = this.loadView({
	    sizeClass: params.sizeClass,
	    type: params.type,
	    params: params.data
	  });
	  // console.log('[SiftController::_loadView] loadView result: ', result);
	  if (result.data && 'function' === typeof result.data.then) {
	    if (result.html) {
	      this._postCallback(params, { html: result.html });
	    }
	    result.data.then(function (data) {
	      this$1._postCallback(params, { html: result.html, data: data });
	    }).catch(function (error) {
	      console.error('[SiftController::loadView]: promise rejected: ', error);
	    });
	  }
	  else {
	    this._postCallback(params, result);
	  }
	};
	
	SiftController.prototype._storageUpdated = function _storageUpdated (params) {
	    var this$1 = this;
	
	  // console.log('[SiftController::_storageUpdated]: ', params);
	  // Notify the * listeners
	  this.storage.publish('*', params);
	  params.forEach(function (b) {
	    // Notify the bucket listeners.
	    // TODO: send the list of keys instead of "[b]"
	    this$1.storage.publish(b, [b]);
	  });
	};
	
	SiftController.prototype._notifyController = function _notifyController (params) {
	  // console.log('[SiftController::_notifyController]: ', params);
	  this.view.publish(params.topic, params.value);
	};
	
	SiftController.prototype._emailComposer = function _emailComposer (params) {
	  // console.log('[SiftController::_emailComposer]: ', params);
	  this.emailclient.publish(params.topic, params.value);
	};
	
	/**
	 * SiftView
	 */
	function registerSiftView(siftView) {
	  console.log('[Redsift::registerSiftView]: registered');
	}
	
	function createSiftView(instanceMethods) {
	  return _create(SiftView, instanceMethods);
	}
	
	/**
	 * SiftController
	 */
	function createSiftController(instanceMethods) {
	  return _create(SiftController, instanceMethods);
	}
	
	function registerSiftController(siftController) {
	  console.log('[Redsift::registerSiftController]: registered');
	}
	
	/**
	 * EmailClientController
	 */
	function createEmailClientController(instanceMethods) {
	  return _create(EmailClientController, instanceMethods);
	}
	
	function registerEmailClientController(emailClientController) {
	  console.log('[Redsift::registerEmailClientController]: registered');
	}
	
	/**
	 * Local functions
	 */
	function _create(Base, methods) {
	  var Creature = function() {
	    Base.call(this);
	    if(this.init && typeof this.init === 'function') {
	      this.init();
	    }
	  };
	  Creature.prototype = Object.create(Base.prototype);
	  Creature.constructor = Creature;
	  Object.keys(methods).forEach(function (method) {
	    Creature.prototype[method] = methods[method];
	  });
	  return new Creature();
	}
	
	exports.EmailClientController = EmailClientController;
	exports.SiftController = SiftController;
	exports.SiftStorage = SiftStorage;
	exports.SiftView = SiftView;
	exports.registerSiftView = registerSiftView;
	exports.createSiftView = createSiftView;
	exports.createSiftController = createSiftController;
	exports.registerSiftController = registerSiftController;
	exports.createEmailClientController = createEmailClientController;
	exports.registerEmailClientController = registerEmailClientController;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*global window, global*/
	var util = __webpack_require__(3)
	var assert = __webpack_require__(7)
	var now = __webpack_require__(8)
	
	var slice = Array.prototype.slice
	var console
	var times = {}
	
	if (typeof global !== "undefined" && global.console) {
	    console = global.console
	} else if (typeof window !== "undefined" && window.console) {
	    console = window.console
	} else {
	    console = {}
	}
	
	var functions = [
	    [log, "log"],
	    [info, "info"],
	    [warn, "warn"],
	    [error, "error"],
	    [time, "time"],
	    [timeEnd, "timeEnd"],
	    [trace, "trace"],
	    [dir, "dir"],
	    [consoleAssert, "assert"]
	]
	
	for (var i = 0; i < functions.length; i++) {
	    var tuple = functions[i]
	    var f = tuple[0]
	    var name = tuple[1]
	
	    if (!console[name]) {
	        console[name] = f
	    }
	}
	
	module.exports = console
	
	function log() {}
	
	function info() {
	    console.log.apply(console, arguments)
	}
	
	function warn() {
	    console.log.apply(console, arguments)
	}
	
	function error() {
	    console.warn.apply(console, arguments)
	}
	
	function time(label) {
	    times[label] = now()
	}
	
	function timeEnd(label) {
	    var time = times[label]
	    if (!time) {
	        throw new Error("No such label: " + label)
	    }
	
	    var duration = now() - time
	    console.log(label + ": " + duration + "ms")
	}
	
	function trace() {
	    var err = new Error()
	    err.name = "Trace"
	    err.message = util.format.apply(null, arguments)
	    console.error(err.stack)
	}
	
	function dir(object) {
	    console.log(util.inspect(object) + "\n")
	}
	
	function consoleAssert(expression) {
	    if (!expression) {
	        var arr = slice.call(arguments, 1)
	        assert.ok(false, util.format.apply(null, arr))
	    }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process, console) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }
	
	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};
	
	
	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }
	
	  if (process.noDeprecation === true) {
	    return fn;
	  }
	
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	};
	
	
	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};
	
	
	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;
	
	
	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};
	
	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};
	
	
	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];
	
	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}
	
	
	function stylizeNoColor(str, styleType) {
	  return str;
	}
	
	
	function arrayToHash(array) {
	  var hash = {};
	
	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });
	
	  return hash;
	}
	
	
	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }
	
	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }
	
	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);
	
	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }
	
	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }
	
	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }
	
	  var base = '', array = false, braces = ['{', '}'];
	
	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }
	
	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }
	
	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }
	
	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }
	
	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }
	
	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }
	
	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }
	
	  ctx.seen.push(value);
	
	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }
	
	  ctx.seen.pop();
	
	  return reduceToSingleString(output, base, braces);
	}
	
	
	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}
	
	
	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}
	
	
	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}
	
	
	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }
	
	  return name + ': ' + str;
	}
	
	
	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);
	
	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }
	
	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}
	
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	exports.isBuffer = __webpack_require__(5);
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	
	
	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}
	
	
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];
	
	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}
	
	
	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};
	
	
	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(6);
	
	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;
	
	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};
	
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(4), __webpack_require__(2)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
	// original notice:
	
	/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	function compare(a, b) {
	  if (a === b) {
	    return 0;
	  }
	
	  var x = a.length;
	  var y = b.length;
	
	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break;
	    }
	  }
	
	  if (x < y) {
	    return -1;
	  }
	  if (y < x) {
	    return 1;
	  }
	  return 0;
	}
	function isBuffer(b) {
	  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
	    return global.Buffer.isBuffer(b);
	  }
	  return !!(b != null && b._isBuffer);
	}
	
	// based on node assert, original notice:
	
	// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
	//
	// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
	//
	// Originally from narwhal.js (http://narwhaljs.org)
	// Copyright (c) 2009 Thomas Robinson <280north.com>
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the 'Software'), to
	// deal in the Software without restriction, including without limitation the
	// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
	// sell copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var util = __webpack_require__(3);
	var hasOwn = Object.prototype.hasOwnProperty;
	var pSlice = Array.prototype.slice;
	var functionsHaveNames = (function () {
	  return function foo() {}.name === 'foo';
	}());
	function pToString (obj) {
	  return Object.prototype.toString.call(obj);
	}
	function isView(arrbuf) {
	  if (isBuffer(arrbuf)) {
	    return false;
	  }
	  if (typeof global.ArrayBuffer !== 'function') {
	    return false;
	  }
	  if (typeof ArrayBuffer.isView === 'function') {
	    return ArrayBuffer.isView(arrbuf);
	  }
	  if (!arrbuf) {
	    return false;
	  }
	  if (arrbuf instanceof DataView) {
	    return true;
	  }
	  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
	    return true;
	  }
	  return false;
	}
	// 1. The assert module provides functions that throw
	// AssertionError's when particular conditions are not met. The
	// assert module must conform to the following interface.
	
	var assert = module.exports = ok;
	
	// 2. The AssertionError is defined in assert.
	// new assert.AssertionError({ message: message,
	//                             actual: actual,
	//                             expected: expected })
	
	var regex = /\s*function\s+([^\(\s]*)\s*/;
	// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
	function getName(func) {
	  if (!util.isFunction(func)) {
	    return;
	  }
	  if (functionsHaveNames) {
	    return func.name;
	  }
	  var str = func.toString();
	  var match = str.match(regex);
	  return match && match[1];
	}
	assert.AssertionError = function AssertionError(options) {
	  this.name = 'AssertionError';
	  this.actual = options.actual;
	  this.expected = options.expected;
	  this.operator = options.operator;
	  if (options.message) {
	    this.message = options.message;
	    this.generatedMessage = false;
	  } else {
	    this.message = getMessage(this);
	    this.generatedMessage = true;
	  }
	  var stackStartFunction = options.stackStartFunction || fail;
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, stackStartFunction);
	  } else {
	    // non v8 browsers so we can have a stacktrace
	    var err = new Error();
	    if (err.stack) {
	      var out = err.stack;
	
	      // try to strip useless frames
	      var fn_name = getName(stackStartFunction);
	      var idx = out.indexOf('\n' + fn_name);
	      if (idx >= 0) {
	        // once we have located the function frame
	        // we need to strip out everything before it (and its line)
	        var next_line = out.indexOf('\n', idx + 1);
	        out = out.substring(next_line + 1);
	      }
	
	      this.stack = out;
	    }
	  }
	};
	
	// assert.AssertionError instanceof Error
	util.inherits(assert.AssertionError, Error);
	
	function truncate(s, n) {
	  if (typeof s === 'string') {
	    return s.length < n ? s : s.slice(0, n);
	  } else {
	    return s;
	  }
	}
	function inspect(something) {
	  if (functionsHaveNames || !util.isFunction(something)) {
	    return util.inspect(something);
	  }
	  var rawname = getName(something);
	  var name = rawname ? ': ' + rawname : '';
	  return '[Function' +  name + ']';
	}
	function getMessage(self) {
	  return truncate(inspect(self.actual), 128) + ' ' +
	         self.operator + ' ' +
	         truncate(inspect(self.expected), 128);
	}
	
	// At present only the three keys mentioned above are used and
	// understood by the spec. Implementations or sub modules can pass
	// other keys to the AssertionError's constructor - they will be
	// ignored.
	
	// 3. All of the following functions must throw an AssertionError
	// when a corresponding condition is not met, with a message that
	// may be undefined if not provided.  All assertion methods provide
	// both the actual and expected values to the assertion error for
	// display purposes.
	
	function fail(actual, expected, message, operator, stackStartFunction) {
	  throw new assert.AssertionError({
	    message: message,
	    actual: actual,
	    expected: expected,
	    operator: operator,
	    stackStartFunction: stackStartFunction
	  });
	}
	
	// EXTENSION! allows for well behaved errors defined elsewhere.
	assert.fail = fail;
	
	// 4. Pure assertion tests whether a value is truthy, as determined
	// by !!guard.
	// assert.ok(guard, message_opt);
	// This statement is equivalent to assert.equal(true, !!guard,
	// message_opt);. To test strictly for the value true, use
	// assert.strictEqual(true, guard, message_opt);.
	
	function ok(value, message) {
	  if (!value) fail(value, true, message, '==', assert.ok);
	}
	assert.ok = ok;
	
	// 5. The equality assertion tests shallow, coercive equality with
	// ==.
	// assert.equal(actual, expected, message_opt);
	
	assert.equal = function equal(actual, expected, message) {
	  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
	};
	
	// 6. The non-equality assertion tests for whether two objects are not equal
	// with != assert.notEqual(actual, expected, message_opt);
	
	assert.notEqual = function notEqual(actual, expected, message) {
	  if (actual == expected) {
	    fail(actual, expected, message, '!=', assert.notEqual);
	  }
	};
	
	// 7. The equivalence assertion tests a deep equality relation.
	// assert.deepEqual(actual, expected, message_opt);
	
	assert.deepEqual = function deepEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
	  }
	};
	
	assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
	  }
	};
	
	function _deepEqual(actual, expected, strict, memos) {
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	  } else if (isBuffer(actual) && isBuffer(expected)) {
	    return compare(actual, expected) === 0;
	
	  // 7.2. If the expected value is a Date object, the actual value is
	  // equivalent if it is also a Date object that refers to the same time.
	  } else if (util.isDate(actual) && util.isDate(expected)) {
	    return actual.getTime() === expected.getTime();
	
	  // 7.3 If the expected value is a RegExp object, the actual value is
	  // equivalent if it is also a RegExp object with the same source and
	  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
	  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
	    return actual.source === expected.source &&
	           actual.global === expected.global &&
	           actual.multiline === expected.multiline &&
	           actual.lastIndex === expected.lastIndex &&
	           actual.ignoreCase === expected.ignoreCase;
	
	  // 7.4. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if ((actual === null || typeof actual !== 'object') &&
	             (expected === null || typeof expected !== 'object')) {
	    return strict ? actual === expected : actual == expected;
	
	  // If both values are instances of typed arrays, wrap their underlying
	  // ArrayBuffers in a Buffer each to increase performance
	  // This optimization requires the arrays to have the same type as checked by
	  // Object.prototype.toString (aka pToString). Never perform binary
	  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
	  // bit patterns are not identical.
	  } else if (isView(actual) && isView(expected) &&
	             pToString(actual) === pToString(expected) &&
	             !(actual instanceof Float32Array ||
	               actual instanceof Float64Array)) {
	    return compare(new Uint8Array(actual.buffer),
	                   new Uint8Array(expected.buffer)) === 0;
	
	  // 7.5 For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else if (isBuffer(actual) !== isBuffer(expected)) {
	    return false;
	  } else {
	    memos = memos || {actual: [], expected: []};
	
	    var actualIndex = memos.actual.indexOf(actual);
	    if (actualIndex !== -1) {
	      if (actualIndex === memos.expected.indexOf(expected)) {
	        return true;
	      }
	    }
	
	    memos.actual.push(actual);
	    memos.expected.push(expected);
	
	    return objEquiv(actual, expected, strict, memos);
	  }
	}
	
	function isArguments(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	}
	
	function objEquiv(a, b, strict, actualVisitedObjects) {
	  if (a === null || a === undefined || b === null || b === undefined)
	    return false;
	  // if one is a primitive, the other must be same
	  if (util.isPrimitive(a) || util.isPrimitive(b))
	    return a === b;
	  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
	    return false;
	  var aIsArgs = isArguments(a);
	  var bIsArgs = isArguments(b);
	  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
	    return false;
	  if (aIsArgs) {
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return _deepEqual(a, b, strict);
	  }
	  var ka = objectKeys(a);
	  var kb = objectKeys(b);
	  var key, i;
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length !== kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] !== kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
	      return false;
	  }
	  return true;
	}
	
	// 8. The non-equivalence assertion tests for any deep inequality.
	// assert.notDeepEqual(actual, expected, message_opt);
	
	assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
	  }
	};
	
	assert.notDeepStrictEqual = notDeepStrictEqual;
	function notDeepStrictEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
	  }
	}
	
	
	// 9. The strict equality assertion tests strict equality, as determined by ===.
	// assert.strictEqual(actual, expected, message_opt);
	
	assert.strictEqual = function strictEqual(actual, expected, message) {
	  if (actual !== expected) {
	    fail(actual, expected, message, '===', assert.strictEqual);
	  }
	};
	
	// 10. The strict non-equality assertion tests for strict inequality, as
	// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);
	
	assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
	  if (actual === expected) {
	    fail(actual, expected, message, '!==', assert.notStrictEqual);
	  }
	};
	
	function expectedException(actual, expected) {
	  if (!actual || !expected) {
	    return false;
	  }
	
	  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
	    return expected.test(actual);
	  }
	
	  try {
	    if (actual instanceof expected) {
	      return true;
	    }
	  } catch (e) {
	    // Ignore.  The instanceof check doesn't work for arrow functions.
	  }
	
	  if (Error.isPrototypeOf(expected)) {
	    return false;
	  }
	
	  return expected.call({}, actual) === true;
	}
	
	function _tryBlock(block) {
	  var error;
	  try {
	    block();
	  } catch (e) {
	    error = e;
	  }
	  return error;
	}
	
	function _throws(shouldThrow, block, expected, message) {
	  var actual;
	
	  if (typeof block !== 'function') {
	    throw new TypeError('"block" argument must be a function');
	  }
	
	  if (typeof expected === 'string') {
	    message = expected;
	    expected = null;
	  }
	
	  actual = _tryBlock(block);
	
	  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
	            (message ? ' ' + message : '.');
	
	  if (shouldThrow && !actual) {
	    fail(actual, expected, 'Missing expected exception' + message);
	  }
	
	  var userProvidedMessage = typeof message === 'string';
	  var isUnwantedException = !shouldThrow && util.isError(actual);
	  var isUnexpectedException = !shouldThrow && actual && !expected;
	
	  if ((isUnwantedException &&
	      userProvidedMessage &&
	      expectedException(actual, expected)) ||
	      isUnexpectedException) {
	    fail(actual, expected, 'Got unwanted exception' + message);
	  }
	
	  if ((shouldThrow && actual && expected &&
	      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
	    throw actual;
	  }
	}
	
	// 11. Expected to throw an error:
	// assert.throws(block, Error_opt, message_opt);
	
	assert.throws = function(block, /*optional*/error, /*optional*/message) {
	  _throws(true, block, error, message);
	};
	
	// EXTENSION! This is annoying to write outside this module.
	assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
	  _throws(false, block, error, message);
	};
	
	assert.ifError = function(err) { if (err) throw err; };
	
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) {
	    if (hasOwn.call(obj, key)) keys.push(key);
	  }
	  return keys;
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = now
	
	function now() {
	    return new Date().getTime()
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*
	 * Copyright (c) 2016, Jeff Hlywa (jhlywa@gmail.com)
	 * All rights reserved.
	 *
	 * Redistribution and use in source and binary forms, with or without
	 * modification, are permitted provided that the following conditions are met:
	 *
	 * 1. Redistributions of source code must retain the above copyright notice,
	 *    this list of conditions and the following disclaimer.
	 * 2. Redistributions in binary form must reproduce the above copyright notice,
	 *    this list of conditions and the following disclaimer in the documentation
	 *    and/or other materials provided with the distribution.
	 *
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
	 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
	 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
	 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
	 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
	 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
	 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
	 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
	 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
	 * POSSIBILITY OF SUCH DAMAGE.
	 *
	 *----------------------------------------------------------------------------*/
	
	/* minified license below  */
	
	/* @license
	 * Copyright (c) 2016, Jeff Hlywa (jhlywa@gmail.com)
	 * Released under the BSD license
	 * https://github.com/jhlywa/chess.js/blob/master/LICENSE
	 */
	
	var Chess = function(fen) {
	
	  /* jshint indent: false */
	
	  var BLACK = 'b';
	  var WHITE = 'w';
	
	  var EMPTY = -1;
	
	  var PAWN = 'p';
	  var KNIGHT = 'n';
	  var BISHOP = 'b';
	  var ROOK = 'r';
	  var QUEEN = 'q';
	  var KING = 'k';
	
	  var SYMBOLS = 'pnbrqkPNBRQK';
	
	  var DEFAULT_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
	
	  var POSSIBLE_RESULTS = ['1-0', '0-1', '1/2-1/2', '*'];
	
	  var PAWN_OFFSETS = {
	    b: [16, 32, 17, 15],
	    w: [-16, -32, -17, -15]
	  };
	
	  var PIECE_OFFSETS = {
	    n: [-18, -33, -31, -14,  18, 33, 31,  14],
	    b: [-17, -15,  17,  15],
	    r: [-16,   1,  16,  -1],
	    q: [-17, -16, -15,   1,  17, 16, 15,  -1],
	    k: [-17, -16, -15,   1,  17, 16, 15,  -1]
	  };
	
	  var ATTACKS = [
	    20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20, 0,
	     0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
	     0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
	     0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
	     0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
	     0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
	     0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
	    24,24,24,24,24,24,56,  0, 56,24,24,24,24,24,24, 0,
	     0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
	     0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
	     0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
	     0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
	     0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
	     0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
	    20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20
	  ];
	
	  var RAYS = [
	     17,  0,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0,  0, 15, 0,
	      0, 17,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0, 15,  0, 0,
	      0,  0, 17,  0,  0,  0,  0, 16,  0,  0,  0,  0, 15,  0,  0, 0,
	      0,  0,  0, 17,  0,  0,  0, 16,  0,  0,  0, 15,  0,  0,  0, 0,
	      0,  0,  0,  0, 17,  0,  0, 16,  0,  0, 15,  0,  0,  0,  0, 0,
	      0,  0,  0,  0,  0, 17,  0, 16,  0, 15,  0,  0,  0,  0,  0, 0,
	      0,  0,  0,  0,  0,  0, 17, 16, 15,  0,  0,  0,  0,  0,  0, 0,
	      1,  1,  1,  1,  1,  1,  1,  0, -1, -1,  -1,-1, -1, -1, -1, 0,
	      0,  0,  0,  0,  0,  0,-15,-16,-17,  0,  0,  0,  0,  0,  0, 0,
	      0,  0,  0,  0,  0,-15,  0,-16,  0,-17,  0,  0,  0,  0,  0, 0,
	      0,  0,  0,  0,-15,  0,  0,-16,  0,  0,-17,  0,  0,  0,  0, 0,
	      0,  0,  0,-15,  0,  0,  0,-16,  0,  0,  0,-17,  0,  0,  0, 0,
	      0,  0,-15,  0,  0,  0,  0,-16,  0,  0,  0,  0,-17,  0,  0, 0,
	      0,-15,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,-17,  0, 0,
	    -15,  0,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,  0,-17
	  ];
	
	  var SHIFTS = { p: 0, n: 1, b: 2, r: 3, q: 4, k: 5 };
	
	  var FLAGS = {
	    NORMAL: 'n',
	    CAPTURE: 'c',
	    BIG_PAWN: 'b',
	    EP_CAPTURE: 'e',
	    PROMOTION: 'p',
	    KSIDE_CASTLE: 'k',
	    QSIDE_CASTLE: 'q'
	  };
	
	  var BITS = {
	    NORMAL: 1,
	    CAPTURE: 2,
	    BIG_PAWN: 4,
	    EP_CAPTURE: 8,
	    PROMOTION: 16,
	    KSIDE_CASTLE: 32,
	    QSIDE_CASTLE: 64
	  };
	
	  var RANK_1 = 7;
	  var RANK_2 = 6;
	  var RANK_3 = 5;
	  var RANK_4 = 4;
	  var RANK_5 = 3;
	  var RANK_6 = 2;
	  var RANK_7 = 1;
	  var RANK_8 = 0;
	
	  var SQUARES = {
	    a8:   0, b8:   1, c8:   2, d8:   3, e8:   4, f8:   5, g8:   6, h8:   7,
	    a7:  16, b7:  17, c7:  18, d7:  19, e7:  20, f7:  21, g7:  22, h7:  23,
	    a6:  32, b6:  33, c6:  34, d6:  35, e6:  36, f6:  37, g6:  38, h6:  39,
	    a5:  48, b5:  49, c5:  50, d5:  51, e5:  52, f5:  53, g5:  54, h5:  55,
	    a4:  64, b4:  65, c4:  66, d4:  67, e4:  68, f4:  69, g4:  70, h4:  71,
	    a3:  80, b3:  81, c3:  82, d3:  83, e3:  84, f3:  85, g3:  86, h3:  87,
	    a2:  96, b2:  97, c2:  98, d2:  99, e2: 100, f2: 101, g2: 102, h2: 103,
	    a1: 112, b1: 113, c1: 114, d1: 115, e1: 116, f1: 117, g1: 118, h1: 119
	  };
	
	  var ROOKS = {
	    w: [{square: SQUARES.a1, flag: BITS.QSIDE_CASTLE},
	        {square: SQUARES.h1, flag: BITS.KSIDE_CASTLE}],
	    b: [{square: SQUARES.a8, flag: BITS.QSIDE_CASTLE},
	        {square: SQUARES.h8, flag: BITS.KSIDE_CASTLE}]
	  };
	
	  var board = new Array(128);
	  var kings = {w: EMPTY, b: EMPTY};
	  var turn = WHITE;
	  var castling = {w: 0, b: 0};
	  var ep_square = EMPTY;
	  var half_moves = 0;
	  var move_number = 1;
	  var history = [];
	  var header = {};
	
	  /* if the user passes in a fen string, load it, else default to
	   * starting position
	   */
	  if (typeof fen === 'undefined') {
	    load(DEFAULT_POSITION);
	  } else {
	    load(fen);
	  }
	
	  function clear() {
	    board = new Array(128);
	    kings = {w: EMPTY, b: EMPTY};
	    turn = WHITE;
	    castling = {w: 0, b: 0};
	    ep_square = EMPTY;
	    half_moves = 0;
	    move_number = 1;
	    history = [];
	    header = {};
	    update_setup(generate_fen());
	  }
	
	  function reset() {
	    load(DEFAULT_POSITION);
	  }
	
	  function load(fen) {
	    var tokens = fen.split(/\s+/);
	    var position = tokens[0];
	    var square = 0;
	
	    if (!validate_fen(fen).valid) {
	      return false;
	    }
	
	    clear();
	
	    for (var i = 0; i < position.length; i++) {
	      var piece = position.charAt(i);
	
	      if (piece === '/') {
	        square += 8;
	      } else if (is_digit(piece)) {
	        square += parseInt(piece, 10);
	      } else {
	        var color = (piece < 'a') ? WHITE : BLACK;
	        put({type: piece.toLowerCase(), color: color}, algebraic(square));
	        square++;
	      }
	    }
	
	    turn = tokens[1];
	
	    if (tokens[2].indexOf('K') > -1) {
	      castling.w |= BITS.KSIDE_CASTLE;
	    }
	    if (tokens[2].indexOf('Q') > -1) {
	      castling.w |= BITS.QSIDE_CASTLE;
	    }
	    if (tokens[2].indexOf('k') > -1) {
	      castling.b |= BITS.KSIDE_CASTLE;
	    }
	    if (tokens[2].indexOf('q') > -1) {
	      castling.b |= BITS.QSIDE_CASTLE;
	    }
	
	    ep_square = (tokens[3] === '-') ? EMPTY : SQUARES[tokens[3]];
	    half_moves = parseInt(tokens[4], 10);
	    move_number = parseInt(tokens[5], 10);
	
	    update_setup(generate_fen());
	
	    return true;
	  }
	
	  /* TODO: this function is pretty much crap - it validates structure but
	   * completely ignores content (e.g. doesn't verify that each side has a king)
	   * ... we should rewrite this, and ditch the silly error_number field while
	   * we're at it
	   */
	  function validate_fen(fen) {
	    var errors = {
	       0: 'No errors.',
	       1: 'FEN string must contain six space-delimited fields.',
	       2: '6th field (move number) must be a positive integer.',
	       3: '5th field (half move counter) must be a non-negative integer.',
	       4: '4th field (en-passant square) is invalid.',
	       5: '3rd field (castling availability) is invalid.',
	       6: '2nd field (side to move) is invalid.',
	       7: '1st field (piece positions) does not contain 8 \'/\'-delimited rows.',
	       8: '1st field (piece positions) is invalid [consecutive numbers].',
	       9: '1st field (piece positions) is invalid [invalid piece].',
	      10: '1st field (piece positions) is invalid [row too large].',
	      11: 'Illegal en-passant square',
	    };
	
	    /* 1st criterion: 6 space-seperated fields? */
	    var tokens = fen.split(/\s+/);
	    if (tokens.length !== 6) {
	      return {valid: false, error_number: 1, error: errors[1]};
	    }
	
	    /* 2nd criterion: move number field is a integer value > 0? */
	    if (isNaN(tokens[5]) || (parseInt(tokens[5], 10) <= 0)) {
	      return {valid: false, error_number: 2, error: errors[2]};
	    }
	
	    /* 3rd criterion: half move counter is an integer >= 0? */
	    if (isNaN(tokens[4]) || (parseInt(tokens[4], 10) < 0)) {
	      return {valid: false, error_number: 3, error: errors[3]};
	    }
	
	    /* 4th criterion: 4th field is a valid e.p.-string? */
	    if (!/^(-|[abcdefgh][36])$/.test(tokens[3])) {
	      return {valid: false, error_number: 4, error: errors[4]};
	    }
	
	    /* 5th criterion: 3th field is a valid castle-string? */
	    if( !/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(tokens[2])) {
	      return {valid: false, error_number: 5, error: errors[5]};
	    }
	
	    /* 6th criterion: 2nd field is "w" (white) or "b" (black)? */
	    if (!/^(w|b)$/.test(tokens[1])) {
	      return {valid: false, error_number: 6, error: errors[6]};
	    }
	
	    /* 7th criterion: 1st field contains 8 rows? */
	    var rows = tokens[0].split('/');
	    if (rows.length !== 8) {
	      return {valid: false, error_number: 7, error: errors[7]};
	    }
	
	    /* 8th criterion: every row is valid? */
	    for (var i = 0; i < rows.length; i++) {
	      /* check for right sum of fields AND not two numbers in succession */
	      var sum_fields = 0;
	      var previous_was_number = false;
	
	      for (var k = 0; k < rows[i].length; k++) {
	        if (!isNaN(rows[i][k])) {
	          if (previous_was_number) {
	            return {valid: false, error_number: 8, error: errors[8]};
	          }
	          sum_fields += parseInt(rows[i][k], 10);
	          previous_was_number = true;
	        } else {
	          if (!/^[prnbqkPRNBQK]$/.test(rows[i][k])) {
	            return {valid: false, error_number: 9, error: errors[9]};
	          }
	          sum_fields += 1;
	          previous_was_number = false;
	        }
	      }
	      if (sum_fields !== 8) {
	        return {valid: false, error_number: 10, error: errors[10]};
	      }
	    }
	
	    if ((tokens[3][1] == '3' && tokens[1] == 'w') ||
	        (tokens[3][1] == '6' && tokens[1] == 'b')) {
	          return {valid: false, error_number: 11, error: errors[11]};
	    }
	
	    /* everything's okay! */
	    return {valid: true, error_number: 0, error: errors[0]};
	  }
	
	  function generate_fen() {
	    var empty = 0;
	    var fen = '';
	
	    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
	      if (board[i] == null) {
	        empty++;
	      } else {
	        if (empty > 0) {
	          fen += empty;
	          empty = 0;
	        }
	        var color = board[i].color;
	        var piece = board[i].type;
	
	        fen += (color === WHITE) ?
	                 piece.toUpperCase() : piece.toLowerCase();
	      }
	
	      if ((i + 1) & 0x88) {
	        if (empty > 0) {
	          fen += empty;
	        }
	
	        if (i !== SQUARES.h1) {
	          fen += '/';
	        }
	
	        empty = 0;
	        i += 8;
	      }
	    }
	
	    var cflags = '';
	    if (castling[WHITE] & BITS.KSIDE_CASTLE) { cflags += 'K'; }
	    if (castling[WHITE] & BITS.QSIDE_CASTLE) { cflags += 'Q'; }
	    if (castling[BLACK] & BITS.KSIDE_CASTLE) { cflags += 'k'; }
	    if (castling[BLACK] & BITS.QSIDE_CASTLE) { cflags += 'q'; }
	
	    /* do we have an empty castling flag? */
	    cflags = cflags || '-';
	    var epflags = (ep_square === EMPTY) ? '-' : algebraic(ep_square);
	
	    return [fen, turn, cflags, epflags, half_moves, move_number].join(' ');
	  }
	
	  function set_header(args) {
	    for (var i = 0; i < args.length; i += 2) {
	      if (typeof args[i] === 'string' &&
	          typeof args[i + 1] === 'string') {
	        header[args[i]] = args[i + 1];
	      }
	    }
	    return header;
	  }
	
	  /* called when the initial board setup is changed with put() or remove().
	   * modifies the SetUp and FEN properties of the header object.  if the FEN is
	   * equal to the default position, the SetUp and FEN are deleted
	   * the setup is only updated if history.length is zero, ie moves haven't been
	   * made.
	   */
	  function update_setup(fen) {
	    if (history.length > 0) return;
	
	    if (fen !== DEFAULT_POSITION) {
	      header['SetUp'] = '1';
	      header['FEN'] = fen;
	    } else {
	      delete header['SetUp'];
	      delete header['FEN'];
	    }
	  }
	
	  function get(square) {
	    var piece = board[SQUARES[square]];
	    return (piece) ? {type: piece.type, color: piece.color} : null;
	  }
	
	  function put(piece, square) {
	    /* check for valid piece object */
	    if (!('type' in piece && 'color' in piece)) {
	      return false;
	    }
	
	    /* check for piece */
	    if (SYMBOLS.indexOf(piece.type.toLowerCase()) === -1) {
	      return false;
	    }
	
	    /* check for valid square */
	    if (!(square in SQUARES)) {
	      return false;
	    }
	
	    var sq = SQUARES[square];
	
	    /* don't let the user place more than one king */
	    if (piece.type == KING &&
	        !(kings[piece.color] == EMPTY || kings[piece.color] == sq)) {
	      return false;
	    }
	
	    board[sq] = {type: piece.type, color: piece.color};
	    if (piece.type === KING) {
	      kings[piece.color] = sq;
	    }
	
	    update_setup(generate_fen());
	
	    return true;
	  }
	
	  function remove(square) {
	    var piece = get(square);
	    board[SQUARES[square]] = null;
	    if (piece && piece.type === KING) {
	      kings[piece.color] = EMPTY;
	    }
	
	    update_setup(generate_fen());
	
	    return piece;
	  }
	
	  function build_move(board, from, to, flags, promotion) {
	    var move = {
	      color: turn,
	      from: from,
	      to: to,
	      flags: flags,
	      piece: board[from].type
	    };
	
	    if (promotion) {
	      move.flags |= BITS.PROMOTION;
	      move.promotion = promotion;
	    }
	
	    if (board[to]) {
	      move.captured = board[to].type;
	    } else if (flags & BITS.EP_CAPTURE) {
	        move.captured = PAWN;
	    }
	    return move;
	  }
	
	  function generate_moves(options) {
	    function add_move(board, moves, from, to, flags) {
	      /* if pawn promotion */
	      if (board[from].type === PAWN &&
	         (rank(to) === RANK_8 || rank(to) === RANK_1)) {
	          var pieces = [QUEEN, ROOK, BISHOP, KNIGHT];
	          for (var i = 0, len = pieces.length; i < len; i++) {
	            moves.push(build_move(board, from, to, flags, pieces[i]));
	          }
	      } else {
	       moves.push(build_move(board, from, to, flags));
	      }
	    }
	
	    var moves = [];
	    var us = turn;
	    var them = swap_color(us);
	    var second_rank = {b: RANK_7, w: RANK_2};
	
	    var first_sq = SQUARES.a8;
	    var last_sq = SQUARES.h1;
	    var single_square = false;
	
	    /* do we want legal moves? */
	    var legal = (typeof options !== 'undefined' && 'legal' in options) ?
	                options.legal : true;
	
	    /* are we generating moves for a single square? */
	    if (typeof options !== 'undefined' && 'square' in options) {
	      if (options.square in SQUARES) {
	        first_sq = last_sq = SQUARES[options.square];
	        single_square = true;
	      } else {
	        /* invalid square */
	        return [];
	      }
	    }
	
	    for (var i = first_sq; i <= last_sq; i++) {
	      /* did we run off the end of the board */
	      if (i & 0x88) { i += 7; continue; }
	
	      var piece = board[i];
	      if (piece == null || piece.color !== us) {
	        continue;
	      }
	
	      if (piece.type === PAWN) {
	        /* single square, non-capturing */
	        var square = i + PAWN_OFFSETS[us][0];
	        if (board[square] == null) {
	            add_move(board, moves, i, square, BITS.NORMAL);
	
	          /* double square */
	          var square = i + PAWN_OFFSETS[us][1];
	          if (second_rank[us] === rank(i) && board[square] == null) {
	            add_move(board, moves, i, square, BITS.BIG_PAWN);
	          }
	        }
	
	        /* pawn captures */
	        for (j = 2; j < 4; j++) {
	          var square = i + PAWN_OFFSETS[us][j];
	          if (square & 0x88) continue;
	
	          if (board[square] != null &&
	              board[square].color === them) {
	              add_move(board, moves, i, square, BITS.CAPTURE);
	          } else if (square === ep_square) {
	              add_move(board, moves, i, ep_square, BITS.EP_CAPTURE);
	          }
	        }
	      } else {
	        for (var j = 0, len = PIECE_OFFSETS[piece.type].length; j < len; j++) {
	          var offset = PIECE_OFFSETS[piece.type][j];
	          var square = i;
	
	          while (true) {
	            square += offset;
	            if (square & 0x88) break;
	
	            if (board[square] == null) {
	              add_move(board, moves, i, square, BITS.NORMAL);
	            } else {
	              if (board[square].color === us) break;
	              add_move(board, moves, i, square, BITS.CAPTURE);
	              break;
	            }
	
	            /* break, if knight or king */
	            if (piece.type === 'n' || piece.type === 'k') break;
	          }
	        }
	      }
	    }
	
	    /* check for castling if: a) we're generating all moves, or b) we're doing
	     * single square move generation on the king's square
	     */
	    if ((!single_square) || last_sq === kings[us]) {
	      /* king-side castling */
	      if (castling[us] & BITS.KSIDE_CASTLE) {
	        var castling_from = kings[us];
	        var castling_to = castling_from + 2;
	
	        if (board[castling_from + 1] == null &&
	            board[castling_to]       == null &&
	            !attacked(them, kings[us]) &&
	            !attacked(them, castling_from + 1) &&
	            !attacked(them, castling_to)) {
	          add_move(board, moves, kings[us] , castling_to,
	                   BITS.KSIDE_CASTLE);
	        }
	      }
	
	      /* queen-side castling */
	      if (castling[us] & BITS.QSIDE_CASTLE) {
	        var castling_from = kings[us];
	        var castling_to = castling_from - 2;
	
	        if (board[castling_from - 1] == null &&
	            board[castling_from - 2] == null &&
	            board[castling_from - 3] == null &&
	            !attacked(them, kings[us]) &&
	            !attacked(them, castling_from - 1) &&
	            !attacked(them, castling_to)) {
	          add_move(board, moves, kings[us], castling_to,
	                   BITS.QSIDE_CASTLE);
	        }
	      }
	    }
	
	    /* return all pseudo-legal moves (this includes moves that allow the king
	     * to be captured)
	     */
	    if (!legal) {
	      return moves;
	    }
	
	    /* filter out illegal moves */
	    var legal_moves = [];
	    for (var i = 0, len = moves.length; i < len; i++) {
	      make_move(moves[i]);
	      if (!king_attacked(us)) {
	        legal_moves.push(moves[i]);
	      }
	      undo_move();
	    }
	
	    return legal_moves;
	  }
	
	  /* convert a move from 0x88 coordinates to Standard Algebraic Notation
	   * (SAN)
	   *
	   * @param {boolean} sloppy Use the sloppy SAN generator to work around over
	   * disambiguation bugs in Fritz and Chessbase.  See below:
	   *
	   * r1bqkbnr/ppp2ppp/2n5/1B1pP3/4P3/8/PPPP2PP/RNBQK1NR b KQkq - 2 4
	   * 4. ... Nge7 is overly disambiguated because the knight on c6 is pinned
	   * 4. ... Ne7 is technically the valid SAN
	   */
	  function move_to_san(move, sloppy) {
	
	    var output = '';
	
	    if (move.flags & BITS.KSIDE_CASTLE) {
	      output = 'O-O';
	    } else if (move.flags & BITS.QSIDE_CASTLE) {
	      output = 'O-O-O';
	    } else {
	      var disambiguator = get_disambiguator(move, sloppy);
	
	      if (move.piece !== PAWN) {
	        output += move.piece.toUpperCase() + disambiguator;
	      }
	
	      if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
	        if (move.piece === PAWN) {
	          output += algebraic(move.from)[0];
	        }
	        output += 'x';
	      }
	
	      output += algebraic(move.to);
	
	      if (move.flags & BITS.PROMOTION) {
	        output += '=' + move.promotion.toUpperCase();
	      }
	    }
	
	    make_move(move);
	    if (in_check()) {
	      if (in_checkmate()) {
	        output += '#';
	      } else {
	        output += '+';
	      }
	    }
	    undo_move();
	
	    return output;
	  }
	
	  // parses all of the decorators out of a SAN string
	  function stripped_san(move) {
	    return move.replace(/=/,'').replace(/[+#]?[?!]*$/,'');
	  }
	
	  function attacked(color, square) {
	    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
	      /* did we run off the end of the board */
	      if (i & 0x88) { i += 7; continue; }
	
	      /* if empty square or wrong color */
	      if (board[i] == null || board[i].color !== color) continue;
	
	      var piece = board[i];
	      var difference = i - square;
	      var index = difference + 119;
	
	      if (ATTACKS[index] & (1 << SHIFTS[piece.type])) {
	        if (piece.type === PAWN) {
	          if (difference > 0) {
	            if (piece.color === WHITE) return true;
	          } else {
	            if (piece.color === BLACK) return true;
	          }
	          continue;
	        }
	
	        /* if the piece is a knight or a king */
	        if (piece.type === 'n' || piece.type === 'k') return true;
	
	        var offset = RAYS[index];
	        var j = i + offset;
	
	        var blocked = false;
	        while (j !== square) {
	          if (board[j] != null) { blocked = true; break; }
	          j += offset;
	        }
	
	        if (!blocked) return true;
	      }
	    }
	
	    return false;
	  }
	
	  function king_attacked(color) {
	    return attacked(swap_color(color), kings[color]);
	  }
	
	  function in_check() {
	    return king_attacked(turn);
	  }
	
	  function in_checkmate() {
	    return in_check() && generate_moves().length === 0;
	  }
	
	  function in_stalemate() {
	    return !in_check() && generate_moves().length === 0;
	  }
	
	  function insufficient_material() {
	    var pieces = {};
	    var bishops = [];
	    var num_pieces = 0;
	    var sq_color = 0;
	
	    for (var i = SQUARES.a8; i<= SQUARES.h1; i++) {
	      sq_color = (sq_color + 1) % 2;
	      if (i & 0x88) { i += 7; continue; }
	
	      var piece = board[i];
	      if (piece) {
	        pieces[piece.type] = (piece.type in pieces) ?
	                              pieces[piece.type] + 1 : 1;
	        if (piece.type === BISHOP) {
	          bishops.push(sq_color);
	        }
	        num_pieces++;
	      }
	    }
	
	    /* k vs. k */
	    if (num_pieces === 2) { return true; }
	
	    /* k vs. kn .... or .... k vs. kb */
	    else if (num_pieces === 3 && (pieces[BISHOP] === 1 ||
	                                 pieces[KNIGHT] === 1)) { return true; }
	
	    /* kb vs. kb where any number of bishops are all on the same color */
	    else if (num_pieces === pieces[BISHOP] + 2) {
	      var sum = 0;
	      var len = bishops.length;
	      for (var i = 0; i < len; i++) {
	        sum += bishops[i];
	      }
	      if (sum === 0 || sum === len) { return true; }
	    }
	
	    return false;
	  }
	
	  function in_threefold_repetition() {
	    /* TODO: while this function is fine for casual use, a better
	     * implementation would use a Zobrist key (instead of FEN). the
	     * Zobrist key would be maintained in the make_move/undo_move functions,
	     * avoiding the costly that we do below.
	     */
	    var moves = [];
	    var positions = {};
	    var repetition = false;
	
	    while (true) {
	      var move = undo_move();
	      if (!move) break;
	      moves.push(move);
	    }
	
	    while (true) {
	      /* remove the last two fields in the FEN string, they're not needed
	       * when checking for draw by rep */
	      var fen = generate_fen().split(' ').slice(0,4).join(' ');
	
	      /* has the position occurred three or move times */
	      positions[fen] = (fen in positions) ? positions[fen] + 1 : 1;
	      if (positions[fen] >= 3) {
	        repetition = true;
	      }
	
	      if (!moves.length) {
	        break;
	      }
	      make_move(moves.pop());
	    }
	
	    return repetition;
	  }
	
	  function push(move) {
	    history.push({
	      move: move,
	      kings: {b: kings.b, w: kings.w},
	      turn: turn,
	      castling: {b: castling.b, w: castling.w},
	      ep_square: ep_square,
	      half_moves: half_moves,
	      move_number: move_number
	    });
	  }
	
	  function make_move(move) {
	    var us = turn;
	    var them = swap_color(us);
	    push(move);
	
	    board[move.to] = board[move.from];
	    board[move.from] = null;
	
	    /* if ep capture, remove the captured pawn */
	    if (move.flags & BITS.EP_CAPTURE) {
	      if (turn === BLACK) {
	        board[move.to - 16] = null;
	      } else {
	        board[move.to + 16] = null;
	      }
	    }
	
	    /* if pawn promotion, replace with new piece */
	    if (move.flags & BITS.PROMOTION) {
	      board[move.to] = {type: move.promotion, color: us};
	    }
	
	    /* if we moved the king */
	    if (board[move.to].type === KING) {
	      kings[board[move.to].color] = move.to;
	
	      /* if we castled, move the rook next to the king */
	      if (move.flags & BITS.KSIDE_CASTLE) {
	        var castling_to = move.to - 1;
	        var castling_from = move.to + 1;
	        board[castling_to] = board[castling_from];
	        board[castling_from] = null;
	      } else if (move.flags & BITS.QSIDE_CASTLE) {
	        var castling_to = move.to + 1;
	        var castling_from = move.to - 2;
	        board[castling_to] = board[castling_from];
	        board[castling_from] = null;
	      }
	
	      /* turn off castling */
	      castling[us] = '';
	    }
	
	    /* turn off castling if we move a rook */
	    if (castling[us]) {
	      for (var i = 0, len = ROOKS[us].length; i < len; i++) {
	        if (move.from === ROOKS[us][i].square &&
	            castling[us] & ROOKS[us][i].flag) {
	          castling[us] ^= ROOKS[us][i].flag;
	          break;
	        }
	      }
	    }
	
	    /* turn off castling if we capture a rook */
	    if (castling[them]) {
	      for (var i = 0, len = ROOKS[them].length; i < len; i++) {
	        if (move.to === ROOKS[them][i].square &&
	            castling[them] & ROOKS[them][i].flag) {
	          castling[them] ^= ROOKS[them][i].flag;
	          break;
	        }
	      }
	    }
	
	    /* if big pawn move, update the en passant square */
	    if (move.flags & BITS.BIG_PAWN) {
	      if (turn === 'b') {
	        ep_square = move.to - 16;
	      } else {
	        ep_square = move.to + 16;
	      }
	    } else {
	      ep_square = EMPTY;
	    }
	
	    /* reset the 50 move counter if a pawn is moved or a piece is captured */
	    if (move.piece === PAWN) {
	      half_moves = 0;
	    } else if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
	      half_moves = 0;
	    } else {
	      half_moves++;
	    }
	
	    if (turn === BLACK) {
	      move_number++;
	    }
	    turn = swap_color(turn);
	  }
	
	  function undo_move() {
	    var old = history.pop();
	    if (old == null) { return null; }
	
	    var move = old.move;
	    kings = old.kings;
	    turn = old.turn;
	    castling = old.castling;
	    ep_square = old.ep_square;
	    half_moves = old.half_moves;
	    move_number = old.move_number;
	
	    var us = turn;
	    var them = swap_color(turn);
	
	    board[move.from] = board[move.to];
	    board[move.from].type = move.piece;  // to undo any promotions
	    board[move.to] = null;
	
	    if (move.flags & BITS.CAPTURE) {
	      board[move.to] = {type: move.captured, color: them};
	    } else if (move.flags & BITS.EP_CAPTURE) {
	      var index;
	      if (us === BLACK) {
	        index = move.to - 16;
	      } else {
	        index = move.to + 16;
	      }
	      board[index] = {type: PAWN, color: them};
	    }
	
	
	    if (move.flags & (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE)) {
	      var castling_to, castling_from;
	      if (move.flags & BITS.KSIDE_CASTLE) {
	        castling_to = move.to + 1;
	        castling_from = move.to - 1;
	      } else if (move.flags & BITS.QSIDE_CASTLE) {
	        castling_to = move.to - 2;
	        castling_from = move.to + 1;
	      }
	
	      board[castling_to] = board[castling_from];
	      board[castling_from] = null;
	    }
	
	    return move;
	  }
	
	  /* this function is used to uniquely identify ambiguous moves */
	  function get_disambiguator(move, sloppy) {
	    var moves = generate_moves({legal: !sloppy});
	
	    var from = move.from;
	    var to = move.to;
	    var piece = move.piece;
	
	    var ambiguities = 0;
	    var same_rank = 0;
	    var same_file = 0;
	
	    for (var i = 0, len = moves.length; i < len; i++) {
	      var ambig_from = moves[i].from;
	      var ambig_to = moves[i].to;
	      var ambig_piece = moves[i].piece;
	
	      /* if a move of the same piece type ends on the same to square, we'll
	       * need to add a disambiguator to the algebraic notation
	       */
	      if (piece === ambig_piece && from !== ambig_from && to === ambig_to) {
	        ambiguities++;
	
	        if (rank(from) === rank(ambig_from)) {
	          same_rank++;
	        }
	
	        if (file(from) === file(ambig_from)) {
	          same_file++;
	        }
	      }
	    }
	
	    if (ambiguities > 0) {
	      /* if there exists a similar moving piece on the same rank and file as
	       * the move in question, use the square as the disambiguator
	       */
	      if (same_rank > 0 && same_file > 0) {
	        return algebraic(from);
	      }
	      /* if the moving piece rests on the same file, use the rank symbol as the
	       * disambiguator
	       */
	      else if (same_file > 0) {
	        return algebraic(from).charAt(1);
	      }
	      /* else use the file symbol */
	      else {
	        return algebraic(from).charAt(0);
	      }
	    }
	
	    return '';
	  }
	
	  function ascii() {
	    var s = '   +------------------------+\n';
	    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
	      /* display the rank */
	      if (file(i) === 0) {
	        s += ' ' + '87654321'[rank(i)] + ' |';
	      }
	
	      /* empty piece */
	      if (board[i] == null) {
	        s += ' . ';
	      } else {
	        var piece = board[i].type;
	        var color = board[i].color;
	        var symbol = (color === WHITE) ?
	                     piece.toUpperCase() : piece.toLowerCase();
	        s += ' ' + symbol + ' ';
	      }
	
	      if ((i + 1) & 0x88) {
	        s += '|\n';
	        i += 8;
	      }
	    }
	    s += '   +------------------------+\n';
	    s += '     a  b  c  d  e  f  g  h\n';
	
	    return s;
	  }
	
	  // convert a move from Standard Algebraic Notation (SAN) to 0x88 coordinates
	  function move_from_san(move, sloppy) {
	    // strip off any move decorations: e.g Nf3+?!
	    var clean_move = stripped_san(move);
	
	    // if we're using the sloppy parser run a regex to grab piece, to, and from
	    // this should parse invalid SAN like: Pe2-e4, Rc1c4, Qf3xf7
	    if (sloppy) {
	      var matches = clean_move.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/);
	      if (matches) {
	        var piece = matches[1];
	        var from = matches[2];
	        var to = matches[3];
	        var promotion = matches[4];
	      }
	    }
	
	    var moves = generate_moves();
	    for (var i = 0, len = moves.length; i < len; i++) {
	      // try the strict parser first, then the sloppy parser if requested
	      // by the user
	      if ((clean_move === stripped_san(move_to_san(moves[i]))) ||
	          (sloppy && clean_move === stripped_san(move_to_san(moves[i], true)))) {
	        return moves[i];
	      } else {
	        if (matches &&
	            (!piece || piece.toLowerCase() == moves[i].piece) &&
	            SQUARES[from] == moves[i].from &&
	            SQUARES[to] == moves[i].to &&
	            (!promotion || promotion.toLowerCase() == moves[i].promotion)) {
	          return moves[i];
	        }
	      }
	    }
	
	    return null;
	  }
	
	
	  /*****************************************************************************
	   * UTILITY FUNCTIONS
	   ****************************************************************************/
	  function rank(i) {
	    return i >> 4;
	  }
	
	  function file(i) {
	    return i & 15;
	  }
	
	  function algebraic(i){
	    var f = file(i), r = rank(i);
	    return 'abcdefgh'.substring(f,f+1) + '87654321'.substring(r,r+1);
	  }
	
	  function swap_color(c) {
	    return c === WHITE ? BLACK : WHITE;
	  }
	
	  function is_digit(c) {
	    return '0123456789'.indexOf(c) !== -1;
	  }
	
	  /* pretty = external move object */
	  function make_pretty(ugly_move) {
	    var move = clone(ugly_move);
	    move.san = move_to_san(move, false);
	    move.to = algebraic(move.to);
	    move.from = algebraic(move.from);
	
	    var flags = '';
	
	    for (var flag in BITS) {
	      if (BITS[flag] & move.flags) {
	        flags += FLAGS[flag];
	      }
	    }
	    move.flags = flags;
	
	    return move;
	  }
	
	  function clone(obj) {
	    var dupe = (obj instanceof Array) ? [] : {};
	
	    for (var property in obj) {
	      if (typeof property === 'object') {
	        dupe[property] = clone(obj[property]);
	      } else {
	        dupe[property] = obj[property];
	      }
	    }
	
	    return dupe;
	  }
	
	  function trim(str) {
	    return str.replace(/^\s+|\s+$/g, '');
	  }
	
	  /*****************************************************************************
	   * DEBUGGING UTILITIES
	   ****************************************************************************/
	  function perft(depth) {
	    var moves = generate_moves({legal: false});
	    var nodes = 0;
	    var color = turn;
	
	    for (var i = 0, len = moves.length; i < len; i++) {
	      make_move(moves[i]);
	      if (!king_attacked(color)) {
	        if (depth - 1 > 0) {
	          var child_nodes = perft(depth - 1);
	          nodes += child_nodes;
	        } else {
	          nodes++;
	        }
	      }
	      undo_move();
	    }
	
	    return nodes;
	  }
	
	  return {
	    /***************************************************************************
	     * PUBLIC CONSTANTS (is there a better way to do this?)
	     **************************************************************************/
	    WHITE: WHITE,
	    BLACK: BLACK,
	    PAWN: PAWN,
	    KNIGHT: KNIGHT,
	    BISHOP: BISHOP,
	    ROOK: ROOK,
	    QUEEN: QUEEN,
	    KING: KING,
	    SQUARES: (function() {
	                /* from the ECMA-262 spec (section 12.6.4):
	                 * "The mechanics of enumerating the properties ... is
	                 * implementation dependent"
	                 * so: for (var sq in SQUARES) { keys.push(sq); } might not be
	                 * ordered correctly
	                 */
	                var keys = [];
	                for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
	                  if (i & 0x88) { i += 7; continue; }
	                  keys.push(algebraic(i));
	                }
	                return keys;
	              })(),
	    FLAGS: FLAGS,
	
	    /***************************************************************************
	     * PUBLIC API
	     **************************************************************************/
	    load: function(fen) {
	      return load(fen);
	    },
	
	    reset: function() {
	      return reset();
	    },
	
	    moves: function(options) {
	      /* The internal representation of a chess move is in 0x88 format, and
	       * not meant to be human-readable.  The code below converts the 0x88
	       * square coordinates to algebraic coordinates.  It also prunes an
	       * unnecessary move keys resulting from a verbose call.
	       */
	
	      var ugly_moves = generate_moves(options);
	      var moves = [];
	
	      for (var i = 0, len = ugly_moves.length; i < len; i++) {
	
	        /* does the user want a full move object (most likely not), or just
	         * SAN
	         */
	        if (typeof options !== 'undefined' && 'verbose' in options &&
	            options.verbose) {
	          moves.push(make_pretty(ugly_moves[i]));
	        } else {
	          moves.push(move_to_san(ugly_moves[i], false));
	        }
	      }
	
	      return moves;
	    },
	
	    in_check: function() {
	      return in_check();
	    },
	
	    in_checkmate: function() {
	      return in_checkmate();
	    },
	
	    in_stalemate: function() {
	      return in_stalemate();
	    },
	
	    in_draw: function() {
	      return half_moves >= 100 ||
	             in_stalemate() ||
	             insufficient_material() ||
	             in_threefold_repetition();
	    },
	
	    insufficient_material: function() {
	      return insufficient_material();
	    },
	
	    in_threefold_repetition: function() {
	      return in_threefold_repetition();
	    },
	
	    game_over: function() {
	      return half_moves >= 100 ||
	             in_checkmate() ||
	             in_stalemate() ||
	             insufficient_material() ||
	             in_threefold_repetition();
	    },
	
	    validate_fen: function(fen) {
	      return validate_fen(fen);
	    },
	
	    fen: function() {
	      return generate_fen();
	    },
	
	    pgn: function(options) {
	      /* using the specification from http://www.chessclub.com/help/PGN-spec
	       * example for html usage: .pgn({ max_width: 72, newline_char: "<br />" })
	       */
	      var newline = (typeof options === 'object' &&
	                     typeof options.newline_char === 'string') ?
	                     options.newline_char : '\n';
	      var max_width = (typeof options === 'object' &&
	                       typeof options.max_width === 'number') ?
	                       options.max_width : 0;
	      var result = [];
	      var header_exists = false;
	
	      /* add the PGN header headerrmation */
	      for (var i in header) {
	        /* TODO: order of enumerated properties in header object is not
	         * guaranteed, see ECMA-262 spec (section 12.6.4)
	         */
	        result.push('[' + i + ' \"' + header[i] + '\"]' + newline);
	        header_exists = true;
	      }
	
	      if (header_exists && history.length) {
	        result.push(newline);
	      }
	
	      /* pop all of history onto reversed_history */
	      var reversed_history = [];
	      while (history.length > 0) {
	        reversed_history.push(undo_move());
	      }
	
	      var moves = [];
	      var move_string = '';
	
	      /* build the list of moves.  a move_string looks like: "3. e3 e6" */
	      while (reversed_history.length > 0) {
	        var move = reversed_history.pop();
	
	        /* if the position started with black to move, start PGN with 1. ... */
	        if (!history.length && move.color === 'b') {
	          move_string = move_number + '. ...';
	        } else if (move.color === 'w') {
	          /* store the previous generated move_string if we have one */
	          if (move_string.length) {
	            moves.push(move_string);
	          }
	          move_string = move_number + '.';
	        }
	
	        move_string = move_string + ' ' + move_to_san(move, false);
	        make_move(move);
	      }
	
	      /* are there any other leftover moves? */
	      if (move_string.length) {
	        moves.push(move_string);
	      }
	
	      /* is there a result? */
	      if (typeof header.Result !== 'undefined') {
	        moves.push(header.Result);
	      }
	
	      /* history should be back to what is was before we started generating PGN,
	       * so join together moves
	       */
	      if (max_width === 0) {
	        return result.join('') + moves.join(' ');
	      }
	
	      /* wrap the PGN output at max_width */
	      var current_width = 0;
	      for (var i = 0; i < moves.length; i++) {
	        /* if the current move will push past max_width */
	        if (current_width + moves[i].length > max_width && i !== 0) {
	
	          /* don't end the line with whitespace */
	          if (result[result.length - 1] === ' ') {
	            result.pop();
	          }
	
	          result.push(newline);
	          current_width = 0;
	        } else if (i !== 0) {
	          result.push(' ');
	          current_width++;
	        }
	        result.push(moves[i]);
	        current_width += moves[i].length;
	      }
	
	      return result.join('');
	    },
	
	    load_pgn: function(pgn, options) {
	      // allow the user to specify the sloppy move parser to work around over
	      // disambiguation bugs in Fritz and Chessbase
	      var sloppy = (typeof options !== 'undefined' && 'sloppy' in options) ?
	                    options.sloppy : false;
	
	      function mask(str) {
	        return str.replace(/\\/g, '\\');
	      }
	
	      function has_keys(object) {
	        for (var key in object) {
	          return true;
	        }
	        return false;
	      }
	
	      function parse_pgn_header(header, options) {
	        var newline_char = (typeof options === 'object' &&
	                            typeof options.newline_char === 'string') ?
	                            options.newline_char : '\r?\n';
	        var header_obj = {};
	        var headers = header.split(new RegExp(mask(newline_char)));
	        var key = '';
	        var value = '';
	
	        for (var i = 0; i < headers.length; i++) {
	          key = headers[i].replace(/^\[([A-Z][A-Za-z]*)\s.*\]$/, '$1');
	          value = headers[i].replace(/^\[[A-Za-z]+\s"(.*)"\]$/, '$1');
	          if (trim(key).length > 0) {
	            header_obj[key] = value;
	          }
	        }
	
	        return header_obj;
	      }
	
	      var newline_char = (typeof options === 'object' &&
	                          typeof options.newline_char === 'string') ?
	                          options.newline_char : '\r?\n';
	      var regex = new RegExp('^(\\[(.|' + mask(newline_char) + ')*\\])' +
	                             '(' + mask(newline_char) + ')*' +
	                             '1.(' + mask(newline_char) + '|.)*$', 'g');
	
	      /* get header part of the PGN file */
	      var header_string = pgn.replace(regex, '$1');
	
	      /* no info part given, begins with moves */
	      if (header_string[0] !== '[') {
	        header_string = '';
	      }
	
	      reset();
	
	      /* parse PGN header */
	      var headers = parse_pgn_header(header_string, options);
	      for (var key in headers) {
	        set_header([key, headers[key]]);
	      }
	
	      /* load the starting position indicated by [Setup '1'] and
	      * [FEN position] */
	      if (headers['SetUp'] === '1') {
	          if (!(('FEN' in headers) && load(headers['FEN']))) {
	            return false;
	          }
	      }
	
	      /* delete header to get the moves */
	      var ms = pgn.replace(header_string, '').replace(new RegExp(mask(newline_char), 'g'), ' ');
	
	      /* delete comments */
	      ms = ms.replace(/(\{[^}]+\})+?/g, '');
	
	      /* delete recursive annotation variations */
	      var rav_regex = /(\([^\(\)]+\))+?/g
	      while (rav_regex.test(ms)) {
	        ms = ms.replace(rav_regex, '');
	      }
	
	      /* delete move numbers */
	      ms = ms.replace(/\d+\.(\.\.)?/g, '');
	
	      /* delete ... indicating black to move */
	      ms = ms.replace(/\.\.\./g, '');
	
	      /* delete numeric annotation glyphs */
	      ms = ms.replace(/\$\d+/g, '');
	
	      /* trim and get array of moves */
	      var moves = trim(ms).split(new RegExp(/\s+/));
	
	      /* delete empty entries */
	      moves = moves.join(',').replace(/,,+/g, ',').split(',');
	      var move = '';
	
	      for (var half_move = 0; half_move < moves.length - 1; half_move++) {
	        move = move_from_san(moves[half_move], sloppy);
	
	        /* move not possible! (don't clear the board to examine to show the
	         * latest valid position)
	         */
	        if (move == null) {
	          return false;
	        } else {
	          make_move(move);
	        }
	      }
	
	      /* examine last move */
	      move = moves[moves.length - 1];
	      if (POSSIBLE_RESULTS.indexOf(move) > -1) {
	        if (has_keys(header) && typeof header.Result === 'undefined') {
	          set_header(['Result', move]);
	        }
	      }
	      else {
	        move = move_from_san(move, sloppy);
	        if (move == null) {
	          return false;
	        } else {
	          make_move(move);
	        }
	      }
	      return true;
	    },
	
	    header: function() {
	      return set_header(arguments);
	    },
	
	    ascii: function() {
	      return ascii();
	    },
	
	    turn: function() {
	      return turn;
	    },
	
	    move: function(move, options) {
	      /* The move function can be called with in the following parameters:
	       *
	       * .move('Nxb7')      <- where 'move' is a case-sensitive SAN string
	       *
	       * .move({ from: 'h7', <- where the 'move' is a move object (additional
	       *         to :'h8',      fields are ignored)
	       *         promotion: 'q',
	       *      })
	       */
	
	      // allow the user to specify the sloppy move parser to work around over
	      // disambiguation bugs in Fritz and Chessbase
	      var sloppy = (typeof options !== 'undefined' && 'sloppy' in options) ?
	                    options.sloppy : false;
	
	      var move_obj = null;
	
	      if (typeof move === 'string') {
	        move_obj = move_from_san(move, sloppy);
	      } else if (typeof move === 'object') {
	        var moves = generate_moves();
	
	        /* convert the pretty move object to an ugly move object */
	        for (var i = 0, len = moves.length; i < len; i++) {
	          if (move.from === algebraic(moves[i].from) &&
	              move.to === algebraic(moves[i].to) &&
	              (!('promotion' in moves[i]) ||
	              move.promotion === moves[i].promotion)) {
	            move_obj = moves[i];
	            break;
	          }
	        }
	      }
	
	      /* failed to find move */
	      if (!move_obj) {
	        return null;
	      }
	
	      /* need to make a copy of move because we can't generate SAN after the
	       * move is made
	       */
	      var pretty_move = make_pretty(move_obj);
	
	      make_move(move_obj);
	
	      return pretty_move;
	    },
	
	    undo: function() {
	      var move = undo_move();
	      return (move) ? make_pretty(move) : null;
	    },
	
	    clear: function() {
	      return clear();
	    },
	
	    put: function(piece, square) {
	      return put(piece, square);
	    },
	
	    get: function(square) {
	      return get(square);
	    },
	
	    remove: function(square) {
	      return remove(square);
	    },
	
	    perft: function(depth) {
	      return perft(depth);
	    },
	
	    square_color: function(square) {
	      if (square in SQUARES) {
	        var sq_0x88 = SQUARES[square];
	        return ((rank(sq_0x88) + file(sq_0x88)) % 2 === 0) ? 'light' : 'dark';
	      }
	
	      return null;
	    },
	
	    history: function(options) {
	      var reversed_history = [];
	      var move_history = [];
	      var verbose = (typeof options !== 'undefined' && 'verbose' in options &&
	                     options.verbose);
	
	      while (history.length > 0) {
	        reversed_history.push(undo_move());
	      }
	
	      while (reversed_history.length > 0) {
	        var move = reversed_history.pop();
	        if (verbose) {
	          move_history.push(make_pretty(move));
	        } else {
	          move_history.push(move_to_san(move));
	        }
	        make_move(move);
	      }
	
	      return move_history;
	    }
	
	  };
	};
	
	/* export Chess object if using node or any other CommonJS compatible
	 * environment */
	if (true) exports.Chess = Chess;
	/* export Chess object for any RequireJS compatible environment */
	if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = function () { return Chess;  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }
/******/ ]);
//# sourceMappingURL=detail.umd-es2015.js.map