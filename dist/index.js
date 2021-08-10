// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"YOwE":[function(require,module,exports) {
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
'use strict';
/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);

      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};
},{}],"pyFg":[function(require,module,exports) {
/** @license React v17.0.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

var l = require("object-assign"),
    n = 60103,
    p = 60106;

exports.Fragment = 60107;
exports.StrictMode = 60108;
exports.Profiler = 60114;
var q = 60109,
    r = 60110,
    t = 60112;
exports.Suspense = 60113;
var u = 60115,
    v = 60116;

if ("function" === typeof Symbol && Symbol.for) {
  var w = Symbol.for;
  n = w("react.element");
  p = w("react.portal");
  exports.Fragment = w("react.fragment");
  exports.StrictMode = w("react.strict_mode");
  exports.Profiler = w("react.profiler");
  q = w("react.provider");
  r = w("react.context");
  t = w("react.forward_ref");
  exports.Suspense = w("react.suspense");
  u = w("react.memo");
  v = w("react.lazy");
}

var x = "function" === typeof Symbol && Symbol.iterator;

function y(a) {
  if (null === a || "object" !== typeof a) return null;
  a = x && a[x] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}

function z(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);

  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}

var A = {
  isMounted: function () {
    return !1;
  },
  enqueueForceUpdate: function () {},
  enqueueReplaceState: function () {},
  enqueueSetState: function () {}
},
    B = {};

function C(a, b, c) {
  this.props = a;
  this.context = b;
  this.refs = B;
  this.updater = c || A;
}

C.prototype.isReactComponent = {};

C.prototype.setState = function (a, b) {
  if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error(z(85));
  this.updater.enqueueSetState(this, a, b, "setState");
};

C.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};

function D() {}

D.prototype = C.prototype;

function E(a, b, c) {
  this.props = a;
  this.context = b;
  this.refs = B;
  this.updater = c || A;
}

var F = E.prototype = new D();
F.constructor = E;
l(F, C.prototype);
F.isPureReactComponent = !0;
var G = {
  current: null
},
    H = Object.prototype.hasOwnProperty,
    I = {
  key: !0,
  ref: !0,
  __self: !0,
  __source: !0
};

function J(a, b, c) {
  var e,
      d = {},
      k = null,
      h = null;
  if (null != b) for (e in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) H.call(b, e) && !I.hasOwnProperty(e) && (d[e] = b[e]);
  var g = arguments.length - 2;
  if (1 === g) d.children = c;else if (1 < g) {
    for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];

    d.children = f;
  }
  if (a && a.defaultProps) for (e in g = a.defaultProps, g) void 0 === d[e] && (d[e] = g[e]);
  return {
    $$typeof: n,
    type: a,
    key: k,
    ref: h,
    props: d,
    _owner: G.current
  };
}

function K(a, b) {
  return {
    $$typeof: n,
    type: a.type,
    key: b,
    ref: a.ref,
    props: a.props,
    _owner: a._owner
  };
}

function L(a) {
  return "object" === typeof a && null !== a && a.$$typeof === n;
}

function escape(a) {
  var b = {
    "=": "=0",
    ":": "=2"
  };
  return "$" + a.replace(/[=:]/g, function (a) {
    return b[a];
  });
}

var M = /\/+/g;

function N(a, b) {
  return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
}

function O(a, b, c, e, d) {
  var k = typeof a;
  if ("undefined" === k || "boolean" === k) a = null;
  var h = !1;
  if (null === a) h = !0;else switch (k) {
    case "string":
    case "number":
      h = !0;
      break;

    case "object":
      switch (a.$$typeof) {
        case n:
        case p:
          h = !0;
      }

  }
  if (h) return h = a, d = d(h), a = "" === e ? "." + N(h, 0) : e, Array.isArray(d) ? (c = "", null != a && (c = a.replace(M, "$&/") + "/"), O(d, b, c, "", function (a) {
    return a;
  })) : null != d && (L(d) && (d = K(d, c + (!d.key || h && h.key === d.key ? "" : ("" + d.key).replace(M, "$&/") + "/") + a)), b.push(d)), 1;
  h = 0;
  e = "" === e ? "." : e + ":";
  if (Array.isArray(a)) for (var g = 0; g < a.length; g++) {
    k = a[g];
    var f = e + N(k, g);
    h += O(k, b, c, f, d);
  } else if (f = y(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done;) k = k.value, f = e + N(k, g++), h += O(k, b, c, f, d);else if ("object" === k) throw b = "" + a, Error(z(31, "[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b));
  return h;
}

function P(a, b, c) {
  if (null == a) return a;
  var e = [],
      d = 0;
  O(a, e, "", "", function (a) {
    return b.call(c, a, d++);
  });
  return e;
}

function Q(a) {
  if (-1 === a._status) {
    var b = a._result;
    b = b();
    a._status = 0;
    a._result = b;
    b.then(function (b) {
      0 === a._status && (b = b.default, a._status = 1, a._result = b);
    }, function (b) {
      0 === a._status && (a._status = 2, a._result = b);
    });
  }

  if (1 === a._status) return a._result;
  throw a._result;
}

var R = {
  current: null
};

function S() {
  var a = R.current;
  if (null === a) throw Error(z(321));
  return a;
}

var T = {
  ReactCurrentDispatcher: R,
  ReactCurrentBatchConfig: {
    transition: 0
  },
  ReactCurrentOwner: G,
  IsSomeRendererActing: {
    current: !1
  },
  assign: l
};
exports.Children = {
  map: P,
  forEach: function (a, b, c) {
    P(a, function () {
      b.apply(this, arguments);
    }, c);
  },
  count: function (a) {
    var b = 0;
    P(a, function () {
      b++;
    });
    return b;
  },
  toArray: function (a) {
    return P(a, function (a) {
      return a;
    }) || [];
  },
  only: function (a) {
    if (!L(a)) throw Error(z(143));
    return a;
  }
};
exports.Component = C;
exports.PureComponent = E;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = T;

exports.cloneElement = function (a, b, c) {
  if (null === a || void 0 === a) throw Error(z(267, a));
  var e = l({}, a.props),
      d = a.key,
      k = a.ref,
      h = a._owner;

  if (null != b) {
    void 0 !== b.ref && (k = b.ref, h = G.current);
    void 0 !== b.key && (d = "" + b.key);
    if (a.type && a.type.defaultProps) var g = a.type.defaultProps;

    for (f in b) H.call(b, f) && !I.hasOwnProperty(f) && (e[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
  }

  var f = arguments.length - 2;
  if (1 === f) e.children = c;else if (1 < f) {
    g = Array(f);

    for (var m = 0; m < f; m++) g[m] = arguments[m + 2];

    e.children = g;
  }
  return {
    $$typeof: n,
    type: a.type,
    key: d,
    ref: k,
    props: e,
    _owner: h
  };
};

exports.createContext = function (a, b) {
  void 0 === b && (b = null);
  a = {
    $$typeof: r,
    _calculateChangedBits: b,
    _currentValue: a,
    _currentValue2: a,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  };
  a.Provider = {
    $$typeof: q,
    _context: a
  };
  return a.Consumer = a;
};

exports.createElement = J;

exports.createFactory = function (a) {
  var b = J.bind(null, a);
  b.type = a;
  return b;
};

exports.createRef = function () {
  return {
    current: null
  };
};

exports.forwardRef = function (a) {
  return {
    $$typeof: t,
    render: a
  };
};

exports.isValidElement = L;

exports.lazy = function (a) {
  return {
    $$typeof: v,
    _payload: {
      _status: -1,
      _result: a
    },
    _init: Q
  };
};

exports.memo = function (a, b) {
  return {
    $$typeof: u,
    type: a,
    compare: void 0 === b ? null : b
  };
};

exports.useCallback = function (a, b) {
  return S().useCallback(a, b);
};

exports.useContext = function (a, b) {
  return S().useContext(a, b);
};

exports.useDebugValue = function () {};

exports.useEffect = function (a, b) {
  return S().useEffect(a, b);
};

exports.useImperativeHandle = function (a, b, c) {
  return S().useImperativeHandle(a, b, c);
};

exports.useLayoutEffect = function (a, b) {
  return S().useLayoutEffect(a, b);
};

exports.useMemo = function (a, b) {
  return S().useMemo(a, b);
};

exports.useReducer = function (a, b, c) {
  return S().useReducer(a, b, c);
};

exports.useRef = function (a) {
  return S().useRef(a);
};

exports.useState = function (a) {
  return S().useState(a);
};

exports.version = "17.0.2";
},{"object-assign":"YOwE"}],"HdMw":[function(require,module,exports) {
'use strict';

if ("production" === 'production') {
  module.exports = require('./cjs/react.production.min.js');
} else {
  module.exports = require('./cjs/react.development.js');
}
},{"./cjs/react.production.min.js":"pyFg"}],"kgel":[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

},{}],"xON7":[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

},{"./lib/ReactPropTypesSecret":"kgel"}],"Iix9":[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
if ("production" !== 'production') {
  var ReactIs = require('react-is'); // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod


  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = require('./factoryWithThrowingShims')();
}
},{"./factoryWithThrowingShims":"xON7"}],"sieL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classNames = classNames;

function classNames() {
  for (var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++) {
    classes[_key] = arguments[_key];
  }

  return classes.filter(Boolean).join(' ');
}
},{}],"kZ3N":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _css = require("../../utils/css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Utils
var TopBar = function TopBar(_ref) {
  var id = _ref.id,
      className = _ref.className,
      children = _ref.children;
  var rootClasses = (0, _css.classNames)('rmm__top-bar', className && className);
  return /*#__PURE__*/_react.default.createElement("div", {
    id: id,
    className: rootClasses
  }, children);
};

TopBar.defaultProps = {
  id: 'top'
};
TopBar.propTypes = {
  id: _propTypes.default.string,
  className: _propTypes.default.string,
  children: _propTypes.default.node.isRequired
};
var _default = TopBar;
exports.default = _default;
},{"react":"HdMw","prop-types":"Iix9","../../utils/css":"sieL"}],"yAiY":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _css = require("../../utils/css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Utils
var TopBarTitle = function TopBarTitle(_ref) {
  var id = _ref.id,
      className = _ref.className,
      children = _ref.children;
  var rootClasses = (0, _css.classNames)('rmm__top-bar-title', className && className);
  return /*#__PURE__*/_react.default.createElement("h1", {
    id: id,
    className: rootClasses
  }, children);
};

TopBarTitle.propTypes = {
  id: _propTypes.default.string,
  className: _propTypes.default.string,
  children: _propTypes.default.node.isRequired
};
var _default = TopBarTitle;
exports.default = _default;
},{"react":"HdMw","prop-types":"Iix9","../../utils/css":"sieL"}],"razu":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Hamburger = function Hamburger(_ref) {
  var label = _ref.label,
      state = _ref.state,
      onClick = _ref.onClick;

  if (state === '') {
    state = 'rmm__hamburger--closed';
  } else if (state === 'open') {
    state = 'rmm__hamburger--open';
  }

  return /*#__PURE__*/_react.default.createElement("button", {
    className: "rmm__hamburger ".concat(state),
    onClick: onClick
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "rmm_hamburger--slice-container"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "rmm_hamburger--slice"
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "rmm_hamburger--slice"
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "rmm_hamburger--slice"
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "rmm_hamburger--slice"
  })), label && /*#__PURE__*/_react.default.createElement("div", {
    className: "rmm_hamburger--label-container"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "rmm_hamburger--label"
  }, label)));
};

Hamburger.defaultProps = {
  label: null
};
Hamburger.propTypes = {
  label: _propTypes.default.string,
  state: _propTypes.default.oneOf(['', 'open', 'closed']),
  onClick: _propTypes.default.func
};
var _default = Hamburger;
exports.default = _default;
},{"react":"HdMw","prop-types":"Iix9"}],"FM0G":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _css = require("../../utils/css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Utils
var Nav = function Nav(_ref) {
  var id = _ref.id,
      ariaLabel = _ref.ariaLabel,
      activeState = _ref.activeState,
      children = _ref.children;
  var rootClasses = (0, _css.classNames)('rmm__nav', activeState && "rmm__nav--".concat(activeState));
  return /*#__PURE__*/_react.default.createElement("nav", {
    id: id,
    className: rootClasses,
    "aria-label": ariaLabel
  }, children);
};

Nav.defaultProps = {
  ariaLabel: 'Main Navigation',
  activeState: ''
};
Nav.propTypes = {
  id: _propTypes.default.string.isRequired,
  ariaLabel: _propTypes.default.string.isRequired,
  activeState: _propTypes.default.oneOf(['', 'open', 'closed']).isRequired,
  children: _propTypes.default.node.isRequired
};
var _default = Nav;
exports.default = _default;
},{"react":"HdMw","prop-types":"Iix9","../../utils/css":"sieL"}],"KTmX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MainList = function MainList(_ref) {
  var id = _ref.id,
      children = _ref.children,
      ariaLabel = _ref.ariaLabel;
  return /*#__PURE__*/_react.default.createElement("ul", {
    id: id,
    role: "menubar",
    "aria-label": ariaLabel,
    className: "rmm__main-list"
  }, children);
};

MainList.defaultProps = {
  ariaLabel: 'Main menu'
};
MainList.propTypes = {
  id: _propTypes.default.string.isRequired,
  children: _propTypes.default.node.isRequired,
  ariaLabel: _propTypes.default.string.isRequired
};
var _default = MainList;
exports.default = _default;
},{"react":"HdMw","prop-types":"Iix9"}],"gXMz":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _css = require("../../utils/css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Utils
var MegaList = function MegaList(_ref) {
  var id = _ref.id,
      activeState = _ref.activeState,
      children = _ref.children;
  var rootClasses = (0, _css.classNames)('rmm__mega-list', activeState && "rmm__mega-list--".concat(activeState));
  return /*#__PURE__*/_react.default.createElement("ul", {
    role: "menu",
    className: rootClasses,
    id: id,
    "aria-labelledby": id
  }, children);
};

MegaList.defaultProps = {
  activeState: ''
};
MegaList.propTypes = {
  id: _propTypes.default.string.isRequired,
  activeState: _propTypes.default.oneOf(['open', 'closed']).isRequired,
  children: _propTypes.default.node.isRequired
};
var _default = MegaList;
exports.default = _default;
},{"react":"HdMw","prop-types":"Iix9","../../utils/css":"sieL"}],"xLxj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _css = require("../../utils/css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Utils
var MainNavItem = function MainNavItem(_ref) {
  var id = _ref.id,
      role = _ref.role,
      isHeading = _ref.isHeading,
      isChildren = _ref.isChildren,
      isForward = _ref.isForward,
      className = _ref.className,
      children = _ref.children;
  var rootClasses = (0, _css.classNames)('rmm__main-nav-item', isHeading && 'rmm__main-nav-item--heading', isChildren && 'rmm__main-nav-item--children', isForward && 'rmm__main-nav-item--forward', className && className);
  return /*#__PURE__*/_react.default.createElement("li", {
    id: id,
    role: role,
    className: rootClasses
  }, children);
};

MainNavItem.defaultProps = {
  role: 'none',
  isHeading: false,
  hasChildren: false,
  isForward: false
};
MainNavItem.propTypes = {
  id: _propTypes.default.string.isRequired,
  role: _propTypes.default.string,
  isHeading: _propTypes.default.bool,
  isChildren: _propTypes.default.bool,
  isForward: _propTypes.default.bool,
  className: _propTypes.default.string,
  children: _propTypes.default.node.isRequired
};
var _default = MainNavItem;
exports.default = _default;
},{"react":"HdMw","prop-types":"Iix9","../../utils/css":"sieL"}],"Gmr7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _css = require("../../utils/css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Utils
var MainNavItemLink = function MainNavItemLink(_ref) {
  var id = _ref.id,
      role = _ref.role,
      href = _ref.href,
      isBack = _ref.isBack,
      isForward = _ref.isForward,
      isActive = _ref.isActive,
      className = _ref.className,
      onClick = _ref.onClick,
      onKeyDown = _ref.onKeyDown,
      ariaHaspopup = _ref.ariaHaspopup,
      ariaControls = _ref.ariaControls,
      children = _ref.children;
  var rootClasses = (0, _css.classNames)('rmm__main-nav-item-link', isBack && 'rmm__main-nav-item-link--back', isForward && 'rmm__main-nav-item-link--forward', isActive && 'rmm__main-nav-item-link--active', className && className);
  return /*#__PURE__*/_react.default.createElement("a", {
    id: id,
    role: role,
    href: href,
    className: rootClasses,
    onClick: onClick,
    onKeyDown: onKeyDown,
    "aria-haspopup": ariaHaspopup,
    "aria-controls": ariaControls
  }, children);
};

MainNavItemLink.defaultProps = {
  role: 'menuitem',
  isBack: false,
  isForward: false,
  isActive: false
};
MainNavItemLink.propTypes = {
  id: _propTypes.default.string.isRequired,
  role: _propTypes.default.string,
  href: _propTypes.default.string.isRequired,
  isBack: _propTypes.default.bool,
  isForward: _propTypes.default.bool,
  isActive: _propTypes.default.bool,
  className: _propTypes.default.string,
  onClick: _propTypes.default.func,
  onKeyDown: _propTypes.default.func,
  ariaHaspopup: _propTypes.default.string,
  ariaControls: _propTypes.default.string,
  children: _propTypes.default.node.isRequired
};
var _default = MainNavItemLink;
exports.default = _default;
},{"react":"HdMw","prop-types":"Iix9","../../utils/css":"sieL"}],"NzIe":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _css = require("../../utils/css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Utils
var NavItem = function NavItem(_ref) {
  var id = _ref.id,
      role = _ref.role,
      isHeading = _ref.isHeading,
      isForward = _ref.isForward,
      className = _ref.className,
      children = _ref.children;
  var rootClasses = (0, _css.classNames)('rmm__nav-item', isHeading && 'rmm__nav-item--heading', isForward && 'rmm__nav-item--forward', className && className);
  return /*#__PURE__*/_react.default.createElement("li", {
    id: id,
    role: role,
    className: rootClasses
  }, children);
};

NavItem.defaultProps = {
  role: 'none',
  isHeading: false,
  hasChildren: false,
  isForward: false
};
NavItem.propTypes = {
  id: _propTypes.default.string.isRequired,
  role: _propTypes.default.string,
  isHeading: _propTypes.default.bool,
  isForward: _propTypes.default.bool,
  className: _propTypes.default.string,
  children: _propTypes.default.node.isRequired
};
var _default = NavItem;
exports.default = _default;
},{"react":"HdMw","prop-types":"Iix9","../../utils/css":"sieL"}],"vrv6":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _css = require("../../utils/css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Utils
var NavItemLink = function NavItemLink(_ref) {
  var id = _ref.id,
      role = _ref.role,
      href = _ref.href,
      isBack = _ref.isBack,
      isHeading = _ref.isHeading,
      isForward = _ref.isForward,
      isActive = _ref.isActive,
      className = _ref.className,
      onClick = _ref.onClick,
      onKeyDown = _ref.onKeyDown,
      ariaHaspopup = _ref.ariaHaspopup,
      ariaControls = _ref.ariaControls,
      children = _ref.children;
  var rootClasses = (0, _css.classNames)('rmm__nav-item-link', isBack && 'rmm__nav-item-link--back', isHeading && 'rmm__nav-item-link--heading', isForward && 'rmm__nav-item-link--forward', isActive && 'rmm__nav-item-link--active', className && className);
  return /*#__PURE__*/_react.default.createElement("a", {
    id: id,
    role: role,
    href: href,
    className: rootClasses,
    onClick: onClick,
    onKeyDown: onKeyDown,
    "aria-haspopup": ariaHaspopup,
    "aria-controls": ariaControls
  }, children);
};

NavItemLink.defaultProps = {
  role: 'menuitem',
  isBack: false,
  isHeading: false,
  isForward: false,
  isActive: false
};
NavItemLink.propTypes = {
  id: _propTypes.default.string.isRequired,
  role: _propTypes.default.string,
  href: _propTypes.default.string.isRequired,
  isBack: _propTypes.default.bool,
  isHeading: _propTypes.default.bool,
  isForward: _propTypes.default.bool,
  isActive: _propTypes.default.bool,
  className: _propTypes.default.string,
  onClick: _propTypes.default.func,
  onKeyDown: _propTypes.default.func,
  ariaHaspopup: _propTypes.default.string,
  ariaControls: _propTypes.default.string,
  children: _propTypes.default.node.isRequired
};
var _default = NavItemLink;
exports.default = _default;
},{"react":"HdMw","prop-types":"Iix9","../../utils/css":"sieL"}],"iXnf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _css = require("../../utils/css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Utils
var NavList = function NavList(_ref) {
  var id = _ref.id,
      role = _ref.role,
      isSub = _ref.isSub,
      isSubSub = _ref.isSubSub,
      isDropdown = _ref.isDropdown,
      activeState = _ref.activeState,
      ariaLabelledby = _ref.ariaLabelledby,
      children = _ref.children;
  var rootClasses = (0, _css.classNames)('rmm__nav-list', "rmm__nav-list--".concat(activeState), isSub && 'rmm__nav-list--sub', isSubSub && 'rmm__nav-list--sub-sub', isDropdown && 'rmm__nav-list--dropdown');
  return /*#__PURE__*/_react.default.createElement("ul", {
    id: id,
    role: role,
    "aria-labelledby": ariaLabelledby,
    className: rootClasses
  }, children);
};

NavList.defaultProps = {
  role: 'menubar',
  isSub: false,
  isSubSub: false,
  isDropdown: false,
  activeState: ''
};
NavList.propTypes = {
  id: _propTypes.default.string.isRequired,
  role: _propTypes.default.string,
  isSub: _propTypes.default.bool,
  isSubSub: _propTypes.default.bool,
  isDropdown: _propTypes.default.bool,
  activeState: _propTypes.default.oneOf(['', 'open', 'closed']).isRequired,
  ariaLabelledby: _propTypes.default.string.isRequired,
  children: _propTypes.default.node.isRequired
};
var _default = NavList;
exports.default = _default;
},{"react":"HdMw","prop-types":"Iix9","../../utils/css":"sieL"}],"FGCg":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _css = require("../../utils/css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Utils
var NavItemDescription = function NavItemDescription(_ref) {
  var className = _ref.className,
      children = _ref.children;
  var rootClasses = (0, _css.classNames)('rmm__nav-item-description', className && className);
  return /*#__PURE__*/_react.default.createElement("p", {
    className: rootClasses
  }, children);
};

NavItemDescription.propTypes = {
  className: _propTypes.default.string,
  children: _propTypes.default.node.isRequired
};
var _default = NavItemDescription;
exports.default = _default;
},{"react":"HdMw","prop-types":"Iix9","../../utils/css":"sieL"}],"ezmr":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuStateMachine = void 0;

var MenuStateMachine = function MenuStateMachine(state) {
  var validStates = ['closed', 'open'];
  var defaultState = 'open';
  var stateChangedTo = defaultState;

  if (validStates.includes(state)) {
    switch (state) {
      case validStates[0]:
        stateChangedTo = validStates[1];
        break;

      case validStates[1]:
        stateChangedTo = validStates[0];
        break;

      default:
        stateChangedTo = validStates[0];
    }
  }

  return stateChangedTo;
};

exports.MenuStateMachine = MenuStateMachine;
},{}],"c2Qt":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _TopBar = _interopRequireDefault(require("./components/TopBar"));

var _TopBarTitle = _interopRequireDefault(require("./components/TopBarTitle"));

var _Hamburger = _interopRequireDefault(require("./components/Hamburger"));

var _Nav = _interopRequireDefault(require("./components/Nav"));

var _MainList = _interopRequireDefault(require("./components/MainList"));

var _MegaList = _interopRequireDefault(require("./components/MegaList"));

var _MainNavItem = _interopRequireDefault(require("./components/MainNavItem"));

var _MainNavItemLink = _interopRequireDefault(require("./components/MainNavItemLink"));

var _NavItem = _interopRequireDefault(require("./components/NavItem"));

var _NavItemLink = _interopRequireDefault(require("./components/NavItemLink"));

var _NavList = _interopRequireDefault(require("./components/NavList"));

var _NavItemDescription = _interopRequireDefault(require("./components/NavItemDescription"));

var _menus = require("./state-machines/menus");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Images
// import LogoImage from './images/logos/logo.svg'
var Menu = function Menu() {
  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      megaMenuState = _useState2[0],
      setMegaMenuState = _useState2[1];

  var _useState3 = (0, _react.useState)(''),
      _useState4 = _slicedToArray(_useState3, 2),
      subMenuState = _useState4[0],
      setSubMenuState = _useState4[1];

  var _useState5 = (0, _react.useState)(''),
      _useState6 = _slicedToArray(_useState5, 2),
      subSubMenuState = _useState6[0],
      setSubSubMenuState = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      activeMenus = _useState8[0],
      setActiveMenus = _useState8[1]; // array that captures the ids of active menus


  var _useState9 = (0, _react.useState)(true),
      _useState10 = _slicedToArray(_useState9, 2),
      isMobile = _useState10[0],
      setIsMobile = _useState10[1]; // array that captures the ids of active menus


  var wrapperRef = (0, _react.useRef)(null); // used to detect clicks outside of component

  var viewportLarge = 1024;

  var resetMenus = function resetMenus() {
    // close all menus and empty activeMenus array
    setActiveMenus([]);
    setSubMenuState('closed');
    setSubSubMenuState('closed');
  };

  var useOutsideAlerter = function useOutsideAlerter(ref) {
    (0, _react.useEffect)(function () {
      // Reset menu if clicked on outside of element
      var handleClickOutside = function handleClickOutside(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          resetMenus();
        }
      }; // Bind the event listener to both mouse and key events


      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleClickOutside);
      return function () {
        // Unbind the event listener to clean up
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleClickOutside);
      };
    }, [ref]);
  };

  var updateActiveMenus = function updateActiveMenus(state, menuId) {
    if (state === 'open') {
      // add menuId from activeMenus
      setActiveMenus([].concat(_toConsumableArray(activeMenus), [menuId]));
    } else if (state === 'closed') {
      // remove menuId from activeMenus
      setActiveMenus(activeMenus.filter(function (item) {
        return item !== menuId;
      }));
    }
  };

  var toggleMegaMenu = function toggleMegaMenu(e, menuId) {
    e.preventDefault();
    var nextState = (0, _menus.MenuStateMachine)(megaMenuState);
    setMegaMenuState(nextState);
    updateActiveMenus(nextState, menuId);

    if (megaMenuState === 'open') {
      resetMenus();
    }
  };

  var toggleSubMenu = function toggleSubMenu(e, menuId) {
    e.preventDefault();
    var nextState = (0, _menus.MenuStateMachine)(subMenuState);
    setSubMenuState((0, _menus.MenuStateMachine)(subMenuState));
    /* 
      I haven't come up with single solution (yet) that takes care of 
      opening and closing menus for both small and large screens, so for 
      now I fork the logic based on viewport size.
      */

    if (!isMobile) {
      if (activeMenus.includes(menuId)) {
        // menu is already open, remove it from activeMenus to close it
        setActiveMenus([]);
      } else {
        // menu is not yet active, add it to activeMenus to open it
        setActiveMenus([menuId]);
      }
    } else {
      // remove menuId from activeMenus
      updateActiveMenus(nextState, menuId);
    }
  };

  var toggleSubSubMenu = function toggleSubSubMenu(e, menuId) {
    e.preventDefault();
    var nextState = (0, _menus.MenuStateMachine)(subSubMenuState);
    setSubSubMenuState((0, _menus.MenuStateMachine)(subSubMenuState));
    updateActiveMenus(nextState, menuId);
  };

  (0, _react.useEffect)(function () {
    if (window.innerWidth >= viewportLarge) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }, [activeMenus, isMobile]);

  var escFunction = function escFunction(e) {
    if (e.keyCode === 27) {
      resetMenus();
    }
  };

  var a11yClick = function a11yClick(e) {
    var code = e.charCode || e.keyCode;

    if (code === 32 || code === 13) {
      return true;
    }
  };

  (0, _react.useEffect)(function () {
    document.addEventListener('keydown', escFunction, false);
    return function () {
      document.removeEventListener('keydown', escFunction, false);
    };
  });
  useOutsideAlerter(wrapperRef); // create bindings for closing menu from outside events

  return /*#__PURE__*/_react.default.createElement("div", {
    role: "navigation",
    className: "rmm__root",
    ref: wrapperRef
  }, /*#__PURE__*/_react.default.createElement(_TopBar.default, null, /*#__PURE__*/_react.default.createElement(_TopBarTitle.default, null, "Your Brand Name")), /*#__PURE__*/_react.default.createElement(_Hamburger.default, {
    label: "Menu",
    state: megaMenuState,
    onClick: function onClick(e) {
      return toggleMegaMenu(e, 'nav-main');
    }
  }), /*#__PURE__*/_react.default.createElement(_Nav.default, {
    id: "site-nav",
    activeState: megaMenuState,
    ariaLabel: "Main Navigation"
  }, /*#__PURE__*/_react.default.createElement(_MainList.default, {
    id: "menubar-main",
    ariaLabel: "Main Menu"
  }, /*#__PURE__*/_react.default.createElement(_MainNavItem.default, {
    role: "none",
    id: "nav-home"
  }, /*#__PURE__*/_react.default.createElement(_MainNavItemLink.default, {
    id: "menuitem-home",
    role: "menuitem",
    href: "/"
  }, "Home")), /*#__PURE__*/_react.default.createElement(_MainNavItem.default, {
    id: "nav-Mega-Menu",
    role: "none",
    isChildren: true
  }, /*#__PURE__*/_react.default.createElement(_MainNavItemLink.default, {
    role: "menuitem",
    id: "menuitem-Mega-Menu",
    href: "/?page=mega-menu",
    isForward: true,
    isActive: activeMenus.includes('menu-Mega-Menu') ? true : false,
    onClick: function onClick(e) {
      return toggleSubMenu(e, 'menu-Mega-Menu');
    },
    onKeyDown: function onKeyDown(e) {
      return a11yClick(e) && toggleSubMenu(e, 'menu-Mega-Menu');
    },
    ariaHaspopup: "true",
    ariaControls: "menu-Mega-Menu"
  }, "Mega Menu"), /*#__PURE__*/_react.default.createElement(_MegaList.default, {
    id: "menu-Mega-Menu",
    activeState: activeMenus.includes('menu-Mega-Menu') ? 'open' : 'closed'
  }, /*#__PURE__*/_react.default.createElement(_NavItem.default, {
    id: "nav-Mega-Menu-back",
    isHeading: true
  }, /*#__PURE__*/_react.default.createElement(_NavItemLink.default, {
    id: "menuitem-Mega-Menu-back",
    href: "/?page=mega-menu",
    onClick: function onClick(e) {
      return toggleSubMenu(e, 'menu-Mega-Menu');
    },
    onKeyDown: function onKeyDown(e) {
      return a11yClick(e) && toggleSubMenu(e, 'menu-Mega-Menu');
    },
    ariaControls: "nav-main-Mega-Menu",
    isBack: true
  }, "Mega Menu")), /*#__PURE__*/_react.default.createElement(_NavItem.default, {
    id: "nav-Mega-Menu-Sub-menu-item-1",
    role: "none"
  }, /*#__PURE__*/_react.default.createElement(_NavItemLink.default, {
    id: "menuitem-Mega-Menu-Sub-menu-item-1",
    role: "menuitem",
    href: "/?page=sub-menu-item-1",
    isHeading: true
  }, "Sub menu item 1"), /*#__PURE__*/_react.default.createElement(_NavItemDescription.default, null, "Single line description that accompanies link")), /*#__PURE__*/_react.default.createElement(_NavItem.default, {
    id: "nav-Mega-Menu-Sub-menu-item-2",
    role: "none"
  }, /*#__PURE__*/_react.default.createElement(_NavItemLink.default, {
    id: "menuitem-Mega-Menu-Sub-menu-item-2",
    role: "menuitem",
    href: "/?page=sub-menu-item-2",
    isHeading: true
  }, "Sub menu item 2"), /*#__PURE__*/_react.default.createElement(_NavItemDescription.default, null, "Double lined small description that accompanies link in the React Mega Menu project")), /*#__PURE__*/_react.default.createElement(_NavItem.default, {
    id: "nav-Mega-Menu-Sub-menu-item-3",
    role: "none"
  }, /*#__PURE__*/_react.default.createElement(_NavItemLink.default, {
    id: "menuitem-Mega-Menu-Sub-menu-item-3",
    role: "menuitem",
    href: "/?page=sub-menu-item-3",
    isHeading: true,
    isForward: true,
    onClick: function onClick(e) {
      return toggleSubSubMenu(e, 'menu-Mega-Menu-Sub-menu-item-3');
    },
    onKeyDown: function onKeyDown(e) {
      return a11yClick(e) && toggleSubSubMenu(e, 'menu-Mega-Menu-Sub-menu-item-3');
    },
    ariaHaspopup: "true",
    ariaControls: "menu-Mega-Menu-Sub-menu-item-3"
  }, "Sub menu item 3"), /*#__PURE__*/_react.default.createElement(_NavItemDescription.default, null, "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide."), /*#__PURE__*/_react.default.createElement(_NavList.default, {
    id: "menu-Mega-Menu-Sub-menu-item-3",
    role: "menu",
    isSub: true,
    isSubSub: true,
    activeState: activeMenus.includes('menu-Mega-Menu-Sub-menu-item-3') ? 'open' : 'closed',
    ariaLabelledby: "menuitem-Mega-Menu-Sub-menu-item-3"
  }, /*#__PURE__*/_react.default.createElement(_NavItem.default, {
    id: "nav-Mega-Menu-Sub-menu-item-3-back",
    role: "none",
    isHeading: true
  }, /*#__PURE__*/_react.default.createElement(_NavItemLink.default, {
    id: "menuitem-Mega-Menu-Sub-menu-item-3-back",
    role: "menuitem",
    href: "/?page=sub-menu-item-3",
    isBack: true,
    onClick: function onClick(e) {
      return toggleSubSubMenu(e, 'menu-Mega-Menu-Sub-menu-item-3');
    },
    onKeyDown: function onKeyDown(e) {
      return a11yClick(e) && toggleSubSubMenu(e, 'menu-Mega-Menu-Sub-menu-item-3');
    },
    ariaHaspopup: "true",
    ariaControls: "menu-Mega-Menu-Sub-menu-item-3"
  }, "Sub menu item 3")), /*#__PURE__*/_react.default.createElement(_NavItem.default, {
    id: "nav-Mega-Menu-Sub-menu-item-3.1",
    role: "none"
  }, /*#__PURE__*/_react.default.createElement(_NavItemLink.default, {
    id: "menuitem-Mega-Menu-Sub-menu-item-3.1",
    role: "menuitem",
    href: "/?page=sub-menu-item-3.1"
  }, "Sub menu item 3.1"), /*#__PURE__*/_react.default.createElement(_NavItemDescription.default, null, "Single line description that accompanies link")), /*#__PURE__*/_react.default.createElement(_NavItem.default, {
    id: "nav-Mega-Menu-Sub-menu-item-3.2",
    role: "none"
  }, /*#__PURE__*/_react.default.createElement(_NavItemLink.default, {
    id: "menuitem-Mega-Menu-Sub-menu-item-3.2",
    role: "menuitem",
    href: "/?page=sub-menu-item-3.2"
  }, "Sub menu item 3.2"), /*#__PURE__*/_react.default.createElement(_NavItemDescription.default, null, "Double lined small description that accompanies link in the React Mega Menu project")), /*#__PURE__*/_react.default.createElement(_NavItem.default, {
    id: "nav-Mega-Menu-Sub-menu-item-3.3",
    role: "none"
  }, /*#__PURE__*/_react.default.createElement(_NavItemLink.default, {
    id: "menuitem-Mega-Menu-Sub-menu-item-3.3",
    role: "menuitem",
    href: "/?page=sub-menu-item-3.3"
  }, "Sub menu item 3.3"), /*#__PURE__*/_react.default.createElement(_NavItemDescription.default, null, "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide.")))), /*#__PURE__*/_react.default.createElement(_NavItem.default, {
    id: "nav-Mega-Menu-Sub-menu-item-4",
    role: "none"
  }, /*#__PURE__*/_react.default.createElement(_NavItemLink.default, {
    id: "menuitem-Mega-Menu-Sub-menu-item-4",
    role: "menuitem",
    href: "/?page=sub-menu-item-4",
    isHeading: true,
    isForward: true,
    onClick: function onClick(e) {
      return toggleSubSubMenu(e, 'menu-Mega-Menu-Sub-menu-item-4');
    },
    onKeyDown: function onKeyDown(e) {
      return a11yClick(e) && toggleSubSubMenu(e, 'menu-Mega-Menu-Sub-menu-item-4');
    },
    ariaHaspopup: "true",
    ariaControls: "menu-Mega-Menu-Sub-menu-item-4"
  }, "Sub menu item 4"), /*#__PURE__*/_react.default.createElement(_NavItemDescription.default, null, "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide."), /*#__PURE__*/_react.default.createElement(_NavList.default, {
    id: "menu-Mega-Menu-Sub-menu-item-4",
    role: "menu",
    isSub: true,
    isSubSub: true,
    activeState: activeMenus.includes('menu-Mega-Menu-Sub-menu-item-4') ? 'open' : 'closed',
    ariaLabelledby: "menuitem-Mega-Menu-Sub-menu-item-4"
  }, /*#__PURE__*/_react.default.createElement(_NavItem.default, {
    id: "nav-Mega-Menu-Sub-menu-item-4-back",
    role: "none",
    isHeading: true
  }, /*#__PURE__*/_react.default.createElement(_NavItemLink.default, {
    id: "menuitem-Mega-Menu-Sub-menu-item-4-back",
    role: "menuitem",
    href: "/?page=sub-menu-item-4",
    isBack: true,
    onClick: function onClick(e) {
      return toggleSubSubMenu(e, 'menu-Mega-Menu-Sub-menu-item-4');
    },
    onKeyDown: function onKeyDown(e) {
      return a11yClick(e) && toggleSubSubMenu(e, 'menu-Mega-Menu-Sub-menu-item-4');
    },
    ariaHaspopup: "true",
    ariaControls: "menu-Mega-Menu-Sub-menu-item-4"
  }, "Sub menu item 4")), /*#__PURE__*/_react.default.createElement(_NavItem.default, {
    id: "nav-Mega-Menu-Sub-menu-item-4.1",
    role: "none"
  }, /*#__PURE__*/_react.default.createElement(_NavItemLink.default, {
    id: "menuitem-Mega-Menu-Sub-menu-item-4.1",
    role: "menuitem",
    href: "/?page=sub-menu-item-4.1"
  }, "Sub menu item 4.1")), /*#__PURE__*/_react.default.createElement(_NavItem.default, {
    id: "nav-Mega-Menu-Sub-menu-item-4.2",
    role: "none"
  }, /*#__PURE__*/_react.default.createElement(_NavItemLink.default, {
    id: "menuitem-Mega-Menu-Sub-menu-item-4.2",
    role: "menuitem",
    href: "/?page=sub-menu-item-4.2"
  }, "Sub menu item 4.2")), /*#__PURE__*/_react.default.createElement(_NavItem.default, {
    id: "nav-Mega-Menu-Sub-menu-item-4.3",
    role: "none"
  }, /*#__PURE__*/_react.default.createElement(_NavItemLink.default, {
    id: "menuitem-Mega-Menu-Sub-menu-item-4.3",
    role: "menuitem",
    href: "/?page=sub-menu-item-4.3"
  }, "Sub menu item 4.3")), /*#__PURE__*/_react.default.createElement(_NavItem.default, {
    id: "nav-Mega-Menu-Sub-menu-item-4.4",
    role: "none"
  }, /*#__PURE__*/_react.default.createElement(_NavItemLink.default, {
    id: "menuitem-Mega-Menu-Sub-menu-item-4.4",
    role: "menuitem",
    href: "/?page=sub-menu-item-4.4"
  }, "Sub menu item 4.4")), /*#__PURE__*/_react.default.createElement(_NavItem.default, {
    id: "nav-Mega-Menu-Sub-menu-item-4.5",
    role: "none"
  }, /*#__PURE__*/_react.default.createElement(_NavItemLink.default, {
    id: "menuitem-Mega-Menu-Sub-menu-item-4.5",
    role: "menuitem",
    href: "/?page=sub-menu-item-4.5"
  }, "Sub menu item 4.5")), /*#__PURE__*/_react.default.createElement(_NavItem.default, {
    id: "nav-Mega-Menu-Sub-menu-item-4.6",
    role: "none"
  }, /*#__PURE__*/_react.default.createElement(_NavItemLink.default, {
    id: "menuitem-Mega-Menu-Sub-menu-item-4.6",
    role: "menuitem",
    href: "/?page=sub-menu-item-4.6"
  }, "Sub menu item 4.6")))))), /*#__PURE__*/_react.default.createElement(_MainNavItem.default, {
    id: "nav-contact",
    role: "none"
  }, /*#__PURE__*/_react.default.createElement(_MainNavItemLink.default, {
    id: "menuitem-contact",
    role: "menuitem",
    href: "/?page=contact"
  }, "Contact")))));
};

var _default = Menu;
exports.default = _default;
},{"react":"HdMw","./components/TopBar":"kZ3N","./components/TopBarTitle":"yAiY","./components/Hamburger":"razu","./components/Nav":"FM0G","./components/MainList":"KTmX","./components/MegaList":"gXMz","./components/MainNavItem":"xLxj","./components/MainNavItemLink":"Gmr7","./components/NavItem":"NzIe","./components/NavItemLink":"vrv6","./components/NavList":"iXnf","./components/NavItemDescription":"FGCg","./state-machines/menus":"ezmr"}],"Focm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Menu", {
  enumerable: true,
  get: function () {
    return _index.default;
  }
});

var _index = _interopRequireDefault(require("./src/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./src/index":"c2Qt"}]},{},["Focm"], null)
//# sourceMappingURL=/index.js.map