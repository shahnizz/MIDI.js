(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function arrayCopy(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = arrayCopy;

},{}],2:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * A specialized version of `_.forEach` for arrays without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],3:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property names to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @returns {Object} Returns `object`.
 */
function baseCopy(source, props, object) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    object[key] = source[key];
  }
  return object;
}

module.exports = baseCopy;

},{}],4:[function(require,module,exports){
/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iteratee functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/**
 * Creates a base function for `_.forIn` or `_.forInRight`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var iterable = toObject(object),
        props = keysFunc(object),
        length = props.length,
        index = fromRight ? length : -1;

    while ((fromRight ? index-- : ++index < length)) {
      var key = props[index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

/**
 * Converts `value` to an object if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  return isObject(value) ? value : Object(value);
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = baseFor;

},{}],5:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (thisArg === undefined) {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = bindCallback;

},{}],6:[function(require,module,exports){
/**
 * lodash 3.1.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var bindCallback = require('lodash._bindcallback'),
    isIterateeCall = require('lodash._isiterateecall'),
    restParam = require('lodash.restparam');

/**
 * Creates a function that assigns properties of source object(s) to a given
 * destination object.
 *
 * **Note:** This function is used to create `_.assign`, `_.defaults`, and `_.merge`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return restParam(function(object, sources) {
    var index = -1,
        length = object == null ? 0 : sources.length,
        customizer = length > 2 ? sources[length - 2] : undefined,
        guard = length > 2 ? sources[2] : undefined,
        thisArg = length > 1 ? sources[length - 1] : undefined;

    if (typeof customizer == 'function') {
      customizer = bindCallback(customizer, thisArg, 5);
      length -= 2;
    } else {
      customizer = typeof thisArg == 'function' ? thisArg : undefined;
      length -= (customizer ? 1 : 0);
    }
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;

},{"lodash._bindcallback":5,"lodash._isiterateecall":8,"lodash.restparam":16}],7:[function(require,module,exports){
/**
 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = getNative;

},{}],8:[function(require,module,exports){
/**
 * lodash 3.0.9 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if the provided arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
      ? (isArrayLike(object) && isIndex(index, object.length))
      : (type == 'string' && index in object)) {
    var other = object[index];
    return value === value ? (value === other) : (other !== other);
  }
  return false;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isIterateeCall;

},{}],9:[function(require,module,exports){
/**
 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  return isObjectLike(value) && isArrayLike(value) &&
    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
}

module.exports = isArguments;

},{}],10:[function(require,module,exports){
/**
 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var arrayTag = '[object Array]',
    funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = isArray;

},{}],11:[function(require,module,exports){
/**
 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseFor = require('lodash._basefor'),
    isArguments = require('lodash.isarguments'),
    keysIn = require('lodash.keysin');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * The base implementation of `_.forIn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForIn(object, iteratee) {
  return baseFor(object, iteratee, keysIn);
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * **Note:** This method assumes objects created by the `Object` constructor
 * have no inherited enumerable properties.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  var Ctor;

  // Exit early for non `Object` objects.
  if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) ||
      (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
    return false;
  }
  // IE < 9 iterates inherited properties before own properties. If the first
  // iterated property is an object's own property then there are no inherited
  // enumerable properties.
  var result;
  // In most environments an object's own properties are iterated before
  // its inherited properties. If the last iterated property is an object's
  // own property then there are no inherited enumerable properties.
  baseForIn(value, function(subValue, key) {
    result = key;
  });
  return result === undefined || hasOwnProperty.call(value, result);
}

module.exports = isPlainObject;

},{"lodash._basefor":4,"lodash.isarguments":9,"lodash.keysin":14}],12:[function(require,module,exports){
/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dateTag] = typedArrayTags[errorTag] =
typedArrayTags[funcTag] = typedArrayTags[mapTag] =
typedArrayTags[numberTag] = typedArrayTags[objectTag] =
typedArrayTags[regexpTag] = typedArrayTags[setTag] =
typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
}

module.exports = isTypedArray;

},{}],13:[function(require,module,exports){
/**
 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var getNative = require('lodash._getnative'),
    isArguments = require('lodash.isarguments'),
    isArray = require('lodash.isarray');

/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = getNative(Object, 'keys');

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = !!length && isLength(length) &&
    (isArray(object) || isArguments(object));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  var Ctor = object == null ? undefined : object.constructor;
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && isArrayLike(object))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keys;

},{"lodash._getnative":7,"lodash.isarguments":9,"lodash.isarray":10}],14:[function(require,module,exports){
/**
 * lodash 3.0.8 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var isArguments = require('lodash.isarguments'),
    isArray = require('lodash.isarray');

/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

},{"lodash.isarguments":9,"lodash.isarray":10}],15:[function(require,module,exports){
/**
 * lodash 3.3.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var arrayCopy = require('lodash._arraycopy'),
    arrayEach = require('lodash._arrayeach'),
    createAssigner = require('lodash._createassigner'),
    isArguments = require('lodash.isarguments'),
    isArray = require('lodash.isarray'),
    isPlainObject = require('lodash.isplainobject'),
    isTypedArray = require('lodash.istypedarray'),
    keys = require('lodash.keys'),
    toPlainObject = require('lodash.toplainobject');

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.merge` without support for argument juggling,
 * multiple sources, and `this` binding `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates values with source counterparts.
 * @returns {Object} Returns `object`.
 */
function baseMerge(object, source, customizer, stackA, stackB) {
  if (!isObject(object)) {
    return object;
  }
  var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
      props = isSrcArr ? undefined : keys(source);

  arrayEach(props || source, function(srcValue, key) {
    if (props) {
      key = srcValue;
      srcValue = source[key];
    }
    if (isObjectLike(srcValue)) {
      stackA || (stackA = []);
      stackB || (stackB = []);
      baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
    }
    else {
      var value = object[key],
          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
          isCommon = result === undefined;

      if (isCommon) {
        result = srcValue;
      }
      if ((result !== undefined || (isSrcArr && !(key in object))) &&
          (isCommon || (result === result ? (result !== value) : (value === value)))) {
        object[key] = result;
      }
    }
  });
  return object;
}

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates values with source counterparts.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
  var length = stackA.length,
      srcValue = source[key];

  while (length--) {
    if (stackA[length] == srcValue) {
      object[key] = stackB[length];
      return;
    }
  }
  var value = object[key],
      result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
      isCommon = result === undefined;

  if (isCommon) {
    result = srcValue;
    if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
      result = isArray(value)
        ? value
        : (isArrayLike(value) ? arrayCopy(value) : []);
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      result = isArguments(value)
        ? toPlainObject(value)
        : (isPlainObject(value) ? value : {});
    }
    else {
      isCommon = false;
    }
  }
  // Add the source value to the stack of traversed objects and associate
  // it with its merged value.
  stackA.push(srcValue);
  stackB.push(result);

  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
  } else if (result === result ? (result !== value) : (value === value)) {
    object[key] = result;
  }
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Recursively merges own enumerable properties of the source object(s), that
 * don't resolve to `undefined` into the destination object. Subsequent sources
 * overwrite property assignments of previous sources. If `customizer` is
 * provided it is invoked to produce the merged values of the destination and
 * source properties. If `customizer` returns `undefined` merging is handled
 * by the method instead. The `customizer` is bound to `thisArg` and invoked
 * with five arguments: (objectValue, sourceValue, key, object, source).
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var users = {
 *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
 * };
 *
 * var ages = {
 *   'data': [{ 'age': 36 }, { 'age': 40 }]
 * };
 *
 * _.merge(users, ages);
 * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
 *
 * // using a customizer callback
 * var object = {
 *   'fruits': ['apple'],
 *   'vegetables': ['beet']
 * };
 *
 * var other = {
 *   'fruits': ['banana'],
 *   'vegetables': ['carrot']
 * };
 *
 * _.merge(object, other, function(a, b) {
 *   if (_.isArray(a)) {
 *     return a.concat(b);
 *   }
 * });
 * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
 */
var merge = createAssigner(baseMerge);

module.exports = merge;

},{"lodash._arraycopy":1,"lodash._arrayeach":2,"lodash._createassigner":6,"lodash.isarguments":9,"lodash.isarray":10,"lodash.isplainobject":11,"lodash.istypedarray":12,"lodash.keys":13,"lodash.toplainobject":17}],16:[function(require,module,exports){
/**
 * lodash 3.6.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as an array.
 *
 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.restParam(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function restParam(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        rest = Array(length);

    while (++index < length) {
      rest[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, args[0], rest);
      case 2: return func.call(this, args[0], args[1], rest);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = rest;
    return func.apply(this, otherArgs);
  };
}

module.exports = restParam;

},{}],17:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseCopy = require('lodash._basecopy'),
    keysIn = require('lodash.keysin');

/**
 * Converts `value` to a plain object flattening inherited enumerable
 * properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return baseCopy(value, keysIn(value));
}

module.exports = toPlainObject;

},{"lodash._basecopy":3,"lodash.keysin":14}],18:[function(require,module,exports){
/*
    Copyright (c) 2012 DinahMoe AB & Oskar Eriksson

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
    files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
    modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
    is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
    OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function(window) {
    var userContext,
        userInstance,
        pipe = function(param, val) {
            param.value = val;
        },
        Super = Object.create(null, {
            activate: {
                writable: true,
                value: function(doActivate) {
                    if (doActivate) {
                        this.input.disconnect();
                        this.input.connect(this.activateNode);
                        if (this.activateCallback) {
                            this.activateCallback(doActivate);
                        }
                    } else {
                        this.input.disconnect();
                        this.input.connect(this.output);
                    }
                }
            },
            bypass: {
                get: function() {
                    return this._bypass;
                },
                set: function(value) {
                    if (this._lastBypassValue === value) {
                        return;
                    }
                    this._bypass = value;
                    this.activate(!value);
                    this._lastBypassValue = value;
                }
            },
            connect: {
                value: function(target) {
                    this.output.connect(target);
                }
            },
            disconnect: {
                value: function(target) {
                    this.output.disconnect(target);
                }
            },
            connectInOrder: {
                value: function(nodeArray) {
                    var i = nodeArray.length - 1;
                    while (i--) {
                        if (!nodeArray[i].connect) {
                            return console.error("AudioNode.connectInOrder: TypeError: Not an AudioNode.", nodeArray[i]);
                        }
                        if (nodeArray[i + 1].input) {
                            nodeArray[i].connect(nodeArray[i + 1].input);
                        } else {
                            nodeArray[i].connect(nodeArray[i + 1]);
                        }
                    }
                }
            },
            getDefaults: {
                value: function() {
                    var result = {};
                    for (var key in this.defaults) {
                        result[key] = this.defaults[key].value;
                    }
                    return result;
                }
            },
            automate: {
                value: function(property, value, duration, startTime) {
                    var start = startTime ? ~~(startTime / 1000) : userContext.currentTime,
                        dur = duration ? ~~(duration / 1000) : 0,
                        _is = this.defaults[property],
                        param = this[property],
                        method;

                    if (param) {
                        if (_is.automatable) {
                            if (!duration) {
                                method = "setValueAtTime";
                            } else {
                                method = "linearRampToValueAtTime";
                                param.cancelScheduledValues(start);
                                param.setValueAtTime(param.value, start);
                            }
                            param[method](value, dur + start);
                        } else {
                            param = value;
                        }
                    } else {
                        console.error("Invalid Property for " + this.name);
                    }
                }
            }
        }),
        FLOAT = "float",
        BOOLEAN = "boolean",
        STRING = "string",
        INT = "int";

    if (typeof module !== "undefined" && module.exports) {
        module.exports = Tuna;
    } else if (typeof define === "function") {
        window.define("Tuna", definition);
    } else {
        window.Tuna = Tuna;
    }

    function definition() {
        return Tuna;
    }

    function Tuna(context) {
        if (!(this instanceof Tuna)) {
            return new Tuna(context);
        }
        if (!window.AudioContext) {
            window.AudioContext = window.webkitAudioContext;
        }
        if (!context) {
            console.log("tuna.js: Missing audio context! Creating a new context for you.");
            context = window.AudioContext && (new window.AudioContext());
        }
        if (!context) {
            throw new Error("Tuna cannot initialize because this environment does not support web audio.");
        }
        connectify(context);
        userContext = context;
        userInstance = this;
    }

    function connectify(context) {
        if (context.__connectified__ === true) return;

        var gain = context.createGain(),
            proto = Object.getPrototypeOf(Object.getPrototypeOf(gain)),
            oconnect = proto.connect;

        proto.connect = shimConnect;
        context.__connectified__ = true; // Prevent overriding connect more than once

        function shimConnect() {
            var node = Array.prototype.shift.apply(arguments);
            node = Super.isPrototypeOf ? (Super.isPrototypeOf(node) ? node.input : node) : (node.input || node);
            arguments = Array.prototype.slice.call(arguments);
            arguments.unshift(node);
            oconnect.apply(this, arguments);
            return node;
        }
    }

    function dbToWAVolume(db) {
        return Math.max(0, Math.round(100 * Math.pow(2, db / 6)) / 100);
    }

    function fmod(x, y) {
        // http://kevin.vanzonneveld.net
        // *     example 1: fmod(5.7, 1.3);
        // *     returns 1: 0.5
        var tmp, tmp2, p = 0,
            pY = 0,
            l = 0.0,
            l2 = 0.0;

        tmp = x.toExponential().match(/^.\.?(.*)e(.+)$/);
        p = parseInt(tmp[2], 10) - (tmp[1] + "").length;
        tmp = y.toExponential().match(/^.\.?(.*)e(.+)$/);
        pY = parseInt(tmp[2], 10) - (tmp[1] + "").length;

        if (pY > p) {
            p = pY;
        }

        tmp2 = (x % y);

        if (p < -100 || p > 20) {
            // toFixed will give an out of bound error so we fix it like this:
            l = Math.round(Math.log(tmp2) / Math.log(10));
            l2 = Math.pow(10, l);

            return (tmp2 / l2).toFixed(l - p) * l2;
        } else {
            return parseFloat(tmp2.toFixed(-p));
        }
    }

    function sign(x) {
        if (x === 0) {
            return 1;
        } else {
            return Math.abs(x) / x;
        }
    }

    function tanh(n) {
        return (Math.exp(n) - Math.exp(-n)) / (Math.exp(n) + Math.exp(-n));
    }

    function initValue(userVal, defaultVal) {
        return userVal === undefined ? defaultVal : userVal;
    }

    Tuna.prototype.Bitcrusher = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.bufferSize = properties.bufferSize || this.defaults.bufferSize.value;

        this.input = userContext.createGain();
        this.activateNode = userContext.createGain();
        this.processor = userContext.createScriptProcessor(this.bufferSize, 1, 1);
        this.output = userContext.createGain();

        this.activateNode.connect(this.processor);
        this.processor.connect(this.output);

        var phaser = 0,
            last = 0,
            input, output, step, i, length;
        this.processor.onaudioprocess = function(e) {
            input = e.inputBuffer.getChannelData(0),
            output = e.outputBuffer.getChannelData(0),
            step = Math.pow(1 / 2, this.bits);
            length = input.length;
            for (i = 0; i < length; i++) {
                phaser += this.normfreq;
                if (phaser >= 1.0) {
                    phaser -= 1.0;
                    last = step * Math.floor(input[i] / step + 0.5);
                }
                output[i] = last;
            }
        };

        this.bits = properties.bits || this.defaults.bits.value;
        this.normfreq = initValue(properties.normfreq, this.defaults.normfreq.value);
        this.bypass = properties.bypass || false;
    };
    Tuna.prototype.Bitcrusher.prototype = Object.create(Super, {
        name: {
            value: "Bitcrusher"
        },
        defaults: {
            writable: true,
            value: {
                bits: {
                    value: 4,
                    min: 1,
                    max: 16,
                    automatable: false,
                    type: INT
                },
                bufferSize: {
                    value: 4096,
                    min: 256,
                    max: 16384,
                    automatable: false,
                    type: INT
                },
                bypass: {
                    value: true,
                    automatable: false,
                    type: BOOLEAN
                },
                normfreq: {
                    value: 0.1,
                    min: 0.0001,
                    max: 1.0,
                    automatable: false,
                    type: FLOAT
                }
            }
        },
        bits: {
            enumerable: true,
            get: function() {
                return this.processor.bits;
            },
            set: function(value) {
                this.processor.bits = value;
            }
        },
        normfreq: {
            enumerable: true,
            get: function() {
                return this.processor.normfreq;
            },
            set: function(value) {
                this.processor.normfreq = value;
            }
        }
    });

    Tuna.prototype.Cabinet = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.input = userContext.createGain();
        this.activateNode = userContext.createGain();
        this.convolver = this.newConvolver(properties.impulsePath ||
            "../impulses/impulse_guitar.wav");
        this.makeupNode = userContext.createGain();
        this.output = userContext.createGain();

        this.activateNode.connect(this.convolver.input);
        this.convolver.output.connect(this.makeupNode);
        this.makeupNode.connect(this.output);

        this.makeupGain = initValue(properties.makeupGain, this.defaults
            .makeupGain);
        this.bypass = properties.bypass || false;
    };
    Tuna.prototype.Cabinet.prototype = Object.create(Super, {
        name: {
            value: "Cabinet"
        },
        defaults: {
            writable: true,
            value: {
                makeupGain: {
                    value: 1,
                    min: 0,
                    max: 20,
                    automatable: true,
                    type: FLOAT
                },
                bypass: {
                    value: false,
                    automatable: false,
                    type: BOOLEAN
                }
            }
        },
        makeupGain: {
            enumerable: true,
            get: function() {
                return this.makeupNode.gain;
            },
            set: function(value) {
                this.makeupNode.gain.value = value;
            }
        },
        newConvolver: {
            value: function(impulsePath) {
                return new userInstance.Convolver({
                    impulse: impulsePath,
                    dryLevel: 0,
                    wetLevel: 1
                });
            }
        }
    });

    Tuna.prototype.Chorus = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.input = userContext.createGain();
        this.attenuator = this.activateNode = userContext.createGain();
        this.splitter = userContext.createChannelSplitter(2);
        this.delayL = userContext.createDelay();
        this.delayR = userContext.createDelay();
        this.feedbackGainNodeLR = userContext.createGain();
        this.feedbackGainNodeRL = userContext.createGain();
        this.merger = userContext.createChannelMerger(2);
        this.output = userContext.createGain();

        this.lfoL = new userInstance.LFO({
            target: this.delayL.delayTime,
            callback: pipe
        });
        this.lfoR = new userInstance.LFO({
            target: this.delayR.delayTime,
            callback: pipe
        });

        this.input.connect(this.attenuator);
        this.attenuator.connect(this.output);
        this.attenuator.connect(this.splitter);
        this.splitter.connect(this.delayL, 0);
        this.splitter.connect(this.delayR, 1);
        this.delayL.connect(this.feedbackGainNodeLR);
        this.delayR.connect(this.feedbackGainNodeRL);
        this.feedbackGainNodeLR.connect(this.delayR);
        this.feedbackGainNodeRL.connect(this.delayL);
        this.delayL.connect(this.merger, 0, 0);
        this.delayR.connect(this.merger, 0, 1);
        this.merger.connect(this.output);

        this.feedback = initValue(properties.feedback, this.defaults.feedback
            .value);
        this.rate = initValue(properties.rate, this.defaults.rate.value);
        this.delay = initValue(properties.delay, this.defaults.delay.value);
        this.depth = initValue(properties.depth, this.defaults.depth.value);
        this.lfoR.phase = Math.PI / 2;
        this.attenuator.gain.value = 0.6934; // 1 / (10 ^ (((20 * log10(3)) / 3) / 20))
        this.lfoL.activate(true);
        this.lfoR.activate(true);
        this.bypass = properties.bypass || false;
    };
    Tuna.prototype.Chorus.prototype = Object.create(Super, {
        name: {
            value: "Chorus"
        },
        defaults: {
            writable: true,
            value: {
                feedback: {
                    value: 0.4,
                    min: 0,
                    max: 0.95,
                    automatable: false,
                    type: FLOAT
                },
                delay: {
                    value: 0.0045,
                    min: 0,
                    max: 1,
                    automatable: false,
                    type: FLOAT
                },
                depth: {
                    value: 0.7,
                    min: 0,
                    max: 1,
                    automatable: false,
                    type: FLOAT
                },
                rate: {
                    value: 1.5,
                    min: 0,
                    max: 8,
                    automatable: false,
                    type: FLOAT
                },
                bypass: {
                    value: true,
                    automatable: false,
                    type: BOOLEAN
                }
            }
        },
        delay: {
            enumerable: true,
            get: function() {
                return this._delay;
            },
            set: function(value) {
                this._delay = 0.0002 * (Math.pow(10, value) * 2);
                this.lfoL.offset = this._delay;
                this.lfoR.offset = this._delay;
                this._depth = this._depth;
            }
        },
        depth: {
            enumerable: true,
            get: function() {
                return this._depth;
            },
            set: function(value) {
                this._depth = value;
                this.lfoL.oscillation = this._depth * this._delay;
                this.lfoR.oscillation = this._depth * this._delay;
            }
        },
        feedback: {
            enumerable: true,
            get: function() {
                return this._feedback;
            },
            set: function(value) {
                this._feedback = value;
                this.feedbackGainNodeLR.gain.value = this._feedback;
                this.feedbackGainNodeRL.gain.value = this._feedback;
            }
        },
        rate: {
            enumerable: true,
            get: function() {
                return this._rate;
            },
            set: function(value) {
                this._rate = value;
                this.lfoL.frequency = this._rate;
                this.lfoR.frequency = this._rate;
            }
        }
    });

    Tuna.prototype.Compressor = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.input = userContext.createGain();
        this.compNode = this.activateNode = userContext.createDynamicsCompressor();
        this.makeupNode = userContext.createGain();
        this.output = userContext.createGain();

        this.compNode.connect(this.makeupNode);
        this.makeupNode.connect(this.output);

        this.automakeup = initValue(properties.automakeup, this.defaults
            .automakeup
            .value);
        this.makeupGain = properties.makeupGain || this.defaults.makeupGain
            .value;
        this.threshold = initValue(properties.threshold, this.defaults.threshold
            .value);
        this.release = properties.release || this.defaults.release.value;
        this.attack = initValue(properties.attack, this.defaults.attack
            .value);
        this.ratio = properties.ratio || this.defaults.ratio.value;
        this.knee = initValue(properties.knee, this.defaults.knee.value);
        this.bypass = properties.bypass || false;
    };
    Tuna.prototype.Compressor.prototype = Object.create(Super, {
        name: {
            value: "Compressor"
        },
        defaults: {
            writable: true,
            value: {
                threshold: {
                    value: -20,
                    min: -60,
                    max: 0,
                    automatable: true,
                    type: FLOAT
                },
                release: {
                    value: 250,
                    min: 10,
                    max: 2000,
                    automatable: true,
                    type: FLOAT
                },
                makeupGain: {
                    value: 1,
                    min: 1,
                    max: 100,
                    automatable: true,
                    type: FLOAT
                },
                attack: {
                    value: 1,
                    min: 0,
                    max: 1000,
                    automatable: true,
                    type: FLOAT
                },
                ratio: {
                    value: 4,
                    min: 1,
                    max: 50,
                    automatable: true,
                    type: FLOAT
                },
                knee: {
                    value: 5,
                    min: 0,
                    max: 40,
                    automatable: true,
                    type: FLOAT
                },
                automakeup: {
                    value: false,
                    automatable: false,
                    type: BOOLEAN
                },
                bypass: {
                    value: true,
                    automatable: false,
                    type: BOOLEAN
                }
            }
        },
        computeMakeup: {
            value: function() {
                var magicCoefficient = 4,
                    // raise me if the output is too hot
                    c = this.compNode;
                return -(c.threshold.value - c.threshold.value /
                        c.ratio.value) /
                    magicCoefficient;
            }
        },
        automakeup: {
            enumerable: true,
            get: function() {
                return this._automakeup;
            },
            set: function(value) {
                this._automakeup = value;
                if (this._automakeup) this.makeupGain = this.computeMakeup();
            }
        },
        threshold: {
            enumerable: true,
            get: function() {
                return this.compNode.threshold;
            },
            set: function(value) {
                this.compNode.threshold.value = value;
                if (this._automakeup) this.makeupGain = this.computeMakeup();
            }
        },
        ratio: {
            enumerable: true,
            get: function() {
                return this.compNode.ratio;
            },
            set: function(value) {
                this.compNode.ratio.value = value;
                if (this._automakeup) this.makeupGain = this.computeMakeup();
            }
        },
        knee: {
            enumerable: true,
            get: function() {
                return this.compNode.knee;
            },
            set: function(value) {
                this.compNode.knee.value = value;
                if (this._automakeup) this.makeupGain = this.computeMakeup();
            }
        },
        attack: {
            enumerable: true,
            get: function() {
                return this.compNode.attack;
            },
            set: function(value) {
                this.compNode.attack.value = value / 1000;
            }
        },
        release: {
            enumerable: true,
            get: function() {
                return this.compNode.release;
            },
            set: function(value) {
                this.compNode.release = value / 1000;
            }
        },
        makeupGain: {
            enumerable: true,
            get: function() {
                return this.makeupNode.gain;
            },
            set: function(value) {
                this.makeupNode.gain.value = dbToWAVolume(value);
            }
        }
    });

    Tuna.prototype.Convolver = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.input = userContext.createGain();
        this.activateNode = userContext.createGain();
        this.convolver = userContext.createConvolver();
        this.dry = userContext.createGain();
        this.filterLow = userContext.createBiquadFilter();
        this.filterHigh = userContext.createBiquadFilter();
        this.wet = userContext.createGain();
        this.output = userContext.createGain();

        this.activateNode.connect(this.filterLow);
        this.activateNode.connect(this.dry);
        this.filterLow.connect(this.filterHigh);
        this.filterHigh.connect(this.convolver);
        this.convolver.connect(this.wet);
        this.wet.connect(this.output);
        this.dry.connect(this.output);

        this.dryLevel = initValue(properties.dryLevel, this.defaults.dryLevel
            .value);
        this.wetLevel = initValue(properties.wetLevel, this.defaults.wetLevel
            .value);
        this.highCut = properties.highCut || this.defaults.highCut.value;
        this.buffer = properties.impulse ||
            "../impulses/ir_rev_short.wav";
        this.lowCut = properties.lowCut || this.defaults.lowCut.value;
        this.level = initValue(properties.level, this.defaults.level.value);
        this.filterHigh.type = "lowpass";
        this.filterLow.type = "highpass";
        this.bypass = properties.bypass || false;
    };
    Tuna.prototype.Convolver.prototype = Object.create(Super, {
        name: {
            value: "Convolver"
        },
        defaults: {
            writable: true,
            value: {
                highCut: {
                    value: 22050,
                    min: 20,
                    max: 22050,
                    automatable: true,
                    type: FLOAT
                },
                lowCut: {
                    value: 20,
                    min: 20,
                    max: 22050,
                    automatable: true,
                    type: FLOAT
                },
                dryLevel: {
                    value: 1,
                    min: 0,
                    max: 1,
                    automatable: true,
                    type: FLOAT
                },
                wetLevel: {
                    value: 1,
                    min: 0,
                    max: 1,
                    automatable: true,
                    type: FLOAT
                },
                level: {
                    value: 1,
                    min: 0,
                    max: 1,
                    automatable: true,
                    type: FLOAT
                }
            }
        },
        lowCut: {
            get: function() {
                return this.filterLow.frequency;
            },
            set: function(value) {
                this.filterLow.frequency.value = value;
            }
        },
        highCut: {
            get: function() {
                return this.filterHigh.frequency;
            },
            set: function(value) {
                this.filterHigh.frequency.value = value;
            }
        },
        level: {
            get: function() {
                return this.output.gain;
            },
            set: function(value) {
                this.output.gain.value = value;
            }
        },
        dryLevel: {
            get: function() {
                return this.dry.gain
            },
            set: function(value) {
                this.dry.gain.value = value;
            }
        },
        wetLevel: {
            get: function() {
                return this.wet.gain;
            },
            set: function(value) {
                this.wet.gain.value = value;
            }
        },
        buffer: {
            enumerable: false,
            get: function() {
                return this.convolver.buffer;
            },
            set: function(impulse) {
                var convolver = this.convolver,
                    xhr = new XMLHttpRequest();
                if (!impulse) {
                    console.log("Tuna.Convolver.setBuffer: Missing impulse path!");
                    return;
                }
                xhr.open("GET", impulse, true);
                xhr.responseType = "arraybuffer";
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        if (xhr.status < 300 && xhr.status > 199 || xhr.status === 302) {
                            userContext.decodeAudioData(xhr.response, function(buffer) {
                                convolver.buffer = buffer;
                            }, function(e) {
                                if (e) console.log("Tuna.Convolver.setBuffer: Error decoding data" + e);
                            });
                        }
                    }
                };
                xhr.send(null);
            }
        }
    });

    Tuna.prototype.Delay = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.input = userContext.createGain();
        this.activateNode = userContext.createGain();
        this.dry = userContext.createGain();
        this.wet = userContext.createGain();
        this.filter = userContext.createBiquadFilter();
        this.delay = userContext.createDelay();
        this.feedbackNode = userContext.createGain();
        this.output = userContext.createGain();

        this.activateNode.connect(this.delay);
        this.activateNode.connect(this.dry);
        this.delay.connect(this.filter);
        this.filter.connect(this.feedbackNode);
        this.feedbackNode.connect(this.delay);
        this.feedbackNode.connect(this.wet);
        this.wet.connect(this.output);
        this.dry.connect(this.output);

        this.delayTime = properties.delayTime || this.defaults.delayTime.value;
        this.feedback = initValue(properties.feedback, this.defaults.feedback.value);
        this.wetLevel = initValue(properties.wetLevel, this.defaults.wetLevel.value);
        this.dryLevel = initValue(properties.dryLevel, this.defaults.dryLevel.value);
        this.cutoff = properties.cutoff || this.defaults.cutoff.value;
        this.filter.type = "lowpass";
        this.bypass = properties.bypass || false;
    };
    Tuna.prototype.Delay.prototype = Object.create(Super, {
        name: {
            value: "Delay"
        },
        defaults: {
            writable: true,
            value: {
                delayTime: {
                    value: 100,
                    min: 20,
                    max: 1000,
                    automatable: false,
                    type: FLOAT
                },
                feedback: {
                    value: 0.45,
                    min: 0,
                    max: 0.9,
                    automatable: true,
                    type: FLOAT
                },
                cutoff: {
                    value: 20000,
                    min: 20,
                    max: 20000,
                    automatable: true,
                    type: FLOAT
                },
                wetLevel: {
                    value: 0.5,
                    min: 0,
                    max: 1,
                    automatable: true,
                    type: FLOAT
                },
                dryLevel: {
                    value: 1,
                    min: 0,
                    max: 1,
                    automatable: true,
                    type: FLOAT
                }
            }
        },
        delayTime: {
            enumerable: true,
            get: function() {
                return this.delay.delayTime;
            },
            set: function(value) {
                this.delay.delayTime.value = value / 1000;
            }
        },
        wetLevel: {
            enumerable: true,
            get: function() {
                return this.wet.gain;
            },
            set: function(value) {
                this.wet.gain.value = value;
            }
        },
        dryLevel: {
            enumerable: true,
            get: function() {
                return this.dry.gain;
            },
            set: function(value) {
                this.dry.gain.value = value;
            }
        },
        feedback: {
            enumerable: true,
            get: function() {
                return this.feedbackNode.gain;
            },
            set: function(value) {
                this.feedbackNode.gain.value = value;
            }
        },
        cutoff: {
            enumerable: true,
            get: function() {
                return this.filter.frequency;
            },
            set: function(value) {
                this.filter.frequency.value = value;
            }
        }
    });

    Tuna.prototype.Filter = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.input = userContext.createGain();
        this.activateNode = userContext.createGain();
        this.filter = userContext.createBiquadFilter();
        this.output = userContext.createGain();

        this.activateNode.connect(this.filter);
        this.filter.connect(this.output);

        this.frequency = properties.frequency || this.defaults.frequency
            .value;
        this.Q = properties.resonance || this.defaults.Q.value;
        this.filterType = initValue(properties.filterType, this.defaults
            .filterType
            .value);
        this.gain = initValue(properties.gain, this.defaults.gain.value);
        this.bypass = properties.bypass || false;
    };
    Tuna.prototype.Filter.prototype = Object.create(Super, {
        name: {
            value: "Filter"
        },
        defaults: {
            writable: true,
            value: {
                frequency: {
                    value: 800,
                    min: 20,
                    max: 22050,
                    automatable: true,
                    type: FLOAT
                },
                Q: {
                    value: 1,
                    min: 0.001,
                    max: 100,
                    automatable: true,
                    type: FLOAT
                },
                gain: {
                    value: 0,
                    min: -40,
                    max: 40,
                    automatable: true,
                    type: FLOAT
                },
                bypass: {
                    value: true,
                    automatable: false,
                    type: BOOLEAN
                },
                filterType: {
                    value: "lowpass",
                    automatable: false,
                    type: STRING
                }
            }
        },
        filterType: {
            enumerable: true,
            get: function() {
                return this.filter.type;
            },
            set: function(value) {
                this.filter.type = value;
            }
        },
        Q: {
            enumerable: true,
            get: function() {
                return this.filter.Q;
            },
            set: function(value) {
                this.filter.Q.value = value;
            }
        },
        gain: {
            enumerable: true,
            get: function() {
                return this.filter.gain;
            },
            set: function(value) {
                this.filter.gain.value = value;
            }
        },
        frequency: {
            enumerable: true,
            get: function() {
                return this.filter.frequency;
            },
            set: function(value) {
                this.filter.frequency.value = value;
            }
        }
    });

    Tuna.prototype.MoogFilter = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.bufferSize = properties.bufferSize || this.defaults.bufferSize
            .value;

        this.input = userContext.createGain();
        this.activateNode = userContext.createGain();
        this.processor = userContext.createScriptProcessor(this.bufferSize,
            1,
            1);
        this.output = userContext.createGain();

        this.activateNode.connect(this.processor);
        this.processor.connect(this.output);

        var in1, in2, in3, in4, out1, out2, out3, out4;
        in1 = in2 = in3 = in4 = out1 = out2 = out3 = out4 = 0.0;
        var input, output, f, fb, i, length;
        this.processor.onaudioprocess = function(e) {
            input = e.inputBuffer.getChannelData(0),
                output = e.outputBuffer.getChannelData(0),
                f = this.cutoff * 1.16,
                inputFactor = 0.35013 * (f * f) * (f * f);
            fb = this.resonance * (1.0 - 0.15 * f * f);
            length = input.length;
            for (i = 0; i < length; i++) {
                input[i] -= out4 * fb;
                input[i] *= inputFactor;
                out1 = input[i] + 0.3 * in1 + (1 - f) * out1; // Pole 1
                in1 = input[i];
                out2 = out1 + 0.3 * in2 + (1 - f) * out2; // Pole 2
                in2 = out1;
                out3 = out2 + 0.3 * in3 + (1 - f) * out3; // Pole 3
                in3 = out2;
                out4 = out3 + 0.3 * in4 + (1 - f) * out4; // Pole 4
                in4 = out3;
                output[i] = out4;
            }
        };

        this.cutoff = initValue(properties.cutoff, this.defaults.cutoff
            .value);
        this.resonance = initValue(properties.resonance, this.defaults.resonance
            .value);
        this.bypass = properties.bypass || false;
    };
    Tuna.prototype.MoogFilter.prototype = Object.create(Super, {
        name: {
            value: "MoogFilter"
        },
        defaults: {
            writable: true,
            value: {
                bufferSize: {
                    value: 4096,
                    min: 256,
                    max: 16384,
                    automatable: false,
                    type: INT
                },
                bypass: {
                    value: false,
                    automatable: false,
                    type: BOOLEAN
                },
                cutoff: {
                    value: 0.065,
                    min: 0.0001,
                    max: 1.0,
                    automatable: false,
                    type: FLOAT
                },
                resonance: {
                    value: 3.5,
                    min: 0.0,
                    max: 4.0,
                    automatable: false,
                    type: FLOAT
                }
            }
        },
        cutoff: {
            enumerable: true,
            get: function() {
                return this.processor.cutoff;
            },
            set: function(value) {
                this.processor.cutoff = value;
            }
        },
        resonance: {
            enumerable: true,
            get: function() {
                return this.processor.resonance;
            },
            set: function(value) {
                this.processor.resonance = value;
            }
        }
    });

    Tuna.prototype.Overdrive = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.input = userContext.createGain();
        this.activateNode = userContext.createGain();
        this.inputDrive = userContext.createGain();
        this.waveshaper = userContext.createWaveShaper();
        this.outputDrive = userContext.createGain();
        this.output = userContext.createGain();

        this.activateNode.connect(this.inputDrive);
        this.inputDrive.connect(this.waveshaper);
        this.waveshaper.connect(this.outputDrive);
        this.outputDrive.connect(this.output);

        this.ws_table = new Float32Array(this.k_nSamples);
        this.drive = initValue(properties.drive, this.defaults.drive.value);
        this.outputGain = initValue(properties.outputGain, this.defaults
            .outputGain
            .value);
        this.curveAmount = initValue(properties.curveAmount, this.defaults
            .curveAmount
            .value);
        this.algorithmIndex = initValue(properties.algorithmIndex, this
            .defaults
            .algorithmIndex.value);
        this.bypass = properties.bypass || false;
    };
    Tuna.prototype.Overdrive.prototype = Object.create(Super, {
        name: {
            value: "Overdrive"
        },
        defaults: {
            writable: true,
            value: {
                drive: {
                    value: 1,
                    min: 0,
                    max: 1,
                    automatable: true,
                    type: FLOAT,
                    scaled: true
                },
                outputGain: {
                    value: 1,
                    min: 0,
                    max: 1,
                    automatable: true,
                    type: FLOAT,
                    scaled: true
                },
                curveAmount: {
                    value: 0.725,
                    min: 0,
                    max: 1,
                    automatable: false,
                    type: FLOAT
                },
                algorithmIndex: {
                    value: 0,
                    min: 0,
                    max: 5,
                    automatable: false,
                    type: INT
                }
            }
        },
        k_nSamples: {
            value: 8192
        },
        drive: {
            get: function() {
                return this.inputDrive.gain;
            },
            set: function(value) {
                this._drive = value;
            }
        },
        curveAmount: {
            get: function() {
                return this._curveAmount;
            },
            set: function(value) {
                this._curveAmount = value;
                if (this._algorithmIndex === undefined) {
                    this._algorithmIndex = 0;
                }
                this.waveshaperAlgorithms[this._algorithmIndex]
                    (this._curveAmount,
                        this.k_nSamples, this.ws_table);
                this.waveshaper.curve = this.ws_table;
            }
        },
        outputGain: {
            get: function() {
                return this.outputDrive.gain;
            },
            set: function(value) {
                this._outputGain = dbToWAVolume(value);
            }
        },
        algorithmIndex: {
            get: function() {
                return this._algorithmIndex;
            },
            set: function(value) {
                this._algorithmIndex = value;
                this.curveAmount = this._curveAmount;
            }
        },
        waveshaperAlgorithms: {
            value: [
                function(amount, n_samples, ws_table) {
                    amount = Math.min(amount, 0.9999);
                    var k = 2 * amount / (1 - amount),
                        i, x;
                    for (i = 0; i < n_samples; i++) {
                        x = i * 2 / n_samples - 1;
                        ws_table[i] = (1 + k) * x / (1 + k * Math.abs(x));
                    }
                },
                function(amount, n_samples, ws_table) {
                    var i, x, y;
                    for (i = 0; i < n_samples; i++) {
                        x = i * 2 / n_samples - 1;
                        y = ((0.5 * Math.pow((x + 1.4), 2)) - 1) * y >= 0 ? 5.8 : 1.2;
                        ws_table[i] = tanh(y);
                    }
                },
                function(amount, n_samples, ws_table) {
                    var i, x, y, a = 1 - amount;
                    for (i = 0; i < n_samples; i++) {
                        x = i * 2 / n_samples - 1;
                        y = x < 0 ? -Math.pow(Math.abs(x), a + 0.04) : Math.pow(x, a);
                        ws_table[i] = tanh(y * 2);
                    }
                },
                function(amount, n_samples, ws_table) {
                    var i, x, y, abx, a = 1 - amount > 0.99 ? 0.99 : 1 - amount;
                    for (i = 0; i < n_samples; i++) {
                        x = i * 2 / n_samples - 1;
                        abx = Math.abs(x);
                        if (abx < a) y = abx;
                        else if (abx > a) y = a + (abx - a) / (1 + Math.pow((abx - a) / (1 - a), 2));
                        else if (abx > 1) y = abx;
                        ws_table[i] = sign(x) * y * (1 / ((a + 1) / 2));
                    }
                },
                function(amount, n_samples, ws_table) { // fixed curve, amount doesn't do anything, the distortion is just from the drive
                    var i, x;
                    for (i = 0; i < n_samples; i++) {
                        x = i * 2 / n_samples - 1;
                        if (x < -0.08905) {
                            ws_table[i] = (-3 / 4) * (1 - (Math.pow((1 - (Math.abs(x) - 0.032857)), 12)) + (1 / 3) * (Math.abs(x) -
                                0.032847)) + 0.01;
                        } else if (x >= -0.08905 && x < 0.320018) {
                            ws_table[i] = (-6.153 * (x * x)) + 3.9375 * x;
                        } else {
                            ws_table[i] = 0.630035;
                        }
                    }
                },
                function(amount, n_samples, ws_table) {
                    var a = 2 + Math.round(amount * 14),
                        // we go from 2 to 16 bits, keep in mind for the UI
                        bits = Math.round(Math.pow(2, a - 1)),
                        // real number of quantization steps divided by 2
                        i, x;
                    for (i = 0; i < n_samples; i++) {
                        x = i * 2 / n_samples - 1;
                        ws_table[i] = Math.round(x * bits) / bits;
                    }
                }
            ]
        }
    });

    Tuna.prototype.Phaser = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.input = userContext.createGain();
        this.splitter = this.activateNode = userContext.createChannelSplitter(2);
        this.filtersL = [];
        this.filtersR = [];
        this.feedbackGainNodeL = userContext.createGain();
        this.feedbackGainNodeR = userContext.createGain();
        this.merger = userContext.createChannelMerger(2);
        this.filteredSignal = userContext.createGain();
        this.output = userContext.createGain();
        this.lfoL = new userInstance.LFO({
            target: this.filtersL,
            callback: this.callback
        });
        this.lfoR = new userInstance.LFO({
            target: this.filtersR,
            callback: this.callback
        });

        var i = this.stage;
        while (i--) {
            this.filtersL[i] = userContext.createBiquadFilter();
            this.filtersR[i] = userContext.createBiquadFilter();
            this.filtersL[i].type = "allpass";
            this.filtersR[i].type = "allpass";
        }
        this.input.connect(this.splitter);
        this.input.connect(this.output);
        this.splitter.connect(this.filtersL[0], 0, 0);
        this.splitter.connect(this.filtersR[0], 1, 0);
        this.connectInOrder(this.filtersL);
        this.connectInOrder(this.filtersR);
        this.filtersL[this.stage - 1].connect(this.feedbackGainNodeL);
        this.filtersL[this.stage - 1].connect(this.merger, 0, 0);
        this.filtersR[this.stage - 1].connect(this.feedbackGainNodeR);
        this.filtersR[this.stage - 1].connect(this.merger, 0, 1);
        this.feedbackGainNodeL.connect(this.filtersL[0]);
        this.feedbackGainNodeR.connect(this.filtersR[0]);
        this.merger.connect(this.output);

        this.rate = initValue(properties.rate, this.defaults.rate.value);
        this.baseModulationFrequency = properties.baseModulationFrequency || this.defaults.baseModulationFrequency.value;
        this.depth = initValue(properties.depth, this.defaults.depth.value);
        this.feedback = initValue(properties.feedback, this.defaults.feedback.value);
        this.stereoPhase = initValue(properties.stereoPhase, this.defaults.stereoPhase.value);

        this.lfoL.activate(true);
        this.lfoR.activate(true);
        this.bypass = properties.bypass || false;
    };
    Tuna.prototype.Phaser.prototype = Object.create(Super, {
        name: {
            value: "Phaser"
        },
        stage: {
            value: 4
        },
        defaults: {
            writable: true,
            value: {
                rate: {
                    value: 0.1,
                    min: 0,
                    max: 8,
                    automatable: false,
                    type: FLOAT
                },
                depth: {
                    value: 0.6,
                    min: 0,
                    max: 1,
                    automatable: false,
                    type: FLOAT
                },
                feedback: {
                    value: 0.7,
                    min: 0,
                    max: 1,
                    automatable: false,
                    type: FLOAT
                },
                stereoPhase: {
                    value: 40,
                    min: 0,
                    max: 180,
                    automatable: false,
                    type: FLOAT
                },
                baseModulationFrequency: {
                    value: 700,
                    min: 500,
                    max: 1500,
                    automatable: false,
                    type: FLOAT
                }
            }
        },
        callback: {
            value: function(filters, value) {
                for (var stage = 0; stage < 4; stage++) {
                    filters[stage].frequency.value = value;
                }
            }
        },
        depth: {
            get: function() {
                return this._depth;
            },
            set: function(value) {
                this._depth = value;
                this.lfoL.oscillation = this._baseModulationFrequency * this._depth;
                this.lfoR.oscillation = this._baseModulationFrequency * this._depth;
            }
        },
        rate: {
            get: function() {
                return this._rate;
            },
            set: function(value) {
                this._rate = value;
                this.lfoL.frequency = this._rate;
                this.lfoR.frequency = this._rate;
            }
        },
        baseModulationFrequency: {
            enumerable: true,
            get: function() {
                return this._baseModulationFrequency;
            },
            set: function(value) {
                this._baseModulationFrequency = value;
                this.lfoL.offset = this._baseModulationFrequency;
                this.lfoR.offset = this._baseModulationFrequency;
                this._depth = this._depth;
            }
        },
        feedback: {
            get: function() {
                return this._feedback;
            },
            set: function(value) {
                this._feedback = value;
                this.feedbackGainNodeL.gain.value = this._feedback;
                this.feedbackGainNodeR.gain.value = this._feedback;
            }
        },
        stereoPhase: {
            get: function() {
                return this._stereoPhase;
            },
            set: function(value) {
                this._stereoPhase = value;
                var newPhase = this.lfoL._phase + this._stereoPhase *
                    Math.PI /
                    180;
                newPhase = fmod(newPhase, 2 * Math.PI);
                this.lfoR._phase = newPhase;
            }
        }
    });

    Tuna.prototype.PingPongDelay = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.input = userContext.createGain();
        this.wetLevel = userContext.createGain();
        this.stereoToMonoMix = userContext.createGain();
        this.feedbackLevel = userContext.createGain();
        this.output = userContext.createGain();
        this.delayLeft = userContext.createDelay();
        this.delayRight = userContext.createDelay();

        this.activateNode = userContext.createGain();
        this.splitter = userContext.createChannelSplitter(2);
        this.merger = userContext.createChannelMerger(2);

        this.activateNode.connect(this.splitter);
        this.splitter.connect(this.stereoToMonoMix, 0, 0);
        this.splitter.connect(this.stereoToMonoMix, 1, 0);
        this.stereoToMonoMix.gain.value = .5;
        this.stereoToMonoMix.connect(this.wetLevel);
        this.wetLevel.connect(this.delayLeft);
        this.feedbackLevel.connect(this.delayLeft);
        this.delayLeft.connect(this.delayRight);
        this.delayRight.connect(this.feedbackLevel);
        this.delayLeft.connect(this.merger, 0, 0);
        this.delayRight.connect(this.merger, 0, 1);
        this.merger.connect(this.output);
        this.activateNode.connect(this.output);

        this.delayTimeLeft = properties.delayTimeLeft !== undefined ? properties.delayTimeLeft : this.defaults.delayTimeLeft.value;
        this.delayTimeRight = properties.delayTimeRight !== undefined ? properties.delayTimeRight : this.defaults.delayTimeRight.value;
        this.feedbackLevel.gain.value = properties.feedback !== undefined ? properties.feedback : this.defaults.feedback.value;
        this.wetLevel.gain.value = properties.wetLevel !== undefined ? properties.wetLevel : this.defaults.wetLevel.value;
        this.bypass = properties.bypass || false;
    };
    Tuna.prototype.PingPongDelay.prototype = Object.create(Super, {
        name: {
            value: "PingPongDelay"
        },
        delayTimeLeft: {
            enumerable: true,
            get: function() {
                return this._delayTimeLeft;
            },
            set: function(value) {
                this._delayTimeLeft = value;
                this.delayLeft.delayTime.value = value / 1000;
            }
        },
        delayTimeRight: {
            enumerable: true,
            get: function() {
                return this._delayTimeRight;
            },
            set: function(value) {
                this._delayTimeRight = value;
                this.delayRight.delayTime.value = value / 1000;
            }
        },
        defaults: {
            writable: true,
            value: {
                delayTimeLeft: {
                    value: 200,
                    min: 1,
                    max: 10000,
                    automatable: false,
                    type: INT
                },
                delayTimeRight: {
                    value: 400,
                    min: 1,
                    max: 10000,
                    automatable: false,
                    type: INT
                },
                feedback: {
                    value: 0.3,
                    min: 0,
                    max: 1,
                    automatable: false,
                    type: FLOAT
                },
                wetLevel: {
                    value: 0.5,
                    min: 0,
                    max: 1,
                    automatable: false,
                    type: FLOAT
                }
            }
        }
    });

    Tuna.prototype.Tremolo = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.input = userContext.createGain();
        this.splitter = this.activateNode = userContext.createChannelSplitter(
                2),
            this.amplitudeL = userContext.createGain(), this.amplitudeR =
            userContext.createGain(), this.merger = userContext.createChannelMerger(
                2), this.output = userContext.createGain();
        this.lfoL = new userInstance.LFO({
            target: this.amplitudeL.gain,
            callback: pipe
        });
        this.lfoR = new userInstance.LFO({
            target: this.amplitudeR.gain,
            callback: pipe
        });

        this.input.connect(this.splitter);
        this.splitter.connect(this.amplitudeL, 0);
        this.splitter.connect(this.amplitudeR, 1);
        this.amplitudeL.connect(this.merger, 0, 0);
        this.amplitudeR.connect(this.merger, 0, 1);
        this.merger.connect(this.output);

        this.rate = properties.rate || this.defaults.rate.value;
        this.intensity = initValue(properties.intensity, this.defaults.intensity
            .value);
        this.stereoPhase = initValue(properties.stereoPhase, this.defaults
            .stereoPhase
            .value);

        this.lfoL.offset = 1 - (this.intensity / 2);
        this.lfoR.offset = 1 - (this.intensity / 2);
        this.lfoL.phase = this.stereoPhase * Math.PI / 180;

        this.lfoL.activate(true);
        this.lfoR.activate(true);
        this.bypass = properties.bypass || false;
    };
    Tuna.prototype.Tremolo.prototype = Object.create(Super, {
        name: {
            value: "Tremolo"
        },
        defaults: {
            writable: true,
            value: {
                intensity: {
                    value: 0.3,
                    min: 0,
                    max: 1,
                    automatable: false,
                    type: FLOAT
                },
                stereoPhase: {
                    value: 0,
                    min: 0,
                    max: 180,
                    automatable: false,
                    type: FLOAT
                },
                rate: {
                    value: 5,
                    min: 0.1,
                    max: 11,
                    automatable: false,
                    type: FLOAT
                }
            }
        },
        intensity: {
            enumerable: true,
            get: function() {
                return this._intensity;
            },
            set: function(value) {
                this._intensity = value;
                this.lfoL.offset = 1 - this._intensity / 2;
                this.lfoR.offset = 1 - this._intensity / 2;
                this.lfoL.oscillation = this._intensity;
                this.lfoR.oscillation = this._intensity;
            }
        },
        rate: {
            enumerable: true,
            get: function() {
                return this._rate;
            },
            set: function(value) {
                this._rate = value;
                this.lfoL.frequency = this._rate;
                this.lfoR.frequency = this._rate;
            }
        },
        stereoPhase: {
            enumerable: true,
            get: function() {
                return this._rate;
            },
            set: function(value) {
                this._stereoPhase = value;
                var newPhase = this.lfoL._phase + this._stereoPhase *
                    Math.PI /
                    180;
                newPhase = fmod(newPhase, 2 * Math.PI);
                this.lfoR.phase = newPhase;
            }
        }
    });

    Tuna.prototype.WahWah = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.input = userContext.createGain();
        this.activateNode = userContext.createGain();
        this.envelopeFollower = new userInstance.EnvelopeFollower({
            target: this,
            callback: function(context, value) {
                context.sweep = value;
            }
        });
        this.filterBp = userContext.createBiquadFilter();
        this.filterPeaking = userContext.createBiquadFilter();
        this.output = userContext.createGain();

        //Connect AudioNodes
        this.activateNode.connect(this.filterBp);
        this.filterBp.connect(this.filterPeaking);
        this.filterPeaking.connect(this.output);

        //Set Properties
        this.init();
        this.automode = initValue(properties.enableAutoMode, this.defaults
            .automode
            .value);
        this.resonance = properties.resonance || this.defaults.resonance
            .value;
        this.sensitivity = initValue(properties.sensitivity, this.defaults
            .sensitivity
            .value);
        this.baseFrequency = initValue(properties.baseFrequency, this.defaults
            .baseFrequency
            .value);
        this.excursionOctaves = properties.excursionOctaves || this.defaults
            .excursionOctaves
            .value;
        this.sweep = initValue(properties.sweep, this.defaults.sweep.value);

        this.activateNode.gain.value = 2;
        this.envelopeFollower.activate(true);
        this.bypass = properties.bypass || false;
    };
    Tuna.prototype.WahWah.prototype = Object.create(Super, {
        name: {
            value: "WahWah"
        },
        defaults: {
            writable: true,
            value: {
                automode: {
                    value: true,
                    automatable: false,
                    type: BOOLEAN
                },
                baseFrequency: {
                    value: 0.5,
                    min: 0,
                    max: 1,
                    automatable: false,
                    type: FLOAT
                },
                excursionOctaves: {
                    value: 2,
                    min: 1,
                    max: 6,
                    automatable: false,
                    type: FLOAT
                },
                sweep: {
                    value: 0.2,
                    min: 0,
                    max: 1,
                    automatable: false,
                    type: FLOAT
                },
                resonance: {
                    value: 10,
                    min: 1,
                    max: 100,
                    automatable: false,
                    type: FLOAT
                },
                sensitivity: {
                    value: 0.5,
                    min: -1,
                    max: 1,
                    automatable: false,
                    type: FLOAT
                }
            }
        },
        activateCallback: {
            value: function(value) {
                this.automode = value;
            }
        },
        automode: {
            get: function() {
                return this._automode;
            },
            set: function(value) {
                this._automode = value;
                if (value) {
                    this.activateNode.connect(this.envelopeFollower.input);
                    this.envelopeFollower.activate(true);
                } else {
                    this.envelopeFollower.activate(false);
                    this.activateNode.disconnect();
                    this.activateNode.connect(this.filterBp);
                }
            }
        },
        filterFreqTimeout: {
            value: 0
        },
        setFilterFreq: {
            value: function() {
                try {
                    this.filterBp.frequency.value = this._baseFrequency + this._excursionFrequency * this._sweep;
                    this.filterPeaking.frequency.value = this._baseFrequency + this._excursionFrequency * this._sweep;
                } catch (e) {
                    clearTimeout(this.filterFreqTimeout);
                    //put on the next cycle to let all init properties be set
                    this.filterFreqTimeout = setTimeout(function() {
                        this.setFilterFreq();
                    }.bind(this), 0);
                }
            }
        },
        sweep: {
            enumerable: true,
            get: function() {
                return this._sweep.value;
            },
            set: function(value) {
                this._sweep = Math.pow(value > 1 ? 1 : value <
                    0 ? 0 :
                    value,
                    this._sensitivity);
                this.setFilterFreq();
            }
        },
        baseFrequency: {
            enumerable: true,
            get: function() {
                return this._baseFrequency;
            },
            set: function(value) {
                this._baseFrequency = 50 * Math.pow(10, value *
                    2);
                this._excursionFrequency = Math.min(userContext
                    .sampleRate /
                    2,
                    this.baseFrequency * Math.pow(2, this._excursionOctaves)
                );
                this.setFilterFreq();
            }
        },
        excursionOctaves: {
            enumerable: true,
            get: function() {
                return this._excursionOctaves;
            },
            set: function(value) {
                this._excursionOctaves = value;
                this._excursionFrequency = Math.min(userContext
                    .sampleRate /
                    2,
                    this.baseFrequency * Math.pow(2, this._excursionOctaves)
                );
                this.setFilterFreq();
            }
        },
        sensitivity: {
            enumerable: true,
            get: function() {
                return this._sensitivity;
            },
            set: function(value) {
                this._sensitivity = Math.pow(10, value);
            }
        },
        resonance: {
            enumerable: true,
            get: function() {
                return this._resonance;
            },
            set: function(value) {
                this._resonance = value;
                this.filterPeaking.Q = this._resonance;
            }
        },
        init: {
            value: function() {
                this.output.gain.value = 1;
                this.filterPeaking.type = "peaking";
                this.filterBp.type = "bandpass";
                this.filterPeaking.frequency.value = 100;
                this.filterPeaking.gain.value = 20;
                this.filterPeaking.Q.value = 5;
                this.filterBp.frequency.value = 100;
                this.filterBp.Q.value = 1;
            }
        }
    });

    Tuna.prototype.EnvelopeFollower = function(properties) {
        if (!properties) {
            properties = this.getDefaults();
        }
        this.input = userContext.createGain();
        this.jsNode = this.output = userContext.createScriptProcessor(
            this.buffersize,
            1, 1);

        this.input.connect(this.output);

        this.attackTime = initValue(properties.attackTime, this.defaults
            .attackTime
            .value);
        this.releaseTime = initValue(properties.releaseTime, this.defaults
            .releaseTime
            .value);
        this._envelope = 0;
        this.target = properties.target || {};
        this.callback = properties.callback || function() {};
    };
    Tuna.prototype.EnvelopeFollower.prototype = Object.create(Super, {
        name: {
            value: "EnvelopeFollower"
        },
        defaults: {
            value: {
                attackTime: {
                    value: 0.003,
                    min: 0,
                    max: 0.5,
                    automatable: false,
                    type: FLOAT
                },
                releaseTime: {
                    value: 0.5,
                    min: 0,
                    max: 0.5,
                    automatable: false,
                    type: FLOAT
                }
            }
        },
        buffersize: {
            value: 256
        },
        envelope: {
            value: 0
        },
        sampleRate: {
            value: 44100
        },
        attackTime: {
            enumerable: true,
            get: function() {
                return this._attackTime;
            },
            set: function(value) {
                this._attackTime = value;
                this._attackC = Math.exp(-1 / this._attackTime *
                    this.sampleRate /
                    this.buffersize);
            }
        },
        releaseTime: {
            enumerable: true,
            get: function() {
                return this._releaseTime;
            },
            set: function(value) {
                this._releaseTime = value;
                this._releaseC = Math.exp(-1 / this._releaseTime *
                    this.sampleRate /
                    this.buffersize);
            }
        },
        callback: {
            get: function() {
                return this._callback;
            },
            set: function(value) {
                if (typeof value === "function") {
                    this._callback = value;
                } else {
                    console.error("tuna.js: " + this.name +
                        ": Callback must be a function!");
                }
            }
        },
        target: {
            get: function() {
                return this._target;
            },
            set: function(value) {
                this._target = value;
            }
        },
        activate: {
            value: function(doActivate) {
                this.activated = doActivate;
                if (doActivate) {
                    this.jsNode.connect(userContext.destination);
                    this.jsNode.onaudioprocess = this.returnCompute(
                        this);
                } else {
                    this.jsNode.disconnect();
                    this.jsNode.onaudioprocess = null;
                }
            }
        },
        returnCompute: {
            value: function(instance) {
                return function(event) {
                    instance.compute(event);
                };
            }
        },
        compute: {
            value: function(event) {
                var count = event.inputBuffer.getChannelData(0)
                    .length,
                    channels = event.inputBuffer.numberOfChannels,
                    current, chan, rms, i;
                chan = rms = i = 0;
                if (channels > 1) { //need to mixdown
                    for (i = 0; i < count; ++i) {
                        for (; chan < channels; ++chan) {
                            current = event.inputBuffer.getChannelData(chan)[i];
                            rms += (current * current) / channels;
                        }
                    }
                } else {
                    for (i = 0; i < count; ++i) {
                        current = event.inputBuffer.getChannelData(0)[i];
                        rms += (current * current);
                    }
                }
                rms = Math.sqrt(rms);

                if (this._envelope < rms) {
                    this._envelope *= this._attackC;
                    this._envelope += (1 - this._attackC) * rms;
                } else {
                    this._envelope *= this._releaseC;
                    this._envelope += (1 - this._releaseC) *
                        rms;
                }
                this._callback(this._target, this._envelope);
            }
        }
    });

    Tuna.prototype.LFO = function(properties) {
        //Instantiate AudioNode
        this.output = userContext.createScriptProcessor(256, 1, 1);
        this.activateNode = userContext.destination;

        //Set Properties
        this.frequency = initValue(properties.frequency, this.defaults.frequency
            .value);
        this.offset = initValue(properties.offset, this.defaults.offset.value);
        this.oscillation = initValue(properties.oscillation, this.defaults
            .oscillation
            .value);
        this.phase = initValue(properties.phase, this.defaults.phase.value);
        this.target = properties.target || {};
        this.output.onaudioprocess = this.callback(properties.callback ||
            function() {});
        this.bypass = properties.bypass || false;
    };
    Tuna.prototype.LFO.prototype = Object.create(Super, {
        name: {
            value: "LFO"
        },
        bufferSize: {
            value: 256
        },
        sampleRate: {
            value: 44100
        },
        defaults: {
            value: {
                frequency: {
                    value: 1,
                    min: 0,
                    max: 20,
                    automatable: false,
                    type: FLOAT
                },
                offset: {
                    value: 0.85,
                    min: 0,
                    max: 22049,
                    automatable: false,
                    type: FLOAT
                },
                oscillation: {
                    value: 0.3,
                    min: -22050,
                    max: 22050,
                    automatable: false,
                    type: FLOAT
                },
                phase: {
                    value: 0,
                    min: 0,
                    max: 2 * Math.PI,
                    automatable: false,
                    type: FLOAT
                }
            }
        },
        frequency: {
            get: function() {
                return this._frequency;
            },
            set: function(value) {
                this._frequency = value;
                this._phaseInc = 2 * Math.PI * this._frequency *
                    this.bufferSize /
                    this.sampleRate;
            }
        },
        offset: {
            get: function() {
                return this._offset;
            },
            set: function(value) {
                this._offset = value;
            }
        },
        oscillation: {
            get: function() {
                return this._oscillation;
            },
            set: function(value) {
                this._oscillation = value;
            }
        },
        phase: {
            get: function() {
                return this._phase;
            },
            set: function(value) {
                this._phase = value;
            }
        },
        target: {
            get: function() {
                return this._target;
            },
            set: function(value) {
                this._target = value;
            }
        },
        activate: {
            value: function(doActivate) {
                if (!doActivate) {
                    this.output.disconnect(userContext.destination);
                } else {
                    this.output.connect(userContext.destination);
                }
            }
        },
        callback: {
            value: function(callback) {
                var that = this;
                return function() {
                    that._phase += that._phaseInc;
                    if (that._phase > 2 * Math.PI) {
                        that._phase = 0;
                    }
                    callback(that._target, that._offset +
                        that._oscillation *
                        Math.sin(that._phase));
                };
            }
        }
    });

    Tuna.toString = Tuna.prototype.toString = function() {
        return "Please visit https://github.com/Theodeus/tuna/wiki for instructions on how to use Tuna.js";
    };
})(this);

},{}],19:[function(require,module,exports){
(function (global){
!function e(t,n,i){function s(a,r){if(!n[a]){if(!t[a]){var c="function"==typeof require&&require;if(!r&&c)return c(a,!0);if(o)return o(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[a]={exports:{}};t[a][0].call(f.exports,function(e){var n=t[a][1][e];return s(n?n:e)},f,f.exports,e,t,n,i)}return n[a].exports}for(var o="function"==typeof require&&require,a=0;a<i.length;a++)s(i[a]);return s}({1:[function(e,t,n){function i(){f=!1,r.length?u=r.concat(u):l=-1,u.length&&s()}function s(){if(!f){var e=setTimeout(i);f=!0;for(var t=u.length;t;){for(r=u,u=[];++l<t;)r&&r[l].run();l=-1,t=u.length}r=null,f=!1,clearTimeout(e)}}function o(e,t){this.fun=e,this.array=t}function a(){}var r,c=t.exports={},u=[],f=!1,l=-1;c.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new o(e,t)),1!==u.length||f||setTimeout(s,0)},o.prototype.run=function(){this.fun.apply(null,this.array)},c.title="browser",c.browser=!0,c.env={},c.argv=[],c.version="",c.versions={},c.on=a,c.addListener=a,c.once=a,c.off=a,c.removeListener=a,c.removeAllListeners=a,c.emit=a,c.binding=function(e){throw new Error("process.binding is not supported")},c.cwd=function(){return"/"},c.chdir=function(e){throw new Error("process.chdir is not supported")},c.umask=function(){return 0}},{}],2:[function(e,t,n){"use strict";function i(e){var t="jazz_"+r++ +Date.now(),n=void 0,i=void 0,s=void 0;if(o.getDevice().nodejs===!0)i=new jazzMidi.MIDI;else{var u=document.createElement("object");u.id=t+"ie",u.classid="CLSID:1ACE1618-1C7D-4561-AEE1-34842AA85E90",s=u;var f=document.createElement("object");f.id=t,f.type="audio/x-jazz",u.appendChild(f),i=f;var l=document.createElement("p");l.appendChild(document.createTextNode("This page requires the "));var d=document.createElement("a");d.appendChild(document.createTextNode("Jazz plugin")),d.href="http://jazz-soft.net/",l.appendChild(d),l.appendChild(document.createTextNode(".")),f.appendChild(l);var h=document.getElementById("MIDIPlugin");h||(h=document.createElement("div"),h.id="MIDIPlugin",h.style.position="absolute",h.style.visibility="hidden",h.style.left="-9999px",h.style.top="-9999px",document.body.appendChild(h)),h.appendChild(u)}setTimeout(function(){i.isJazz===!0?n=i:s.isJazz===!0&&(n=s),void 0!==n&&(n._perfTimeZero=performance.now(),c.set(t,n)),e(n)},a)}function s(e,t){var n=null,s="input"===e?"inputInUse":"outputInUse",o=!0,a=!1,r=void 0;try{for(var u,f=c.values()[Symbol.iterator]();!(o=(u=f.next()).done);o=!0){var l=u.value;if(l[s]!==!0){n=l;break}}}catch(d){a=!0,r=d}finally{try{!o&&f["return"]&&f["return"]()}finally{if(a)throw r}}null===n?i(t):t(n)}Object.defineProperty(n,"__esModule",{value:!0}),n.createJazzInstance=i,n.getJazzInstance=s;var o=e("./util"),a=100,r=0,c=new Map},{"./util":9}],3:[function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(){return new Promise(function(e,t){return void 0!==I?void e(I):"ie9"===y.getDevice().browser?void t({message:"WebMIDIAPIShim supports Internet Explorer 10 and above."}):void v.createJazzInstance(function(n){return void 0===n?void t({message:"No access to MIDI devices: browser does not support the WebMIDI API and the Jazz plugin is not installed."}):(_=n,void o(function(){u(),I=new D(w,b),e(I)}))})})}function o(e){var t=_.MidiInList(),n=_.MidiOutList(),i=t.length,s=n.length;a(0,i,"input",t,function(){a(0,s,"output",n,e)})}function a(e,t,n,i,s){if(t>e){var o=i[e++];r(n,o,function(){a(e,t,n,i,s)})}else s()}function r(e,t,n){v.getJazzInstance(e,function(i){var s=void 0,o=[t,"",""];"input"===e?(i.Support("MidiInInfo")&&(o=i.MidiInInfo(t)),s=new p.MIDIInput(o,i),w.set(s.id,s)):"output"===e&&(i.Support("MidiOutInfo")&&(o=i.MidiOutInfo(t)),s=new m.MIDIOutput(o,i),b.set(s.id,s)),n(s)})}function c(e,t){var n=void 0,i=!0,s=!1,o=void 0;try{for(var a,r=e.values()[Symbol.iterator]();!(i=(a=r.next()).done)&&(n=a.value,n.name!==t);i=!0);}catch(c){s=!0,o=c}finally{try{!i&&r["return"]&&r["return"]()}finally{if(s)throw o}}return n}function u(){_.OnDisconnectMidiIn(function(e){var t=c(w,e);void 0!==t&&(t.state="disconnected",t.close(),t._jazzInstance.inputInUse=!1,w["delete"](t.id),f(t))}),_.OnDisconnectMidiOut(function(e){var t=c(b,e);void 0!==t&&(t.state="disconnected",t.close(),t._jazzInstance.outputInUse=!1,b["delete"](t.id),f(t))}),_.OnConnectMidiIn(function(e){r("input",e,function(e){f(e)})}),_.OnConnectMidiOut(function(e){r("output",e,function(e){f(e)})})}function f(e){e.dispatchEvent(new g.MIDIConnectionEvent(e,e));var t=new g.MIDIConnectionEvent(I,e);"function"==typeof I.onstatechange&&I.onstatechange(t);var n=!0,i=!1,s=void 0;try{for(var o,a=z[Symbol.iterator]();!(n=(o=a.next()).done);n=!0){var r=o.value;r(t)}}catch(c){i=!0,s=c}finally{try{!n&&a["return"]&&a["return"]()}finally{if(i)throw s}}}function l(){w.forEach(function(e){e._jazzInstance.MidiInClose()})}function d(e,t){var n=void 0;return"input"===t?(n=M.get(e),void 0===n&&(n=y.generateUUID(),M.set(e,n))):"output"===t&&(n=x.get(e),void 0===n&&(n=y.generateUUID(),x.set(e,n))),n}Object.defineProperty(n,"__esModule",{value:!0});var h=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();n.createMIDIAccess=s,n.dispatchEvent=f,n.closeAllMIDIInputs=l,n.getMIDIDeviceId=d;var v=e("./jazz_instance"),p=e("./midi_input"),m=e("./midi_output"),g=e("./midiconnection_event"),y=e("./util"),I=void 0,_=void 0,w=new Map,b=new Map,M=new Map,x=new Map,z=new Set,D=function(){function e(t,n){i(this,e),this.sysexEnabled=!0,this.inputs=t,this.outputs=n}return h(e,[{key:"addEventListener",value:function(e,t,n){"statechange"===e&&z.has(t)===!1&&z.add(t)}},{key:"removeEventListener",value:function(e,t,n){"statechange"===e&&z.has(t)===!0&&z["delete"](t)}}]),e}()},{"./jazz_instance":2,"./midi_input":4,"./midi_output":5,"./midiconnection_event":6,"./util":9}],4:[function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=e("./util"),a=e("./midimessage_event"),r=(e("./midiconnection_event"),e("./midi_access")),c=void 0,u=o.getDevice().nodejs,f=function(){function e(t,n){i(this,e),this.id=r.getMIDIDeviceId(t[0],"input"),this.name=t[0],this.manufacturer=t[1],this.version=t[2],this.type="input",this.state="connected",this.connection="pending",this.onstatechange=null,this._onmidimessage=null,Object.defineProperty(this,"onmidimessage",{set:function(e){this._onmidimessage=e,"function"==typeof e&&this.open()}}),this._listeners=(new Map).set("midimessage",new Set).set("statechange",new Set),this._inLongSysexMessage=!1,this._sysexBuffer=new Uint8Array,this._jazzInstance=n,this._jazzInstance.inputInUse=!0,"linux"===o.getDevice().platform&&this._jazzInstance.MidiInOpen(this.name,c.bind(this))}return s(e,[{key:"addEventListener",value:function(e,t,n){var i=this._listeners.get(e);void 0!==i&&i.has(t)===!1&&i.add(t)}},{key:"removeEventListener",value:function(e,t,n){var i=this._listeners.get(e);void 0!==i&&i.has(t)===!1&&i["delete"](t)}},{key:"dispatchEvent",value:function(e){var t=this._listeners.get(e.type);t.forEach(function(t){t(e)}),"midimessage"===e.type?null!==this._onmidimessage&&this._onmidimessage(e):"statechange"===e.type&&null!==this.onstatechange&&this.onstatechange(e)}},{key:"open",value:function(){"open"!==this.connection&&("linux"!==o.getDevice().platform&&this._jazzInstance.MidiInOpen(this.name,c.bind(this)),this.connection="open",r.dispatchEvent(this))}},{key:"close",value:function(){"closed"!==this.connection&&("linux"!==o.getDevice().platform&&this._jazzInstance.MidiInClose(),this.connection="closed",r.dispatchEvent(this),this._onmidimessage=null,this.onstatechange=null,this._listeners.get("midimessage").clear(),this._listeners.get("statechange").clear())}},{key:"_appendToSysexBuffer",value:function(e){var t=this._sysexBuffer.length,n=new Uint8Array(t+e.length);n.set(this._sysexBuffer),n.set(e,t),this._sysexBuffer=n}},{key:"_bufferLongSysex",value:function(e,t){for(var n=t;n<e.length;){if(247==e[n])return n++,this._appendToSysexBuffer(e.slice(t,n)),n;n++}return this._appendToSysexBuffer(e.slice(t,n)),this._inLongSysexMessage=!0,n}}]),e}();n.MIDIInput=f,c=function(e,t){var n=0,i=void 0,s=!1;for(i=0;i<t.length;i+=n){var o=!0;if(this._inLongSysexMessage){if(i=this._bufferLongSysex(t,i),247!=t[i-1])return;s=!0}else switch(s=!1,240&t[i]){case 0:n=1,o=!1;break;case 128:case 144:case 160:case 176:case 224:n=3;break;case 192:case 208:n=2;break;case 240:switch(t[i]){case 240:if(i=this._bufferLongSysex(t,i),247!=t[i-1])return;s=!0;break;case 241:case 243:n=2;break;case 242:n=3;break;default:n=1}}if(o){var r={};if(r.receivedTime=parseFloat(e.toString())+this._jazzInstance._perfTimeZero,s||this._inLongSysexMessage?(r.data=new Uint8Array(this._sysexBuffer),this._sysexBuffer=new Uint8Array(0),this._inLongSysexMessage=!1):r.data=new Uint8Array(t.slice(i,n+i)),u)this._onmidimessage&&this._onmidimessage(r);else{var c=new a.MIDIMessageEvent(this,r.data,r.receivedTime);this.dispatchEvent(c)}}}}},{"./midi_access":3,"./midiconnection_event":6,"./midimessage_event":7,"./util":9}],5:[function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=e("./util"),a=e("./midi_access"),r=function(){function e(t,n){i(this,e),this.id=a.getMIDIDeviceId(t[0],"output"),this.name=t[0],this.manufacturer=t[1],this.version=t[2],this.type="output",this.state="connected",this.connection="pending",this.onmidimessage=null,this.onstatechange=null,this._listeners=new Set,this._inLongSysexMessage=!1,this._sysexBuffer=new Uint8Array,this._jazzInstance=n,this._jazzInstance.outputInUse=!0,"linux"===o.getDevice().platform&&this._jazzInstance.MidiOutOpen(this.name)}return s(e,[{key:"open",value:function(){"open"!==this.connection&&("linux"!==o.getDevice().platform&&this._jazzInstance.MidiOutOpen(this.name),this.connection="open",a.dispatchEvent(this))}},{key:"close",value:function(){"closed"!==this.connection&&("linux"!==o.getDevice().platform&&this._jazzInstance.MidiOutClose(),this.connection="closed",a.dispatchEvent(this),this.onstatechange=null,this._listeners.clear())}},{key:"send",value:function(e,t){var n=this,i=0;return 0===e.length?!1:(t&&(i=Math.floor(t-performance.now())),t&&i>1?setTimeout(function(){n._jazzInstance.MidiOutLong(e)},i):this._jazzInstance.MidiOutLong(e),!0)}},{key:"clear",value:function(){}},{key:"addEventListener",value:function(e,t,n){"statechange"===e&&this._listeners.has(t)===!1&&this._listeners.add(t)}},{key:"removeEventListener",value:function(e,t,n){"statechange"===e&&this._listeners.has(t)===!1&&this._listeners["delete"](t)}},{key:"dispatchEvent",value:function(e){this._listeners.forEach(function(t){t(e)}),null!==this.onstatechange&&this.onstatechange(e)}}]),e}();n.MIDIOutput=r},{"./midi_access":3,"./util":9}],6:[function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var s=function o(e,t){i(this,o),this.bubbles=!1,this.cancelBubble=!1,this.cancelable=!1,this.currentTarget=e,this.defaultPrevented=!1,this.eventPhase=0,this.path=[],this.port=t,this.returnValue=!0,this.srcElement=e,this.target=e,this.timeStamp=Date.now(),this.type="statechange"};n.MIDIConnectionEvent=s},{}],7:[function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var s=function o(e,t,n){i(this,o),this.bubbles=!1,this.cancelBubble=!1,this.cancelable=!1,this.currentTarget=e,this.data=t,this.defaultPrevented=!1,this.eventPhase=0,this.path=[],this.receivedTime=n,this.returnValue=!0,this.srcElement=e,this.target=e,this.timeStamp=Date.now(),this.type="midimessage"};n.MIDIMessageEvent=s},{}],8:[function(e,t,n){"use strict";var i=e("./midi_access"),s=e("./util"),o=void 0;!function(){navigator.requestMIDIAccess||(s.polyfill(),navigator.requestMIDIAccess=function(){return void 0===o&&(o=i.createMIDIAccess()),o},s.getDevice().nodejs===!0&&(navigator.close=function(){i.closeAllMIDIInputs()}))}()},{"./midi_access":3,"./util":9}],9:[function(e,t,n){(function(e,t){"use strict";function i(){if(void 0!==c)return c;var t="undetected",n="undetected";if(navigator.nodejs)return t=e.platform,c={platform:t,nodejs:!0,mobile:"ios"===t||"android"===t};var i=navigator.userAgent;return i.match(/(iPad|iPhone|iPod)/g)?t="ios":-1!==i.indexOf("Android")?t="android":-1!==i.indexOf("Linux")?t="linux":-1!==i.indexOf("Macintosh")?t="osx":-1!==i.indexOf("Windows")&&(t="windows"),-1!==i.indexOf("Chrome")?(n="chrome",-1!==i.indexOf("OPR")?n="opera":-1!==i.indexOf("Chromium")&&(n="chromium")):-1!==i.indexOf("Safari")?n="safari":-1!==i.indexOf("Firefox")?n="firefox":-1!==i.indexOf("Trident")&&(n="ie",-1!==i.indexOf("MSIE 9")&&(n="ie9")),"ios"===t&&-1!==i.indexOf("CriOS")&&(n="chrome"),c={platform:t,browser:n,mobile:"ios"===t||"android"===t,nodejs:!1}}function s(){void 0===performance&&(performance={}),Date.now=Date.now||function(){return(new Date).getTime()},void 0===performance.now&&!function(){var e=Date.now();void 0!==performance.timing&&void 0!==performance.timing.navigationStart&&(e=performance.timing.navigationStart),performance.now=function(){return Date.now()-e}}()}function o(){var e=(new Date).getTime(),t=new Array(64).join("x");return t=t.replace(/[xy]/g,function(t){var n=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"==t?n:3&n|8).toString(16).toUpperCase()})}function a(e){"function"!=typeof e.Promise&&(e.Promise=function(e){this.executor=e},e.Promise.prototype.then=function(e,t){"function"!=typeof e&&(e=function(){}),"function"!=typeof t&&(t=function(){}),this.executor(e,t)})}function r(){var e=i();"ie"===e.browser?a(window):e.nodejs===!0&&a(t),s()}Object.defineProperty(n,"__esModule",{value:!0}),n.getDevice=i,n.polyfillPerformance=s,n.generateUUID=o,n.polyfillPromise=a,n.polyfill=r;var c=void 0}).call(this,e("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{_process:1}]},{},[8]);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],20:[function(require,module,exports){
/**
 * @license -------------------------------------------------------------------
 *   module: Base64Binary
 *      src: http://blog.danguer.com/2011/10/24/base64-binary-decoding-in-javascript/
 *  license: Simplified BSD License
 * -------------------------------------------------------------------
 * Copyright 2011, Daniel Guerrero. All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     - Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     - Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL DANIEL GUERRERO BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

module.exports = {
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	/* will return a  Uint8Array type */
	decodeArrayBuffer: function(input) {
		var bytes = Math.ceil( (3*input.length) / 4.0);
		var ab = new ArrayBuffer(bytes);
		this.decode(input, ab);

		return ab;
	},

	decode: function(input, arrayBuffer) {
		//get last chars to see if are valid
		var lkey1 = this._keyStr.indexOf(input.charAt(input.length-1));		 
		var lkey2 = this._keyStr.indexOf(input.charAt(input.length-1));		 

		var bytes = Math.ceil( (3*input.length) / 4.0);
		if (lkey1 == 64) bytes--; //padding chars, so skip
		if (lkey2 == 64) bytes--; //padding chars, so skip

		var uarray;
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		var j = 0;

		if (arrayBuffer)
			uarray = new Uint8Array(arrayBuffer);
		else
			uarray = new Uint8Array(bytes);

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		for (i=0; i<bytes; i+=3) {	
			//get the 3 octects in 4 ascii chars
			enc1 = this._keyStr.indexOf(input.charAt(j++));
			enc2 = this._keyStr.indexOf(input.charAt(j++));
			enc3 = this._keyStr.indexOf(input.charAt(j++));
			enc4 = this._keyStr.indexOf(input.charAt(j++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			uarray[i] = chr1;			
			if (enc3 != 64) uarray[i+1] = chr2;
			if (enc4 != 64) uarray[i+2] = chr3;
		}

		return uarray;	
	}
};
},{}],21:[function(require,module,exports){
var midi = function () {
    var api = {};
    var loader = require('./midi/loader')();
    var player = require('./midi/player')();
    return loader;
};

module.exports = midi;
window.globalmidi = midi;
},{"./midi/loader":24,"./midi/player":25}],22:[function(require,module,exports){
/*
	----------------------------------------------------------
	MIDI.audioDetect : 0.3.2 : 2015-03-26
	----------------------------------------------------------
	https://github.com/mudcube/MIDI.js
	----------------------------------------------------------
	Probably, Maybe, No... Absolutely!
	Test to see what types of <audio> MIME types are playable by the browser.
	----------------------------------------------------------
*/
var supports = {}; // object of supported file types
var pending = 0; // pending file types to process
var canPlayThrough = function (src) { // check whether format plays through
	pending ++;
	var body = document.body;
	var audio = new Audio();
	var mime = src.split(';')[0];
	audio.id = 'audio';
	audio.setAttribute('preload', 'auto');
	audio.setAttribute('audiobuffer', true);
	audio.addEventListener('error', function() {
		body.removeChild(audio);
		supports[mime] = false;
		pending --;
	}, false);
	audio.addEventListener('canplaythrough', function() {
		body.removeChild(audio);
		supports[mime] = true;
		pending --;
	}, false);
	audio.src = 'data:' + src;
	body.appendChild(audio);
};

var audioDetect = function(onsuccess) {
	/// detect jazz-midi plugin
	if (navigator.requestMIDIAccess) {
		var isNative = Function.prototype.toString.call(navigator.requestMIDIAccess).indexOf('[native code]');
		if (isNative) { // has native midiapi support
			supports['webmidi'] = true;
		} else { // check for jazz plugin midiapi support
			for (var n = 0; navigator.plugins.length > n; n ++) {
				var plugin = navigator.plugins[n];
				if (plugin.name.indexOf('Jazz-Plugin') >= 0) {
					supports['webmidi'] = true;
				}
			}
		}
	}

	/// check whether <audio> tag is supported
	if (typeof(Audio) === 'undefined') {
		return onsuccess({});
	} else {
		supports['audiotag'] = true;
	}

	/// check for webaudio api support
	if (window.AudioContext || window.webkitAudioContext) {
		supports['webaudio'] = true;
	}

	/// check whether canPlayType is supported
	var audio = new Audio();
	if (typeof(audio.canPlayType) === 'undefined') {
		return onsuccess(supports);
	}

	/// see what we can learn from the browser
	var vorbis = audio.canPlayType('audio/ogg; codecs="vorbis"');
	vorbis = (vorbis === 'probably' || vorbis === 'maybe');
	var mpeg = audio.canPlayType('audio/mpeg');
	mpeg = (mpeg === 'probably' || mpeg === 'maybe');
	// maybe nothing is supported
	if (!vorbis && !mpeg) {
		onsuccess(supports);
		return;
	}

	/// or maybe something is supported
	if (vorbis) canPlayThrough('audio/ogg;base64,T2dnUwACAAAAAAAAAADqnjMlAAAAAOyyzPIBHgF2b3JiaXMAAAAAAUAfAABAHwAAQB8AAEAfAACZAU9nZ1MAAAAAAAAAAAAA6p4zJQEAAAANJGeqCj3//////////5ADdm9yYmlzLQAAAFhpcGguT3JnIGxpYlZvcmJpcyBJIDIwMTAxMTAxIChTY2hhdWZlbnVnZ2V0KQAAAAABBXZvcmJpcw9CQ1YBAAABAAxSFCElGVNKYwiVUlIpBR1jUFtHHWPUOUYhZBBTiEkZpXtPKpVYSsgRUlgpRR1TTFNJlVKWKUUdYxRTSCFT1jFloXMUS4ZJCSVsTa50FkvomWOWMUYdY85aSp1j1jFFHWNSUkmhcxg6ZiVkFDpGxehifDA6laJCKL7H3lLpLYWKW4q91xpT6y2EGEtpwQhhc+211dxKasUYY4wxxsXiUyiC0JBVAAABAABABAFCQ1YBAAoAAMJQDEVRgNCQVQBABgCAABRFcRTHcRxHkiTLAkJDVgEAQAAAAgAAKI7hKJIjSZJkWZZlWZameZaouaov+64u667t6roOhIasBACAAAAYRqF1TCqDEEPKQ4QUY9AzoxBDDEzGHGNONKQMMogzxZAyiFssLqgQBKEhKwKAKAAAwBjEGGIMOeekZFIi55iUTkoDnaPUUcoolRRLjBmlEluJMYLOUeooZZRCjKXFjFKJscRUAABAgAMAQICFUGjIigAgCgCAMAYphZRCjCnmFHOIMeUcgwwxxiBkzinoGJNOSuWck85JiRhjzjEHlXNOSuekctBJyaQTAAAQ4AAAEGAhFBqyIgCIEwAwSJKmWZomipamiaJniqrqiaKqWp5nmp5pqqpnmqpqqqrrmqrqypbnmaZnmqrqmaaqiqbquqaquq6nqrZsuqoum65q267s+rZru77uqapsm6or66bqyrrqyrbuurbtS56nqqKquq5nqq6ruq5uq65r25pqyq6purJtuq4tu7Js664s67pmqq5suqotm64s667s2rYqy7ovuq5uq7Ks+6os+75s67ru2rrwi65r66os674qy74x27bwy7ouHJMnqqqnqq7rmarrqq5r26rr2rqmmq5suq4tm6or26os67Yry7aumaosm64r26bryrIqy77vyrJui67r66Ys67oqy8Lu6roxzLat+6Lr6roqy7qvyrKuu7ru+7JuC7umqrpuyrKvm7Ks+7auC8us27oxuq7vq7It/KosC7+u+8Iy6z5jdF1fV21ZGFbZ9n3d95Vj1nVhWW1b+V1bZ7y+bgy7bvzKrQvLstq2scy6rSyvrxvDLux8W/iVmqratum6um7Ksq/Lui60dd1XRtf1fdW2fV+VZd+3hV9pG8OwjK6r+6os68Jry8ov67qw7MIvLKttK7+r68ow27qw3L6wLL/uC8uq277v6rrStXVluX2fsSu38QsAABhwAAAIMKEMFBqyIgCIEwBAEHIOKQahYgpCCKGkEEIqFWNSMuakZM5JKaWUFEpJrWJMSuaclMwxKaGUlkopqYRSWiqlxBRKaS2l1mJKqcVQSmulpNZKSa2llGJMrcUYMSYlc05K5pyUklJrJZXWMucoZQ5K6iCklEoqraTUYuacpA46Kx2E1EoqMZWUYgupxFZKaq2kFGMrMdXUWo4hpRhLSrGVlFptMdXWWqs1YkxK5pyUzDkqJaXWSiqtZc5J6iC01DkoqaTUYiopxco5SR2ElDLIqJSUWiupxBJSia20FGMpqcXUYq4pxRZDSS2WlFosqcTWYoy1tVRTJ6XFklKMJZUYW6y5ttZqDKXEVkqLsaSUW2sx1xZjjqGkFksrsZWUWmy15dhayzW1VGNKrdYWY40x5ZRrrT2n1mJNMdXaWqy51ZZbzLXnTkprpZQWS0oxttZijTHmHEppraQUWykpxtZara3FXEMpsZXSWiypxNhirLXFVmNqrcYWW62ltVprrb3GVlsurdXcYqw9tZRrrLXmWFNtBQAADDgAAASYUAYKDVkJAEQBAADGMMYYhEYpx5yT0ijlnHNSKucghJBS5hyEEFLKnINQSkuZcxBKSSmUklJqrYVSUmqttQIAAAocAAACbNCUWByg0JCVAEAqAIDBcTRNFFXVdX1fsSxRVFXXlW3jVyxNFFVVdm1b+DVRVFXXtW3bFn5NFFVVdmXZtoWiqrqybduybgvDqKqua9uybeuorqvbuq3bui9UXVmWbVu3dR3XtnXd9nVd+Bmzbeu2buu+8CMMR9/4IeTj+3RCCAAAT3AAACqwYXWEk6KxwEJDVgIAGQAAgDFKGYUYM0gxphhjTDHGmAAAgAEHAIAAE8pAoSErAoAoAADAOeecc84555xzzjnnnHPOOeecc44xxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY0wAwE6EA8BOhIVQaMhKACAcAABACCEpKaWUUkoRU85BSSmllFKqFIOMSkoppZRSpBR1lFJKKaWUIqWgpJJSSimllElJKaWUUkoppYw6SimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaVUSimllFJKKaWUUkoppRQAYPLgAACVYOMMK0lnhaPBhYasBAByAwAAhRiDEEJpraRUUkolVc5BKCWUlEpKKZWUUqqYgxBKKqmlklJKKbXSQSihlFBKKSWUUkooJYQQSgmhlFRCK6mEUkoHoYQSQimhhFRKKSWUzkEoIYUOQkmllNRCSB10VFIpIZVSSiklpZQ6CKGUklJLLZVSWkqpdBJSKamV1FJqqbWSUgmhpFZKSSWl0lpJJbUSSkklpZRSSymFVFJJJYSSUioltZZaSqm11lJIqZWUUkqppdRSSiWlkEpKqZSSUmollZRSaiGVlEpJKaTUSimlpFRCSamlUlpKLbWUSkmptFRSSaWUlEpJKaVSSksppRJKSqmllFpJKYWSUkoplZJSSyW1VEoKJaWUUkmptJRSSymVklIBAEAHDgAAAUZUWoidZlx5BI4oZJiAAgAAQABAgAkgMEBQMApBgDACAQAAAADAAAAfAABHARAR0ZzBAUKCwgJDg8MDAAAAAAAAAAAAAACAT2dnUwAEAAAAAAAAAADqnjMlAgAAADzQPmcBAQA=');
	if (mpeg) canPlayThrough('audio/mpeg;base64,/+MYxAAAAANIAUAAAASEEB/jwOFM/0MM/90b/+RhST//w4NFwOjf///PZu////9lns5GFDv//l9GlUIEEIAAAgIg8Ir/JGq3/+MYxDsLIj5QMYcoAP0dv9HIjUcH//yYSg+CIbkGP//8w0bLVjUP///3Z0x5QCAv/yLjwtGKTEFNRTMuOTeqqqqqqqqqqqqq/+MYxEkNmdJkUYc4AKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');

	/// lets find out!
	var time = (new Date()).getTime();
	var interval = window.setInterval(function() {
		var now = (new Date()).getTime();
		var maxExecution = now - time > 5000;
		if (!pending || maxExecution) {
			window.clearInterval(interval);
			onsuccess(supports);
		}
	}, 1);
};

module.exports = audioDetect;
},{}],23:[function(require,module,exports){
/*
 ----------------------------------------------------------
 GeneralMIDI
 ----------------------------------------------------------
 */
var root = {};
root.GM = (function (arr) {
    var clean = function (name) {
        return name.replace(/[^a-z0-9 ]/gi, '').replace(/[ ]/g, '_').toLowerCase();
    };
    var res = {
        byName: {},
        byId: {},
        byCategory: {}
    };
    for (var key in arr) {
        var list = arr[key];
        for (var n = 0, length = list.length; n < length; n++) {
            var instrument = list[n];
            if (!instrument) continue;
            var num = parseInt(instrument.substr(0, instrument.indexOf(' ')), 10);
            instrument = instrument.replace(num + ' ', '');
            res.byId[--num] =
                res.byName[clean(instrument)] =
                    res.byCategory[clean(key)] = {
                        id: clean(instrument),
                        instrument: instrument,
                        number: num,
                        category: key
                    };
        }
    }
    return res;
})({
    'Piano': ['1 Acoustic Grand Piano', '2 Bright Acoustic Piano', '3 Electric Grand Piano', '4 Honky-tonk Piano', '5 Electric Piano 1', '6 Electric Piano 2', '7 Harpsichord', '8 Clavinet'],
    'Chromatic Percussion': ['9 Celesta', '10 Glockenspiel', '11 Music Box', '12 Vibraphone', '13 Marimba', '14 Xylophone', '15 Tubular Bells', '16 Dulcimer'],
    'Organ': ['17 Drawbar Organ', '18 Percussive Organ', '19 Rock Organ', '20 Church Organ', '21 Reed Organ', '22 Accordion', '23 Harmonica', '24 Tango Accordion'],
    'Guitar': ['25 Acoustic Guitar (nylon)', '26 Acoustic Guitar (steel)', '27 Electric Guitar (jazz)', '28 Electric Guitar (clean)', '29 Electric Guitar (muted)', '30 Overdriven Guitar', '31 Distortion Guitar', '32 Guitar Harmonics'],
    'Bass': ['33 Acoustic Bass', '34 Electric Bass (finger)', '35 Electric Bass (pick)', '36 Fretless Bass', '37 Slap Bass 1', '38 Slap Bass 2', '39 Synth Bass 1', '40 Synth Bass 2'],
    'Strings': ['41 Violin', '42 Viola', '43 Cello', '44 Contrabass', '45 Tremolo Strings', '46 Pizzicato Strings', '47 Orchestral Harp', '48 Timpani'],
    'Ensemble': ['49 String Ensemble 1', '50 String Ensemble 2', '51 Synth Strings 1', '52 Synth Strings 2', '53 Choir Aahs', '54 Voice Oohs', '55 Synth Choir', '56 Orchestra Hit'],
    'Brass': ['57 Trumpet', '58 Trombone', '59 Tuba', '60 Muted Trumpet', '61 French Horn', '62 Brass Section', '63 Synth Brass 1', '64 Synth Brass 2'],
    'Reed': ['65 Soprano Sax', '66 Alto Sax', '67 Tenor Sax', '68 Baritone Sax', '69 Oboe', '70 English Horn', '71 Bassoon', '72 Clarinet'],
    'Pipe': ['73 Piccolo', '74 Flute', '75 Recorder', '76 Pan Flute', '77 Blown Bottle', '78 Shakuhachi', '79 Whistle', '80 Ocarina'],
    'Synth Lead': ['81 Lead 1 (square)', '82 Lead 2 (sawtooth)', '83 Lead 3 (calliope)', '84 Lead 4 (chiff)', '85 Lead 5 (charang)', '86 Lead 6 (voice)', '87 Lead 7 (fifths)', '88 Lead 8 (bass + lead)'],
    'Synth Pad': ['89 Pad 1 (new age)', '90 Pad 2 (warm)', '91 Pad 3 (polysynth)', '92 Pad 4 (choir)', '93 Pad 5 (bowed)', '94 Pad 6 (metallic)', '95 Pad 7 (halo)', '96 Pad 8 (sweep)'],
    'Synth Effects': ['97 FX 1 (rain)', '98 FX 2 (soundtrack)', '99 FX 3 (crystal)', '100 FX 4 (atmosphere)', '101 FX 5 (brightness)', '102 FX 6 (goblins)', '103 FX 7 (echoes)', '104 FX 8 (sci-fi)'],
    'Ethnic': ['105 Sitar', '106 Banjo', '107 Shamisen', '108 Koto', '109 Kalimba', '110 Bagpipe', '111 Fiddle', '112 Shanai'],
    'Percussive': ['113 Tinkle Bell', '114 Agogo', '115 Steel Drums', '116 Woodblock', '117 Taiko Drum', '118 Melodic Tom', '119 Synth Drum'],
    'Sound effects': ['120 Reverse Cymbal', '121 Guitar Fret Noise', '122 Breath Noise', '123 Seashore', '124 Bird Tweet', '125 Telephone Ring', '126 Helicopter', '127 Applause', '128 Gunshot']
});

/* get/setInstrument
 --------------------------------------------------- */
root.getInstrument = function (channelId) {
    var channel = root.channels[channelId];
    return channel && channel.instrument;
};

root.setInstrument = function (channelId, program, delay) {
    var channel = root.channels[channelId];
    if (delay) {
        return setTimeout(function () {
            channel.instrument = program;
        }, delay);
    } else {
        channel.instrument = program;
    }
};

/* get/setMono
 --------------------------------------------------- */
root.getMono = function (channelId) {
    var channel = root.channels[channelId];
    return channel && channel.mono;
};

root.setMono = function (channelId, truthy, delay) {
    var channel = root.channels[channelId];
    if (delay) {
        return setTimeout(function () {
            channel.mono = truthy;
        }, delay);
    } else {
        channel.mono = truthy;
    }
};

/* get/setOmni
 --------------------------------------------------- */
root.getOmni = function (channelId) {
    var channel = root.channels[channelId];
    return channel && channel.omni;
};

root.setOmni = function (channelId, truthy) {
    var channel = root.channels[channelId];
    if (delay) {
        return setTimeout(function () {
            channel.omni = truthy;
        }, delay);
    } else {
        channel.omni = truthy;
    }
};

/* get/setSolo
 --------------------------------------------------- */
root.getSolo = function (channelId) {
    var channel = root.channels[channelId];
    return channel && channel.solo;
};

root.setSolo = function (channelId, truthy) {
    var channel = root.channels[channelId];
    if (delay) {
        return setTimeout(function () {
            channel.solo = truthy;
        }, delay);
    } else {
        channel.solo = truthy;
    }
};


/* note conversions
 --------------------------------------------------- */
root.keyToNote = {}; // C8  == 108
root.noteToKey = {}; // 108 ==  C8

(function () {
    var A0 = 0x15; // first note
    var C8 = 0x6C; // last note
    var number2key = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    for (var n = A0; n <= C8; n++) {
        var octave = (n - 12) / 12 >> 0;
        var name = number2key[n % 12] + octave;
        root.keyToNote[name] = n;
        root.noteToKey[n] = name;
    }
})();

module.exports = root
},{}],24:[function(require,module,exports){
/**
 ----------------------------------------------------------
 MIDI.Plugin : 0.3.4 : 2015-03-26
 ----------------------------------------------------------
 https://github.com/mudcube/MIDI.js
 ----------------------------------------------------------
 Inspired by javax.sound.midi (albeit a super simple version):
 http://docs.oracle.com/javase/6/docs/api/javax/sound/midi/package-summary.html
 ----------------------------------------------------------
 Technologies
 ----------------------------------------------------------
 Web MIDI API - no native support yet (jazzplugin)
 Web Audio API - firefox 25+, chrome 10+, safari 6+, opera 15+
 HTML5 Audio Tag - ie 9+, firefox 3.5+, chrome 4+, safari 4+, opera 9.5+, ios 4+, android 2.3+
 ----------------------------------------------------------
 **/


module.exports = function() {
    window.MIDI = {};
    window.MIDI.Soundfont = {};
    'use strict';
    var audioDetect = require('./audioDetect');
    var generalMIDI = require('./gm');
    var _ = {
        merge : require('lodash.merge')
    };
    var webMidi = require('./plugin.webmidi');
    var audiotag = require('./plugin.audiotag');
    var webaudio = require('./plugin.webaudio');
    var request = require('../util/dom_request_xhr');
    var dom = require('../util/dom_request_script');

    var root = {};
    root.DEBUG = true;
    root.USE_XHR = true;
    root.soundfontUrl = './soundfont/';
    root.channels = (function () { // 0 - 15 channels
        var channels = {};
        for (var i = 0; i < 16; i++) {
            channels[i] = { // default values
                instrument: i,
                pitchBend: 0,
                mute: false,
                mono: false,
                omni: false,
                solo: false
            };
        }
        return channels;
    })();
    /*
     MIDI.loadPlugin({
     onsuccess: function() { },
     onprogress: function(state, percent) { },
     targetFormat: 'mp3', // optionally can force to use MP3 (for instance on mobile networks)
     instrument: 'acoustic_grand_piano', // or 1 (default)
     instruments: [ 'acoustic_grand_piano', 'acoustic_guitar_nylon' ] // or multiple instruments
     });
     */

    root.loadPlugin = function (opts) {
        if (typeof opts === 'function') {
            opts = {onsuccess: opts};
        }

        root.soundfontUrl = opts.soundfontUrl || root.soundfontUrl;

        /// Detect the best type of audio to use
        audioDetect(function (supports) {
            var hash = window.location.hash;
            var api = '';
            /// use the most appropriate plugin if not specified
            if (supports[opts.api]) {
                api = opts.api;
            } else if (supports[hash.substr(1)]) {
                api = hash.substr(1);
            } else if (supports.webmidi) {
                api = 'webmidi';
            } else if (window.AudioContext) { // Chrome
                api = 'webaudio';
            } else if (window.Audio) { // Firefox
                api = 'audiotag';
            }

            /// use audio/ogg when supported
            if (opts.targetFormat) {
                var audioFormat = opts.targetFormat;
            } else { // use best quality
                var audioFormat = supports['audio/ogg'] ? 'ogg' : 'mp3';
            }

            /// load the specified plugin
            root.__api = api;
            root.__audioFormat = audioFormat;
            root.supports = supports;
            root.loadResource(opts);
        });
    };

    /*
     root.loadResource({
     onsuccess: function() { },
     onprogress: function(state, percent) { },
     instrument: 'banjo'
     })
     */

    root.loadResource = function (opts) {
        var instruments = opts.instruments || opts.instrument || 'acoustic_grand_piano';
        ///
        if (typeof instruments !== 'object') {
            if (instruments || instruments === 0) {
                instruments = [instruments];
            } else {
                instruments = [];
            }
        }
        /// convert numeric ids into strings
        for (var i = 0; i < instruments.length; i++) {
            var instrument = instruments[i];
            if (instrument === +instrument) { // is numeric
                if (generalMIDI.GM.byId[instrument]) {
                    instruments[i] = generalMIDI.GM.byId[instrument].id;
                }
            }
        }
        ///
        opts.format = root.__audioFormat;
        opts.instruments = instruments;
        ///
        root.midi = connect(root.__api, opts);
    };

    var connect = function(api, opts){
        switch(api) {
            case 'webmidi':
                // cant wait for this to be standardized!
                root = _.merge(root, webMidi.connect(opts, root.channels));
                break;
            case 'audiotag':
                // works ok, kinda like a drunken tuna fish, across the board
                // http://caniuse.com/audio
                requestQueue(opts, audiotag);
                break;
            case 'webaudio':
                // works awesome! safari, chrome and firefox support
                // http://caniuse.com/web-audio
                requestQueue(opts, webaudio);
                break;
        }
        root.__api = api;
    };

    var requestQueue = function (opts, context) {
        var audioFormat = opts.format;
        var instruments = opts.instruments;
        var onprogress = opts.onprogress;
        var onerror = opts.onerror;
        ///
        var length = instruments.length;
        var pending = length;
        var waitForEnd = function () {
            if (!--pending) {
                onprogress && onprogress('load', 1.0);
                root =_.merge(root, context.connect(opts, root.channels));
            }
        };
        ///
        for (var i = 0; i < length; i++) {
            var instrumentId = instruments[i];
            if (window.MIDI.Soundfont[instrumentId]) { // already loaded
                waitForEnd();
            } else { // needs to be requested
                sendRequest(instruments[i], audioFormat, function (evt, progress) {
                    var fileProgress = progress / length;
                    var queueProgress = (length - pending) / length;
                    onprogress && onprogress('load', fileProgress + queueProgress, instrumentId);
                }, function () {
                    waitForEnd();
                }, onerror);
            }
        };
    };

    var sendRequest = function (instrumentId, audioFormat, onprogress, onsuccess, onerror) {
        var soundfontPath = root.soundfontUrl + instrumentId + '-' + audioFormat + '.js';

        if (root.USE_XHR) {
            request({
                url: soundfontPath,
                format: 'text',
                onerror: onerror,
                onprogress: onprogress,
                onsuccess: function (event, responseText) {
                    var script = document.createElement('script');
                    script.language = 'javascript';
                    script.type = 'text/javascript';
                    script.text = responseText;
                    document.body.appendChild(script);

                    ///
                    onsuccess();
                }
            });
        } else {
            dom.loadScript.add({
                url: soundfontPath,
                verify: 'MIDI.Soundfont["' + instrumentId + '"]',
                onerror: onerror,
                onsuccess: function () {
                    onsuccess();
                }
            });
        }
    };

    root.setDefaultPlugin = function (midi) {
        for (var key in midi) {
            root[key] = midi[key];
        }
    };

    return root;
};
},{"../util/dom_request_script":29,"../util/dom_request_xhr":30,"./audioDetect":22,"./gm":23,"./plugin.audiotag":26,"./plugin.webaudio":27,"./plugin.webmidi":28,"lodash.merge":15}],25:[function(require,module,exports){
/*
 ----------------------------------------------------------
 MIDI.Player : 0.3.1 : 2015-03-26
 ----------------------------------------------------------
 https://github.com/mudcube/MIDI.js
 ----------------------------------------------------------
 */
module.exports = function () {
    var generalMIDI = require('./gm');
    'use strict';
    var midi = {};

    midi.currentTime = 0;
    midi.endTime = 0;
    midi.restart = 0;
    midi.playing = false;
    midi.timeWarp = 1;
    midi.startDelay = 0;
    midi.BPM = 120;

    midi.start =
        midi.resume = function (onsuccess) {
            if (midi.currentTime < -1) {
                midi.currentTime = -1;
            }
            startAudio(midi.currentTime, null, onsuccess);
        };

    midi.pause = function () {
        var tmp = midi.restart;
        stopAudio();
        midi.restart = tmp;
    };

    midi.stop = function () {
        stopAudio();
        midi.restart = 0;
        midi.currentTime = 0;
    };

    midi.addListener = function (onsuccess) {
        onMidiEvent = onsuccess;
    };

    midi.removeListener = function () {
        onMidiEvent = undefined;
    };

    midi.clearAnimation = function () {
        if (midi.animationFrameId) {
            cancelAnimationFrame(midi.animationFrameId);
        }
    };

    midi.setAnimation = function (callback) {
        var currentTime = 0;
        var tOurTime = 0;
        var tTheirTime = 0;
        //
        midi.clearAnimation();
        ///
        var frame = function () {
            midi.animationFrameId = requestAnimationFrame(frame);
            ///
            if (midi.endTime === 0) {
                return;
            }
            if (midi.playing) {
                currentTime = (tTheirTime === midi.currentTime) ? tOurTime - Date.now() : 0;
                if (midi.currentTime === 0) {
                    currentTime = 0;
                } else {
                    currentTime = midi.currentTime - currentTime;
                }
                if (tTheirTime !== midi.currentTime) {
                    tOurTime = Date.now();
                    tTheirTime = midi.currentTime;
                }
            } else { // paused
                currentTime = midi.currentTime;
            }
            ///
            var endTime = midi.endTime;
            var percent = currentTime / endTime;
            var total = currentTime / 1000;
            var minutes = total / 60;
            var seconds = total - (minutes * 60);
            var t1 = minutes * 60 + seconds;
            var t2 = (endTime / 1000);
            ///
            if (t2 - t1 < -1.0) {
                return;
            } else {
                callback({
                    now: t1,
                    end: t2,
                    events: noteRegistrar
                });
            }
        };
        ///
        requestAnimationFrame(frame);
    };
    // helpers
    midi.loadMidiFile = function (onsuccess, onprogress, onerror) {
        try {
            midi.replayer = new Replayer(MidiFile(midi.currentData), midi.timeWarp, null, midi.BPM);
            midi.data = midi.replayer.getData();
            midi.endTime = getLength();
            ///
            MIDI.loadPlugin({
// 			instruments: midi.getFileInstruments(),
                onsuccess: onsuccess,
                onprogress: onprogress,
                onerror: onerror
            });
        } catch (event) {
            onerror && onerror(event);
        }
    };

    midi.loadFile = function (file, onsuccess, onprogress, onerror) {
        midi.stop();
        if (file.indexOf('base64,') !== -1) {
            var data = window.atob(file.split(',')[1]);
            midi.currentData = data;
            midi.loadMidiFile(onsuccess, onprogress, onerror);
        } else {
            var fetch = new XMLHttpRequest();
            fetch.open('GET', file);
            fetch.overrideMimeType('text/plain; charset=x-user-defined');
            fetch.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        var t = this.responseText || '';
                        var ff = [];
                        var mx = t.length;
                        var scc = String.fromCharCode;
                        for (var z = 0; z < mx; z++) {
                            ff[z] = scc(t.charCodeAt(z) & 255);
                        }
                        ///
                        var data = ff.join('');
                        midi.currentData = data;
                        midi.loadMidiFile(onsuccess, onprogress, onerror);
                    } else {
                        onerror && onerror('Unable to load MIDI file');
                    }
                }
            };
            fetch.send();
        }
    };

    midi.getFileInstruments = function () {
        var instruments = {};
        var programs = {};
        for (var n = 0; n < midi.data.length; n++) {
            var event = midi.data[n][0].event;
            if (event.type !== 'channel') {
                continue;
            }
            var channel = event.channel;
            switch (event.subtype) {
                case 'controller':
//				console.log(event.channel, MIDI.defineControl[event.controllerType], event.value);
                    break;
                case 'programChange':
                    programs[channel] = event.programNumber;
                    break;
                case 'noteOn':
                    var program = programs[channel];
                    var gm = generalMIDI.GM.byId[isFinite(program) ? program : channel];
                    instruments[gm.id] = true;
                    break;
            }
        }
        var ret = [];
        for (var key in instruments) {
            ret.push(key);
        }
        return ret;
    };

    // Playing the audio

    var eventQueue = []; // hold events to be triggered
    var queuedTime; //
    var startTime = 0; // to measure time elapse
    var noteRegistrar = {}; // get event for requested note
    var onMidiEvent = undefined; // listener
    var scheduleTracking = function (channel, note, currentTime, offset, message, velocity, time) {
        return setTimeout(function () {
            var data = {
                channel: channel,
                note: note,
                now: currentTime,
                end: midi.endTime,
                message: message,
                velocity: velocity
            };
            //
            if (message === 128) {
                delete noteRegistrar[note];
            } else {
                noteRegistrar[note] = data;
            }
            if (onMidiEvent) {
                onMidiEvent(data);
            }
            midi.currentTime = currentTime;
            ///
            eventQueue.shift();
            ///
            if (eventQueue.length < 1000) {
                startAudio(queuedTime, true);
            } else if (midi.currentTime === queuedTime && queuedTime < midi.endTime) { // grab next sequence
                startAudio(queuedTime, true);
            }
        }, currentTime - offset);
    };

    var getContext = function () {
        if (MIDI.api === 'webaudio') {
            return MIDI.WebAudio.getContext();
        } else {
            midi.ctx = {currentTime: 0};
        }
        return midi.ctx;
    };

    var getLength = function () {
        var data = midi.data;
        var length = data.length;
        var totalTime = 0.5;
        for (var n = 0; n < length; n++) {
            totalTime += data[n][1];
        }
        return totalTime;
    };

    var __now;
    var getNow = function () {
        if (window.performance && window.performance.now) {
            return window.performance.now();
        } else {
            return Date.now();
        }
    };

    var startAudio = function (currentTime, fromCache, onsuccess) {
        if (!midi.replayer) {
            return;
        }
        if (!fromCache) {
            if (typeof currentTime === 'undefined') {
                currentTime = midi.restart;
            }
            ///
            midi.playing && stopAudio();
            midi.playing = true;
            midi.data = midi.replayer.getData();
            midi.endTime = getLength();
        }
        ///
        var note;
        var offset = 0;
        var messages = 0;
        var data = midi.data;
        var ctx = getContext();
        var length = data.length;
        //
        queuedTime = 0.5;
        ///
        var interval = eventQueue[0] && eventQueue[0].interval || 0;
        var foffset = currentTime - midi.currentTime;
        ///
        if (MIDI.api === 'webmidi') {
            ctx.currentTime = getNow() / 1000;
        } else if (MIDI.api !== 'webaudio') { // set currentTime on ctx
            var now = getNow();
            __now = __now || now;
            ctx.currentTime = (now - __now) / 1000;
        }
        ///
        startTime = ctx.currentTime;
        ///
        for (var n = 0; n < length && messages < 100; n++) {
            var obj = data[n];
            if ((queuedTime += obj[1]) <= currentTime) {
                offset = queuedTime;
                continue;
            }
            ///
            currentTime = queuedTime - offset;
            ///
            var event = obj[0].event;
            if (event.type !== 'channel') {
                continue;
            }
            ///
            var channelId = event.channel;
            var channel = MIDI.channels[channelId];
            var delay = ctx.currentTime + ((currentTime + foffset + midi.startDelay) / 1000);
            var queueTime = queuedTime - offset + midi.startDelay;
            switch (event.subtype) {
                case 'controller':
                    MIDI.setController(channelId, event.controllerType, event.value, delay);
                    break;
                case 'programChange':
                    MIDI.programChange(channelId, event.programNumber, delay);
                    break;
                case 'pitchBend':
                    MIDI.pitchBend(channelId, event.value, delay);
                    break;
                case 'noteOn':
                    if (channel.mute) break;
                    note = event.noteNumber - (midi.MIDIOffset || 0);
                    eventQueue.push({
                        event: event,
                        time: queueTime,
                        source: MIDI.noteOn(channelId, event.noteNumber, event.velocity, delay),
                        interval: scheduleTracking(channelId, note, queuedTime + midi.startDelay, offset - foffset, 144, event.velocity)
                    });
                    messages++;
                    break;
                case 'noteOff':
                    if (channel.mute) break;
                    note = event.noteNumber - (midi.MIDIOffset || 0);
                    eventQueue.push({
                        event: event,
                        time: queueTime,
                        source: MIDI.noteOff(channelId, event.noteNumber, delay),
                        interval: scheduleTracking(channelId, note, queuedTime, offset - foffset, 128, 0)
                    });
                    break;
                default:
                    break;
            }
        }
        ///
        onsuccess && onsuccess(eventQueue);
    };

    var stopAudio = function () {
        var ctx = getContext();
        midi.playing = false;
        midi.restart += (ctx.currentTime - startTime) * 1000;
        // stop the audio, and intervals
        while (eventQueue.length) {
            var o = eventQueue.pop();
            window.clearInterval(o.interval);
            if (!o.source) continue; // is not webaudio
            if (typeof(o.source) === 'number') {
                window.clearTimeout(o.source);
            } else { // webaudio
                o.source.disconnect(0);
            }
        }
        // run callback to cancel any notes still playing
        for (var key in noteRegistrar) {
            var o = noteRegistrar[key]
            if (noteRegistrar[key].message === 144 && onMidiEvent) {
                onMidiEvent({
                    channel: o.channel,
                    note: o.note,
                    now: o.now,
                    end: o.end,
                    message: 128,
                    velocity: o.velocity
                });
            }
        }
        // reset noteRegistrar
        noteRegistrar = {};
    };

    return midi;
};

},{"./gm":23}],26:[function(require,module,exports){
/*
 ----------------------------------------------------------------------
 AudioTag <audio> - OGG or MPEG Soundbank
 ----------------------------------------------------------------------
 http://dev.w3.org/html5/spec/Overview.html#the-audio-element
 ----------------------------------------------------------------------
 */
var generalMIDI = require('./gm');
var Base64Binary = require('../lib/Base64binary');
var Tuna = require('tunajs');
var midi = {api: 'audiotag'};
var noteToKey = {};
var volume = 127; // floating point
var buffer_nid = -1; // current channel
var audioBuffers = []; // the audio channels
var notesOn = []; // instrumentId + noteId that is currently playing in each 'channel', for routing noteOff/chordOff calls
var notes = {}; // the piano keys
var channels;
for (var nid = 0; nid < 12; nid++) {
    audioBuffers[nid] = new Audio();
}

var playChannel = function (channel, note) {
    if (!channels[channel]) return;
    var instrument = channels[channel].instrument;
    var instrumentId = generalMIDI.GM.byId[instrument].id;
    var note = notes[note];
    if (note) {
        var instrumentNoteId = instrumentId + '' + note.id;
        var nid = (buffer_nid + 1) % audioBuffers.length;
        var audio = audioBuffers[nid];
        notesOn[nid] = instrumentNoteId;
        if (!window.MIDI.Soundfont[instrumentId]) {
            if (root.DEBUG) {
                console.log('404', instrumentId);
            }
            return;
        }
        audio.src = window.MIDI.Soundfont[instrumentId][note.id];
        audio.volume = volume / 127;
        audio.play();
        buffer_nid = nid;
    }
};

var stopChannel = function (channel, note) {
    if (!channels[channel]) return;
    var instrument = channels[channel].instrument;
    var instrumentId = generalMIDI.GM.byId[instrument].id;
    var note = notes[note];
    if (note) {
        var instrumentNoteId = instrumentId + '' + note.id;
        for (var i = 0, len = audioBuffers.length; i < len; i++) {
            var nid = (i + buffer_nid + 1) % len;
            var cId = notesOn[nid];
            if (cId && cId == instrumentNoteId) {
                audioBuffers[nid].pause();
                notesOn[nid] = null;
                return;
            }
        }
    }
};

midi.audioBuffers = audioBuffers;
midi.send = function (data, delay) {};
midi.setController = function (channel, type, value, delay) {};
midi.setVolume = function (channel, n) {
    volume = n; //- should be channel specific volume
};

midi.programChange = function (channel, program) {
    channels[channel].instrument = program;
};

midi.pitchBend = function (channel, program, delay) {
};

midi.noteOn = function (channel, note, velocity, delay) {
    var id = noteToKey[note];
    if (!notes[id]) return;
    if (delay) {
        return setTimeout(function () {
            playChannel(channel, id);
        }, delay * 1000);
    } else {
        playChannel(channel, id);
    }
};

midi.noteOff = function (channel, note, delay) {
// 			var id = noteToKey[note];
// 			if (!notes[id]) return;
// 			if (delay) {
// 				return setTimeout(function() {
// 					stopChannel(channel, id);
// 				}, delay * 1000)
// 			} else {
// 				stopChannel(channel, id);
// 			}
};

midi.chordOn = function (channel, chord, velocity, delay) {
    for (var idx = 0; idx < chord.length; idx++) {
        var n = chord[idx];
        var id = noteToKey[n];
        if (!notes[id]) continue;
        if (delay) {
            return setTimeout(function () {
                playChannel(channel, id);
            }, delay * 1000);
        } else {
            playChannel(channel, id);
        }
    }
};

midi.chordOff = function (channel, chord, delay) {
    for (var idx = 0; idx < chord.length; idx++) {
        var n = chord[idx];
        var id = noteToKey[n];
        if (!notes[id]) continue;
        if (delay) {
            return setTimeout(function () {
                stopChannel(channel, id);
            }, delay * 1000);
        } else {
            stopChannel(channel, id);
        }
    }
};

midi.stopAllNotes = function () {
    for (var nid = 0, length = audioBuffers.length; nid < length; nid++) {
        audioBuffers[nid].pause();
    }
};

midi.connect = function (opts, _channels_) {
    //root.setDefaultPlugin(midi);
    ///
    channels = _channels_;
    for (var key in generalMIDI.keyToNote) {
        noteToKey[generalMIDI.keyToNote[key]] = key;
        notes[key] = {id: key};
    }
    ///
    setTimeout(function(){
        opts.onsuccess && opts.onsuccess()
    });
    return this;
};

module.exports = midi;
},{"../lib/Base64binary":20,"./gm":23,"tunajs":18}],27:[function(require,module,exports){
/*
 ----------------------------------------------------------
 Web Audio API - OGG or MPEG Soundbank
 ----------------------------------------------------------
 http://webaudio.github.io/web-audio-api/
 ----------------------------------------------------------
 */


'use strict';
var generalMIDI = require('./gm');
var Base64Binary = require('../lib/Base64binary');
var Tuna = require('tunajs');
var audioContext = null; // new AudioContext();
var useStreamingBuffer = false; // !!audioContext.createMediaElementSource;
var midi = {api: 'webaudio'};
var ctx; // audio context
var sources = {};
var effects = {};
var masterVolume = 127;
var audioBuffers = {};
var channels;
///
midi.audioBuffers = audioBuffers;
midi.send = function (data, delay) {
};
midi.setController = function (channelId, type, value, delay) {
};

midi.setVolume = function (channelId, volume, delay) {
    if (delay) {
        setTimeout(function () {
            masterVolume = volume;
        }, delay * 1000);
    } else {
        masterVolume = volume;
    }
};

midi.programChange = function (channelId, program, delay) {
// 			if (delay) {
// 				return setTimeout(function() {
// 					var channel = channels[channelId];
// 					channel.instrument = program;
// 				}, delay);
// 			} else {
    var channel = channels[channelId];
    channel.instrument = program;
// 			}
};

midi.pitchBend = function (channelId, program, delay) {
// 			if (delay) {
// 				setTimeout(function() {
// 					var channel = channels[channelId];
// 					channel.pitchBend = program;
// 				}, delay);
// 			} else {
    var channel = channels[channelId];
    channel.pitchBend = program;
// 			}
};

midi.noteOn = function (channelId, noteId, velocity, delay) {
    delay = delay || 0;

    /// check whether the note exists
    var channel = channels[channelId];

    var instrument = channel.instrument;
    var bufferId = instrument + '' + noteId;

    var buffer = audioBuffers[bufferId];
    if (!buffer) {
		//console.log(generalMIDI.GM.byId[instrument].id, instrument, channelId);
        return;
    }


    /// convert relative delay to absolute delay
    if (delay < ctx.currentTime) {
        delay += ctx.currentTime;
    }
    /// create audio buffer
    if (useStreamingBuffer) {
        var source = ctx.createMediaElementSource(buffer);
    } else { // XMLHTTP buffer
        var source = ctx.createBufferSource();
        source.buffer = buffer;
    }

    /// add effects to buffer
    if (effects) {
        var chain = source;
        for (var key in effects) {
            chain.connect(effects[key].input);
            chain = effects[key];
        }
    }

    /// add gain + pitchShift
    var gain = (velocity / 127) * (masterVolume / 127) * 2 - 1;
    source.connect(ctx.destination);
    source.playbackRate.value = 1; // pitch shift
    source.gainNode = ctx.createGain(); // gain
    source.gainNode.connect(ctx.destination);
    source.gainNode.gain.value = Math.min(1.0, Math.max(-1.0, gain));
    source.connect(source.gainNode);
    ///
    if (useStreamingBuffer) {
        if (delay) {
            return setTimeout(function () {
                buffer.currentTime = 0;
                buffer.play()
            }, delay * 1000);
        } else {
            buffer.currentTime = 0;
            buffer.play()
        }
    } else {
        source.start(delay || 0);
    }
    ///
    sources[channelId + '' + noteId] = source;
    ///
    return source;
};

midi.noteOff = function (channelId, noteId, delay) {
    delay = delay || 0;

    /// check whether the note exists
    var channel = channels[channelId];
    var instrument = channel.instrument;
    var bufferId = instrument + '' + noteId;
    var buffer = audioBuffers[bufferId];
    if (buffer) {
        if (delay < ctx.currentTime) {
            delay += ctx.currentTime;
        }
        ///
        var source = sources[channelId + '' + noteId];
        if (source) {
            if (source.gainNode) {
                // @Miranet: 'the values of 0.2 and 0.3 could of course be used as
                // a 'release' parameter for ADSR like time settings.'
                // add { 'metadata': { release: 0.3 } } to soundfont files
                var gain = source.gainNode.gain;
                gain.linearRampToValueAtTime(gain.value, delay);
                gain.linearRampToValueAtTime(-1.0, delay + 0.3);
            }
            ///
            if (useStreamingBuffer) {
                if (delay) {
                    setTimeout(function () {
                        buffer.pause();
                    }, delay * 1000);
                } else {
                    buffer.pause();
                }
            } else {
                if (source.noteOff) {
                    source.noteOff(delay + 0.5);
                } else {
                    source.stop(delay + 0.5);
                }
            }
            ///
            delete sources[channelId + '' + noteId];
            ///
            return source;
        }
    }
};

midi.chordOn = function (channel, chord, velocity, delay) {
    var res = {};
    for (var n = 0, note, len = chord.length; n < len; n++) {
        res[note = chord[n]] = midi.noteOn(channel, note, velocity, delay);
    }
    return res;
};

midi.chordOff = function (channel, chord, delay) {
    var res = {};
    for (var n = 0, note, len = chord.length; n < len; n++) {
        res[note = chord[n]] = midi.noteOff(channel, note, delay);
    }
    return res;
};

midi.stopAllNotes = function () {
    for (var sid in sources) {
        var delay = 0;
        if (delay < ctx.currentTime) {
            delay += ctx.currentTime;
        }
        var source = sources[sid];
        source.gain.linearRampToValueAtTime(1, delay);
        source.gain.linearRampToValueAtTime(0, delay + 0.3);
        if (source.noteOff) { // old api
            source.noteOff(delay + 0.3);
        } else { // new api
            source.stop(delay + 0.3);
        }
        delete sources[sid];
    }
};

midi.setEffects = function (list) {
    if (ctx.tunajs) {
        for (var n = 0; n < list.length; n++) {
            var data = list[n];
            var effect = new ctx.tunajs[data.type](data);
            effect.connect(ctx.destination);
            effects[data.type] = effect;
        }
    } else {
        return console.log('Effects module not installed.');
    }
};

midi.connect = function (opts, _channels_) {
    //root.setDefaultPlugin(midi);
    channels = _channels_;
    midi.setContext(ctx || createAudioContext(), opts.onsuccess);
    return this;
};

midi.getContext = function () {
    return ctx;
};

midi.setContext = function (newCtx, onload, onprogress, onerror) {

    ctx = newCtx;
    /// tuna.js effects module - https://github.com/Dinahmoe/tuna
    if (typeof Tuna !== 'undefined' && !ctx.tunajs) {
        ctx.tunajs = new Tuna(ctx);
    }
    /// loading audio files
    var urls = [];
    var notes = generalMIDI.keyToNote;
    for (var key in notes) urls.push(key);
    ///
    var waitForEnd = function (instrument) {
        for (var key in bufferPending) { // has pending items
            if (bufferPending[key]) return;
        }
        ///
        if (onload) { // run onload once
            onload();
            onload = null;
        }
    };
    ///
    var requestAudio = function (soundfont, instrumentId, index, key) {
        var url = soundfont[key];
        if (url) {
            bufferPending[instrumentId]++;
            loadAudio(url, function (buffer) {
                buffer.id = key;
                var noteId = generalMIDI.keyToNote[key];
                audioBuffers[instrumentId + '' + noteId] = buffer;
                ///
                if (--bufferPending[instrumentId] === 0) {
                    var percent = index / 87;
// 							console.log(MIDI.GM.byId[instrumentId], 'processing: ', percent);
                    soundfont.isLoaded = true;
                    waitForEnd(instrument);
                }
            }, function (err) {
                // 				console.log(err);
            });
        }
    };
    ///
    var bufferPending = {};

    for (var instrument in window.MIDI.Soundfont) {
        var soundfont = window.MIDI.Soundfont[instrument];

        if (soundfont.isLoaded) {
            continue;
        }
        ///
        var synth = generalMIDI.GM.byName[instrument];
        var instrumentId = synth.number;
        ///
        bufferPending[instrumentId] = 0;
        ///
        for (var index = 0; index < urls.length; index++) {
            var key = urls[index];
            requestAudio(soundfont, instrumentId, index, key);
        }
    }
    ///
    setTimeout(waitForEnd, 1);
};

/* Load audio file: streaming | base64 | arraybuffer
 ---------------------------------------------------------------------- */
function loadAudio(url, onload, onerror) {
    if (useStreamingBuffer) {
        var audio = new Audio();
        audio.src = url;
        audio.controls = false;
        audio.autoplay = false;
        audio.preload = false;
        audio.addEventListener('canplay', function () {
            onload && onload(audio);
        });
        audio.addEventListener('error', function (err) {
            onerror && onerror(err);
        });
        document.body.appendChild(audio);
    } else if (url.indexOf('data:audio') === 0) { // Base64 string
        var base64 = url.split(',')[1];
        var buffer = Base64Binary.decodeArrayBuffer(base64);
        ctx.decodeAudioData(buffer, onload, onerror);
    } else { // XMLHTTP buffer
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        request.onload = function () {
            ctx.decodeAudioData(request.response, onload, onerror);
        };
        request.send();
    }
};

function createAudioContext() {
    return new (window.AudioContext || window.webkitAudioContext)();
};

module.exports = midi;
},{"../lib/Base64binary":20,"./gm":23,"tunajs":18}],28:[function(require,module,exports){
/*
 ----------------------------------------------------------------------
 Web MIDI API - Native Soundbanks
 ----------------------------------------------------------------------
 http://webaudio.github.io/web-midi-api/
 ----------------------------------------------------------------------
 */
'use strict';
require('../../node_modules/web-midi-api/WebMIDIAPI.min.js');
var plugin = null;
var output = null;
var midi = {api: 'webmidi'};
midi.send = function (data, delay) { // set channel volume
    output.send(data, delay * 1000);
};

midi.setController = function (channel, type, value, delay) {
    output.send([channel, type, value], delay * 1000);
};

midi.setVolume = function (channel, volume, delay) { // set channel volume
    output.send([0xB0 + channel, 0x07, volume], delay * 1000);
};

midi.programChange = function (channel, program, delay) { // change patch (instrument)
    output.send([0xC0 + channel, program], delay * 1000);
};

midi.pitchBend = function(channel, program, delay) { // pitch bend
    output.send([0xE0 + channel, program & 0x7F, program >> 7], delay * 1000);
};

midi.noteOn = function (channel, note, velocity, delay) {
    output.send([0x90 + channel, note, velocity], delay * 1000);
};

midi.noteOff = function (channel, note, delay) {
    output.send([0x80 + channel, note, 0], delay * 1000);
};

midi.chordOn = function (channel, chord, velocity, delay) {
    for (var n = 0; n < chord.length; n++) {
        var note = chord[n];
        output.send([0x90 + channel, note, velocity], delay * 1000);
    }
};

midi.chordOff = function (channel, chord, delay) {
    for (var n = 0; n < chord.length; n++) {
        var note = chord[n];
        output.send([0x80 + channel, note, 0], delay * 1000);
    }
};

midi.stopAllNotes = function () {
    output.cancel();
    for (var channel = 0; channel < 16; channel++) {
        output.send([0xB0 + channel, 0x7B, 0]);
    }
};

midi.connect = function (opts) {
    window.navigator.requestMIDIAccess().then(function (access) {
        plugin = access;
        var pluginOutputs = plugin.outputs;
        if (typeof pluginOutputs == 'function') pluginOutputs = pluginOutputs();  // Chrome pre-43
        if (pluginOutputs.size > 0) {
            output = pluginOutputs.values().next().value;
            opts.onsuccess && opts.onsuccess();
        }
    });
    return this;
};

module.exports = midi;
},{"../../node_modules/web-midi-api/WebMIDIAPI.min.js":19}],29:[function(require,module,exports){
/*
	-----------------------------------------------------------
	dom.loadScript.js : 0.1.4 : 2014/02/12 : http://mudcu.be
	-----------------------------------------------------------
	Copyright 2011-2014 Mudcube. All rights reserved.
	-----------------------------------------------------------
	/// No verification
	dom.loadScript.add("../js/jszip/jszip.js");
	/// Strict loading order and verification.
	dom.loadScript.add({
		strictOrder: true,
		urls: [
			{
				url: "../js/jszip/jszip.js",
				verify: "JSZip",
				onsuccess: function() {
					console.log(1)
				}
			},
			{ 
				url: "../inc/downloadify/js/swfobject.js",
				verify: "swfobject",
				onsuccess: function() {
					console.log(2)
				}
			}
		],
		onsuccess: function() {
			console.log(3)
		}
	});
	/// Just verification.
	dom.loadScript.add({
		url: "../js/jszip/jszip.js",
		verify: "JSZip",
		onsuccess: function() {
			console.log(1)
		}
	});
*/

if (typeof(dom) === "undefined") var dom = {};

(function() { "use strict";

dom.loadScript = function() {
	this.loaded = {};
	this.loading = {};
	return this;
};

dom.loadScript.prototype.add = function(config) {
	var that = this;
	if (typeof(config) === "string") {
		config = { url: config };
	}
	var urls = config.urls;
	if (typeof(urls) === "undefined") {
		urls = [{ 
			url: config.url, 
			verify: config.verify
		}];
	}
	/// adding the elements to the head
	var doc = document.getElementsByTagName("head")[0];
	/// 
	var testElement = function(element, test) {
		if (that.loaded[element.url]) return;
		if (test && globalExists(test) === false) return;
		that.loaded[element.url] = true;
		//
		if (that.loading[element.url]) that.loading[element.url]();
		delete that.loading[element.url];
		//
		if (element.onsuccess) element.onsuccess();
		if (typeof(getNext) !== "undefined") getNext();
	};
	///
	var hasError = false;
	var batchTest = [];
	var addElement = function(element) {
		if (typeof(element) === "string") {
			element = {
				url: element,
				verify: config.verify
			};
		}
		if (/([\w\d.\[\]\'\"])$/.test(element.verify)) { // check whether its a variable reference
			var verify = element.test = element.verify;
			if (typeof(verify) === "object") {
				for (var n = 0; n < verify.length; n ++) {
					batchTest.push(verify[n]);
				}			
			} else {
				batchTest.push(verify);
			}
		}
		if (that.loaded[element.url]) return;
		var script = document.createElement("script");
		script.onreadystatechange = function() {
			if (this.readyState !== "loaded" && this.readyState !== "complete") return;
			testElement(element);
		};
		script.onload = function() {
			testElement(element);
		};
		script.onerror = function() {
			hasError = true;
			delete that.loading[element.url];
			if (typeof(element.test) === "object") {
				for (var key in element.test) {
					removeTest(element.test[key]);
				}			
			} else {
				removeTest(element.test);
			}
		};
		script.setAttribute("type", "text/javascript");
		script.setAttribute("src", element.url);
		doc.appendChild(script);
		that.loading[element.url] = function() {};
	};
	/// checking to see whether everything loaded properly
	var removeTest = function(test) {
		var ret = [];
		for (var n = 0; n < batchTest.length; n ++) {
			if (batchTest[n] === test) continue;
			ret.push(batchTest[n]);
		}
		batchTest = ret;
	};
	var onLoad = function(element) {
		if (element) {
			testElement(element, element.test);
		} else {
			for (var n = 0; n < urls.length; n ++) {
				testElement(urls[n], urls[n].test);
			}
		}
		var istrue = true;
		for (var n = 0; n < batchTest.length; n ++) {
			if (globalExists(batchTest[n]) === false) {
				istrue = false;
			}
		}
		if (!config.strictOrder && istrue) { // finished loading all the requested scripts
			if (hasError) {
				if (config.error) {
					config.error();
				}
			} else if (config.onsuccess) {
				config.onsuccess();
			}
		} else { // keep calling back the function
			setTimeout(function() { //- should get slower over time?
				onLoad(element);
			}, 10);
		}
	};
	/// loading methods;  strict ordering or loose ordering
	if (config.strictOrder) {
		var ID = -1;
		var getNext = function() {
			ID ++;
			if (!urls[ID]) { // all elements are loaded
				if (hasError) {
					if (config.error) {
						config.error();
					}
				} else if (config.onsuccess) {
					config.onsuccess();
				}
			} else { // loading new script
				var element = urls[ID];
				var url = element.url;
				if (that.loading[url]) { // already loading from another call (attach to event)
					that.loading[url] = function() {
						if (element.onsuccess) element.onsuccess();
						getNext();
					}
				} else if (!that.loaded[url]) { // create script element
					addElement(element);
					onLoad(element);
				} else { // it's already been successfully loaded
					getNext();
				}
			}
		};
		getNext();
	} else { // loose ordering
		for (var ID = 0; ID < urls.length; ID ++) {
			addElement(urls[ID]);
			onLoad(urls[ID]);
		}
	}
};

dom.loadScript = new dom.loadScript();

var globalExists = function(path, root) {
	try {
		path = path.split('"').join('').split("'").join('').split(']').join('').split('[').join('.');
		var parts = path.split(".");
		var length = parts.length;
		var object = root || window;
		for (var n = 0; n < length; n ++) {
			var key = parts[n];
			if (object[key] == null) {
				return false;
			} else { //
				object = object[key];
			}
		}
		return true;
	} catch(e) {
		return false;
	}
};

})();

/// For NodeJS
if (typeof (module) !== "undefined" && module.exports) {
	module.exports = dom;
}
},{}],30:[function(require,module,exports){
/*
 ----------------------------------------------------------
 util/Request : 0.1.1 : 2015-03-26
 ----------------------------------------------------------
 util.request({
 url: './dir/something.extension',
 data: 'test!',
 format: 'text', // text | xml | json | binary
 responseType: 'text', // arraybuffer | blob | document | json | text
 headers: {},
 withCredentials: true, // true | false
 ///
 onerror: function(evt, percent) {
 console.log(evt);
 },
 onsuccess: function(evt, responseText) {
 console.log(responseText);
 },
 onprogress: function(evt, percent) {
 percent = Math.round(percent * 100);
 loader.create('thread', 'loading... ', percent);
 }
 });
 */




var request = function (opts, onsuccess, onerror, onprogress) {
    'use strict';
    if (typeof opts === 'string') opts = {url: opts};
    ///
    var data = opts.data;
    var url = opts.url;
    var method = opts.method || (opts.data ? 'POST' : 'GET');
    var format = opts.format;
    var headers = opts.headers;
    var responseType = opts.responseType;
    var withCredentials = opts.withCredentials || false;
    ///
    var onsuccess = onsuccess || opts.onsuccess;
    var onerror = onerror || opts.onerror;
    var onprogress = onprogress || opts.onprogress;
    ///
    if (typeof NodeFS !== 'undefined' && root.loc.isLocalUrl(url)) {
        NodeFS.readFile(url, 'utf8', function (err, res) {
            if (err) {
                onerror && onerror(err);
            } else {
                onsuccess && onsuccess({responseText: res});
            }
        });
        return;
    }
    ///
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    ///
    if (headers) {
        for (var type in headers) {
            xhr.setRequestHeader(type, headers[type]);
        }
    } else if (data) { // set the default headers for POST
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    if (format === 'binary') { //- default to responseType="blob" when supported
        if (xhr.overrideMimeType) {
            xhr.overrideMimeType('text/plain; charset=x-user-defined');
        }
    }
    if (responseType) {
        xhr.responseType = responseType;
    }
    if (withCredentials) {
        xhr.withCredentials = 'true';
    }
    if (onerror && 'onerror' in xhr) {
        xhr.onerror = onerror;
    }
    if (onprogress && xhr.upload && 'onprogress' in xhr.upload) {
        if (data) {
            xhr.upload.onprogress = function (evt) {
                onprogress.call(xhr, evt, event.loaded / event.total);
            };
        } else {
            xhr.addEventListener('progress', function (evt) {
                var totalBytes = 0;
                if (evt.lengthComputable) {
                    totalBytes = evt.total;
                } else if (xhr.totalBytes) {
                    totalBytes = xhr.totalBytes;
                } else {
                    var rawBytes = parseInt(xhr.getResponseHeader('Content-Length-Raw'));
                    if (isFinite(rawBytes)) {
                        xhr.totalBytes = totalBytes = rawBytes;
                    } else {
                        return;
                    }
                }
                onprogress.call(xhr, evt, evt.loaded / totalBytes);
            });
        }
    }
    ///
    xhr.onreadystatechange = function (evt) {
        if (xhr.readyState === 4) { // The request is complete
            if (xhr.status === 200 || // Response OK
                xhr.status === 304 || // Not Modified
                xhr.status === 308 || // Permanent Redirect
                xhr.status === 0 && root.client.cordova // Cordova quirk
            ) {
                if (onsuccess) {
                    var res;
                    if (format === 'xml') {
                        res = evt.target.responseXML;
                    } else if (format === 'text') {
                        res = evt.target.responseText;
                    } else if (format === 'json') {
                        try {
                            res = JSON.parse(evt.target.response);
                        } catch (err) {
                            onerror && onerror.call(xhr, evt);
                        }
                    }
                    ///
                    onsuccess.call(xhr, evt, res);
                }
            } else {
                onerror && onerror.call(xhr, evt);
            }
        }
    };
    xhr.send(data);
    return xhr;
};

module.exports = request;

},{}]},{},[21])


//# sourceMappingURL=bundle.js.map
