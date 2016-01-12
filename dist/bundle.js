(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * lodash 3.3.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseIsEqual = require('lodash._baseisequal'),
    bindCallback = require('lodash._bindcallback'),
    isArray = require('lodash.isarray'),
    pairs = require('lodash.pairs');

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `value` to a string if it's not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  return value == null ? '' : (value + '');
}

/**
 * The base implementation of `_.callback` which supports specifying the
 * number of arguments to provide to `func`.
 *
 * @private
 * @param {*} [func=_.identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function baseCallback(func, thisArg, argCount) {
  var type = typeof func;
  if (type == 'function') {
    return thisArg === undefined
      ? func
      : bindCallback(func, thisArg, argCount);
  }
  if (func == null) {
    return identity;
  }
  if (type == 'object') {
    return baseMatches(func);
  }
  return thisArg === undefined
    ? property(func)
    : baseMatchesProperty(func, thisArg);
}

/**
 * The base implementation of `get` without support for string paths
 * and default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path of the property to get.
 * @param {string} [pathKey] The key representation of path.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path, pathKey) {
  if (object == null) {
    return;
  }
  if (pathKey !== undefined && pathKey in toObject(object)) {
    path = [pathKey];
  }
  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[path[index++]];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * The base implementation of `_.isMatch` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Array} matchData The propery names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = toObject(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var result = customizer ? customizer(objValue, srcValue, key) : undefined;
      if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
        return false;
      }
    }
  }
  return true;
}

/**
 * The base implementation of `_.matches` which does not clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    var key = matchData[0][0],
        value = matchData[0][1];

    return function(object) {
      if (object == null) {
        return false;
      }
      return object[key] === value && (value !== undefined || (key in toObject(object)));
    };
  }
  return function(object) {
    return baseIsMatch(object, matchData);
  };
}

/**
 * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to compare.
 * @returns {Function} Returns the new function.
 */
function baseMatchesProperty(path, srcValue) {
  var isArr = isArray(path),
      isCommon = isKey(path) && isStrictComparable(srcValue),
      pathKey = (path + '');

  path = toPath(path);
  return function(object) {
    if (object == null) {
      return false;
    }
    var key = pathKey;
    object = toObject(object);
    if ((isArr || !isCommon) && !(key in object)) {
      object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
      if (object == null) {
        return false;
      }
      key = last(path);
      object = toObject(object);
    }
    return object[key] === srcValue
      ? (srcValue !== undefined || (key in object))
      : baseIsEqual(srcValue, object[key], undefined, true);
  };
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
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new function.
 */
function basePropertyDeep(path) {
  var pathKey = (path + '');
  path = toPath(path);
  return function(object) {
    return baseGet(object, path, pathKey);
  };
}

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  start = start == null ? 0 : (+start || 0);
  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = (end === undefined || end > length) ? length : (+end || 0);
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

/**
 * Gets the propery names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = pairs(object),
      length = result.length;

  while (length--) {
    result[length][2] = isStrictComparable(result[length][1]);
  }
  return result;
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  var type = typeof value;
  if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
    return true;
  }
  if (isArray(value)) {
    return false;
  }
  var result = !reIsDeepProp.test(value);
  return result || (object != null && value in toObject(object));
}

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
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
 * Converts `value` to property path array if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Array} Returns the property path array.
 */
function toPath(value) {
  if (isArray(value)) {
    return value;
  }
  var result = [];
  baseToString(value).replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
}

/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
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

/**
 * Creates a function that returns the property value at `path` on a
 * given object.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': { 'c': 2 } } },
 *   { 'a': { 'b': { 'c': 1 } } }
 * ];
 *
 * _.map(objects, _.property('a.b.c'));
 * // => [2, 1]
 *
 * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
}

module.exports = baseCallback;

},{"lodash._baseisequal":5,"lodash._bindcallback":6,"lodash.isarray":10,"lodash.pairs":13}],2:[function(require,module,exports){
/**
 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var keys = require('lodash.keys');

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.forEach` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object|string} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

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
 * The base implementation of `_.forOwn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return baseFor(object, iteratee, keys);
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
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    var length = collection ? getLength(collection) : 0;
    if (!isLength(length)) {
      return eachFunc(collection, iteratee);
    }
    var index = fromRight ? length : -1,
        iterable = toObject(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

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

module.exports = baseEach;

},{"lodash.keys":12}],3:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
 * without support for callback shorthands and `this` binding, which iterates
 * over `collection` using the provided `eachFunc`.
 *
 * @private
 * @param {Array|Object|string} collection The collection to search.
 * @param {Function} predicate The function invoked per iteration.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @param {boolean} [retKey] Specify returning the key of the found element
 *  instead of the element itself.
 * @returns {*} Returns the found element or its key, else `undefined`.
 */
function baseFind(collection, predicate, eachFunc, retKey) {
  var result;
  eachFunc(collection, function(value, key, collection) {
    if (predicate(value, key, collection)) {
      result = retKey ? key : value;
      return false;
    }
  });
  return result;
}

module.exports = baseFind;

},{}],4:[function(require,module,exports){
/**
 * lodash 3.6.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for callback shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {Function} predicate The function invoked per iteration.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromRight) {
  var length = array.length,
      index = fromRight ? length : -1;

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;

},{}],5:[function(require,module,exports){
/**
 * lodash 3.0.7 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var isArray = require('lodash.isarray'),
    isTypedArray = require('lodash.istypedarray'),
    keys = require('lodash.keys');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

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
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * A specialized version of `_.some` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.isEqual` without support for `this` binding
 * `customizer` functions.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = objToString.call(object);
    if (objTag == argsTag) {
      objTag = objectTag;
    } else if (objTag != objectTag) {
      objIsArr = isTypedArray(object);
    }
  }
  if (!othIsArr) {
    othTag = objToString.call(other);
    if (othTag == argsTag) {
      othTag = objectTag;
    } else if (othTag != objectTag) {
      othIsArr = isTypedArray(other);
    }
  }
  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && !(objIsArr || objIsObj)) {
    return equalByTag(object, other, objTag);
  }
  if (!isLoose) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
    }
  }
  if (!isSameTag) {
    return false;
  }
  // Assume cyclic values are equal.
  // For more information on detecting circular references see https://es5.github.io/#JO.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == object) {
      return stackB[length] == other;
    }
  }
  // Add `object` and `other` to the stack of traversed objects.
  stackA.push(object);
  stackB.push(other);

  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

  stackA.pop();
  stackB.pop();

  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing arrays.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var index = -1,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
    return false;
  }
  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index],
        result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;

    if (result !== undefined) {
      if (result) {
        continue;
      }
      return false;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (isLoose) {
      if (!arraySome(other, function(othValue) {
            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
          })) {
        return false;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
      return false;
    }
  }
  return true;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} value The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag) {
  switch (tag) {
    case boolTag:
    case dateTag:
      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
      return +object == +other;

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case numberTag:
      // Treat `NaN` vs. `NaN` as equal.
      return (object != +object)
        ? other != +other
        : object == +other;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings primitives and string
      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
      return object == (other + '');
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isLoose) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  var skipCtor = isLoose;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key],
        result = customizer ? customizer(isLoose ? othValue : objValue, isLoose? objValue : othValue, key) : undefined;

    // Recursively compare objects (susceptible to call stack limits).
    if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
      return false;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (!skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      return false;
    }
  }
  return true;
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

module.exports = baseIsEqual;

},{"lodash.isarray":10,"lodash.istypedarray":11,"lodash.keys":12}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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
 * lodash 3.2.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseCallback = require('lodash._basecallback'),
    baseEach = require('lodash._baseeach'),
    baseFind = require('lodash._basefind'),
    baseFindIndex = require('lodash._basefindindex'),
    isArray = require('lodash.isarray');

/**
 * Creates a `_.find` or `_.findLast` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new find function.
 */
function createFind(eachFunc, fromRight) {
  return function(collection, predicate, thisArg) {
    predicate = baseCallback(predicate, thisArg, 3);
    if (isArray(collection)) {
      var index = baseFindIndex(collection, predicate, fromRight);
      return index > -1 ? collection[index] : undefined;
    }
    return baseFind(collection, predicate, eachFunc);
  };
}

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is bound to `thisArg` and
 * invoked with three arguments: (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @alias detect
 * @category Collection
 * @param {Array|Object|string} collection The collection to search.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * _.result(_.find(users, function(chr) {
 *   return chr.age < 40;
 * }), 'user');
 * // => 'barney'
 *
 * // using the `_.matches` callback shorthand
 * _.result(_.find(users, { 'age': 1, 'active': true }), 'user');
 * // => 'pebbles'
 *
 * // using the `_.matchesProperty` callback shorthand
 * _.result(_.find(users, 'active', false), 'user');
 * // => 'fred'
 *
 * // using the `_.property` callback shorthand
 * _.result(_.find(users, 'active'), 'user');
 * // => 'barney'
 */
var find = createFind(baseEach);

module.exports = find;

},{"lodash._basecallback":1,"lodash._baseeach":2,"lodash._basefind":3,"lodash._basefindindex":4,"lodash.isarray":10}],9:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{"lodash._getnative":7,"lodash.isarguments":9,"lodash.isarray":10}],13:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var keys = require('lodash.keys');

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

/**
 * Creates a two dimensional array of the key-value pairs for `object`,
 * e.g. `[[key1, value1], [key2, value2]]`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the new array of key-value pairs.
 * @example
 *
 * _.pairs({ 'barney': 36, 'fred': 40 });
 * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
 */
function pairs(object) {
  object = toObject(object);

  var index = -1,
      props = keys(object),
      length = props.length,
      result = Array(length);

  while (++index < length) {
    var key = props[index];
    result[index] = [key, object[key]];
  }
  return result;
}

module.exports = pairs;

},{"lodash.keys":12}],14:[function(require,module,exports){
module.exports={
  "Piano": {
    "Acoustic Grand Piano": 0,
    "Bright Acoustic Piano": 1,
    "Electric Grand Piano": 2,
    "Honky-tonk Piano": 3,
    "Electric Piano 1": 4,
    "Electric Piano 2": 5,
    "Harpsichord":6,
    "Clavinet": 7
  },
  "Chromatic Percussion": {
    "Celesta": 8,
    "Glockenspiel": 9,
    "Music Box": 10,
    "Vibraphone": 11,
    "Marimba": 12,
    "Xylophone": 13,
    "Tubular Bells": 14,
    "Dulcimer": 15
  },
  "Organ": {
    "Drawbar Organ": 16,
    "Percussive Organ": 17,
    "Rock Organ": 18,
    "Church Organ": 19,
    "Reed Organ": 20,
    "Accordion": 21,
    "Harmonica": 22,
    "Tango Accordion": 23
  },
  "Guitar": {
    "Acoustic Guitar (nylon)": 24,
    "Acoustic Guitar (steel)": 25,
    "Electric Guitar (jazz)": 26,
    "Electric Guitar (clean)": 27,
    "Electric Guitar (muted)": 28,
    "Overdriven Guitar": 29,
    "Distortion Guitar": 30,
    "Guitar Harmonics": 31
  },
  "Bass": {
    "Acoustic Bass": 32,
    "Electric Bass (finger)": 33,
    "Electric Bass (pick)": 34,
    "Fretless Bass": 35,
    "Slap Bass 1": 36,
    "Slap Bass 2": 37,
    "Synth Bass 1": 38,
    "Synth Bass 2": 39
  },
  "Strings": {
    "Violin": 40,
    "Viola": 41,
    "Cello": 42,
    "Contrabass": 43,
    "Tremolo Strings": 44,
    "Pizzicato Strings": 45,
    "Orchestral Harp": 46,
    "Timpani": 47
  },
  "Brass": {
    "Trumpet": 56,
    "Trombone": 57,
    "Tuba": 58,
    "Muted Trumpet": 59,
    "French Horn": 60,
    "Brass Section": 61,
    "Synth Brass 1": 62,
    "Synth Brass 2": 63
  },
  "Reed": {
    "Soprano Sax": 64,
    "Alto Sax": 65,
    "Tenor Sax": 66,
    "Baritone Sax": 67,
    "Oboe": 68,
    "English Horn": 69,
    "Bassoon": 70,
    "Clarinet": 71
  },
  "Pipe": {
    "Piccolo": 72,
    "Flute": 73,
    "Recorder": 74,
    "Pan Flute": 75,
    "Blown Bottle": 76,
    "Shakuhachi": 77,
    "Whistle": 78,
    "Ocarina": 79
  },
  "Synth Lead": {
    "Lead 1 (square)": 80,
    "Lead 2 (sawtooth)": 81,
    "Lead 3 (calliope)": 82,
    "Lead 4 (chiff)": 83,
    "Lead 5 (charang)": 84,
    "Lead 6 (voice)": 85,
    "Lead 7 (fifths)": 86,
    "Lead 8 (bass + lead)": 87
  },
  "Synth Pad": {
    "Pad 1 (new age)": 88,
    "Pad 2 (warm)": 89,
    "Pad 3 (polysynth)": 90,
    "Pad 4 (choir)": 91,
    "Pad 5 (bowed)": 92,
    "Pad 6 (metallic)": 93,
    "Pad 7 (halo)": 94,
    "Pad 8 (sweep)": 95
  },
  "Synth Effects": {
    "FX 1 (rain)": 96,
    "FX 2 (soundtrack)": 97,
    "FX 3 (crystal)": 98,
    "FX 4 (atmosphere)": 99,
    "FX 5 (brightness)": 100,
    "FX 6 (goblins)": 101,
    "FX 7 (echoes)": 102,
    "FX 8 (sci-fi)": 103
  },
  "Ethnic": {
    "Sitar": 104,
    "Banjo": 105,
    "Shamisen": 106,
    "Koto": 107,
    "Kalimba": 108,
    "Bagpipe": 109,
    "Fiddle": 110,
    "Shanai": 111
  },
  "Percussive": {
    "Tinkle Bell": 112,
    "Agogo": 113,
    "Steel Drums": 114,
    "Woodblock": 115,
    "Taiko Drum": 116,
    "Melodic Tom": 117,
    "Synth Drum": 118
  },
  "Sound effects": {
    "Reverse Cymbal": 119,
    "Guitar Fret Noise": 120,
    "Breath Noise": 121,
    "Seashore": 122,
    "Bird Tweet": 123,
    "Telephone Ring": 124,
    "Helicopter": 125,
    "Applause": 126,
    "Gunshot": 127
  },
  "Percussion": {
    "Bass Drum 2": 35,
    "Bass Drum 1": 36,
    "Side Stick/Rimshot": 37,
    "Snare Drum 1": 38,
    "Hand Clap": 39,
    "Snare Drum 2": 40,
    "Low Tom 2": 41,
    "Closed Hi-hat": 42,
    "Low Tom 1": 43,
    "Pedal Hi-hat": 44,
    "Mid Tom 2": 45,
    "Open Hi-hat": 46,
    "Mid Tom 1": 47,
    "High Tom 2": 48,
    "Crash Cymbal 1": 49,
    "High Tom 1": 50,
    "Ride Cymbal 1": 51,
    "Chinese Cymbal": 52,
    "Ride Bell": 53,
    "Tambourine": 54,
    "Splash Cymbal": 55,
    "Cowbell": 56,
    "Crash Cymbal 2": 57,
    "Vibra Slap": 58,
    "Ride Cymbal 2": 59,
    "High Bongo": 60,
    "Low Bongo": 61,
    "Mute High Conga": 62,
    "Open High Conga": 63,
    "Low Conga": 64,
    "High Timbale": 65,
    "Low Timbale": 66,
    "High Agogô": 67,
    "Low Agogô": 68,
    "Cabasa": 69,
    "Maracas": 70,
    "Short Whistle": 71,
    "Long Whistle": 72,
    "Short Güiro": 73,
    "Long Güiro": 74,
    "Claves": 75,
    "High Wood Block": 76,
    "Low Wood Block": 77,
    "Mute Cuíca": 78,
    "Open Cuíca": 79,
    "Mute Triangle": 80,
    "Open Triangle": 81
  }
}

},{}],15:[function(require,module,exports){
/*
class to parse the .mid file format
(depends on stream.js)
*/
module.exports = function (data) {
	var Stream = require('./stream');
	var ticksPerBeat;
	function readChunk(stream) {
		var id = stream.read(4);
		var length = stream.readInt32();
		return {
			'id': id,
			'length': length,
			'data': stream.read(length)
		};
	}
	
	var lastEventTypeByte;
	
	function readEvent(stream) {
		var event = {};
		event.deltaTime = stream.readVarInt();
		var eventTypeByte = stream.readInt8();
		if ((eventTypeByte & 0xf0) == 0xf0) {
			/* system / meta event */
			if (eventTypeByte == 0xff) {
				/* meta event */
				event.type = 'meta';
				var subtypeByte = stream.readInt8();
				var length = stream.readVarInt();
				switch(subtypeByte) {
					case 0x00:
						event.subtype = 'sequenceNumber';
						if (length != 2) throw "Expected length for sequenceNumber event is 2, got " + length;
						event.number = stream.readInt16();
						return event;
					case 0x01:
						event.subtype = 'text';
						event.text = stream.read(length);
						return event;
					case 0x02:
						event.subtype = 'copyrightNotice';
						event.text = stream.read(length);
						return event;
					case 0x03:
						event.subtype = 'trackName';
						event.text = stream.read(length);
						return event;
					case 0x04:
						event.subtype = 'instrumentName';
						event.text = stream.read(length);
						return event;
					case 0x05:
						event.subtype = 'lyrics';
						event.text = stream.read(length);
						return event;
					case 0x06:
						event.subtype = 'marker';
						event.text = stream.read(length);
						return event;
					case 0x07:
						event.subtype = 'cuePoint';
						event.text = stream.read(length);
						return event;
					case 0x20:
						event.subtype = 'midiChannelPrefix';
						if (length != 1) throw "Expected length for midiChannelPrefix event is 1, got " + length;
						event.channel = stream.readInt8();
						return event;
					case 0x2f:
						event.subtype = 'endOfTrack';
						if (length != 0) throw "Expected length for endOfTrack event is 0, got " + length;
						return event;
					case 0x51:
						event.subtype = 'setTempo';
						if (length != 3) throw "Expected length for setTempo event is 3, got " + length;
						event.microsecondsPerBeat = (
							(stream.readInt8() << 16)
							+ (stream.readInt8() << 8)
							+ stream.readInt8()
						)
						return event;
					case 0x54:
						event.subtype = 'smpteOffset';
						if (length != 5) throw "Expected length for smpteOffset event is 5, got " + length;
						var hourByte = stream.readInt8();
						event.frameRate = {
							0x00: 24, 0x20: 25, 0x40: 29, 0x60: 30
						}[hourByte & 0x60];
						event.hour = hourByte & 0x1f;
						event.min = stream.readInt8();
						event.sec = stream.readInt8();
						event.frame = stream.readInt8();
						event.subframe = stream.readInt8();
						return event;
					case 0x58:
						event.subtype = 'timeSignature';
						if (length != 4) throw "Expected length for timeSignature event is 4, got " + length;
						event.numerator = stream.readInt8();
						event.denominator = Math.pow(2, stream.readInt8());
						event.metronome = stream.readInt8();
						event.thirtyseconds = stream.readInt8();
						return event;
					case 0x59:
						event.subtype = 'keySignature';
						if (length != 2) throw "Expected length for keySignature event is 2, got " + length;
						event.key = stream.readInt8(true);
						event.scale = stream.readInt8();
						return event;
					case 0x7f:
						event.subtype = 'sequencerSpecific';
						event.data = stream.read(length);
						return event;
					default:
						// console.log("Unrecognised meta event subtype: " + subtypeByte);
						event.subtype = 'unknown'
						event.data = stream.read(length);
						return event;
				}
				event.data = stream.read(length);
				return event;
			} else if (eventTypeByte == 0xf0) {
				event.type = 'sysEx';
				var length = stream.readVarInt();
				event.data = stream.read(length);
				return event;
			} else if (eventTypeByte == 0xf7) {
				event.type = 'dividedSysEx';
				var length = stream.readVarInt();
				event.data = stream.read(length);
				return event;
			} else {
				throw "Unrecognised MIDI event type byte: " + eventTypeByte;
			}
		} else {
			/* channel event */
			var param1;
			if ((eventTypeByte & 0x80) == 0) {
				/* running status - reuse lastEventTypeByte as the event type.
					eventTypeByte is actually the first parameter
				*/
				param1 = eventTypeByte;
				eventTypeByte = lastEventTypeByte;
			} else {
				param1 = stream.readInt8();
				lastEventTypeByte = eventTypeByte;
			}
			var eventType = eventTypeByte >> 4;
			event.channel = eventTypeByte & 0x0f;
			event.type = 'channel';
			switch (eventType) {
				case 0x08:
					event.subtype = 'noteOff';
					event.noteNumber = param1;
					event.velocity = stream.readInt8();
					return event;
				case 0x09:
					event.noteNumber = param1;
					event.velocity = stream.readInt8();
					if (event.velocity == 0) {
						event.subtype = 'noteOff';
					} else {
						event.subtype = 'noteOn';
					}
					return event;
				case 0x0a:
					event.subtype = 'noteAftertouch';
					event.noteNumber = param1;
					event.amount = stream.readInt8();
					return event;
				case 0x0b:
					event.subtype = 'controller';
					event.controllerType = param1;
					event.value = stream.readInt8();
					return event;
				case 0x0c:
					event.subtype = 'programChange';
					event.programNumber = param1;
					return event;
				case 0x0d:
					event.subtype = 'channelAftertouch';
					event.amount = param1;
					return event;
				case 0x0e:
					event.subtype = 'pitchBend';
					event.value = param1 + (stream.readInt8() << 7);
					return event;
				default:
					throw "Unrecognised MIDI event type: " + eventType
					/* 
					console.log("Unrecognised MIDI event type: " + eventType);
					stream.readInt8();
					event.subtype = 'unknown';
					return event;
					*/
			}
		}
	}
	
	var stream = Stream(data);
	var headerChunk = readChunk(stream);
	if (headerChunk.id != 'MThd' || headerChunk.length != 6) {
		throw "Bad .mid file - header not found";
	}
	var headerStream = Stream(headerChunk.data);
	var formatType = headerStream.readInt16();
	var trackCount = headerStream.readInt16();
	var timeDivision = headerStream.readInt16();
	
	if (timeDivision & 0x8000) {
		throw "Expressing time division in SMTPE frames is not supported yet"
	} else {
		ticksPerBeat = timeDivision;
	}
	
	var header = {
		'formatType': formatType,
		'trackCount': trackCount,
		'ticksPerBeat': ticksPerBeat
	};

	var tracks = [];
	for (var i = 0; i < header.trackCount; i++) {
		tracks[i] = [];
		var trackChunk = readChunk(stream);
		if (trackChunk.id != 'MTrk') {
			throw "Unexpected chunk - expected MTrk, got "+ trackChunk.id;
		}
		var trackStream = Stream(trackChunk.data);
		while (!trackStream.eof()) {
			var event = readEvent(trackStream);
			tracks[i].push(event);
		}
	}
	
	return {
		'header': header,
		'tracks': tracks
	}
};
},{"./stream":17}],16:[function(require,module,exports){
var clone = function (o) {
	if (typeof o != 'object') return (o);
	if (o == null) return (o);
	var ret = (typeof o.length == 'number') ? [] : {};
	for (var key in o) ret[key] = clone(o[key]);
	return ret;
};

module.exports = function (midiFile, timeWarp, eventProcessor, bpm) {
	var trackStates = [];
	var beatsPerMinute = bpm ? bpm : 120;
	var bpmOverride = bpm ? true : false;

	var ticksPerBeat = midiFile.header.ticksPerBeat;
	
	for (var i = 0; i < midiFile.tracks.length; i++) {
		trackStates[i] = {
			'nextEventIndex': 0,
			'ticksToNextEvent': (
				midiFile.tracks[i].length ?
					midiFile.tracks[i][0].deltaTime :
					null
			)
		};
	}

	var nextEventInfo;
	var samplesToNextEvent = 0;
	
	function getNextEvent() {
		var ticksToNextEvent = null;
		var nextEventTrack = null;
		var nextEventIndex = null;
		
		for (var i = 0; i < trackStates.length; i++) {
			if (
				trackStates[i].ticksToNextEvent != null
				&& (ticksToNextEvent == null || trackStates[i].ticksToNextEvent < ticksToNextEvent)
			) {
				ticksToNextEvent = trackStates[i].ticksToNextEvent;
				nextEventTrack = i;
				nextEventIndex = trackStates[i].nextEventIndex;
			}
		}
		if (nextEventTrack != null) {
			/* consume event from that track */
			var nextEvent = midiFile.tracks[nextEventTrack][nextEventIndex];
			if (midiFile.tracks[nextEventTrack][nextEventIndex + 1]) {
				trackStates[nextEventTrack].ticksToNextEvent += midiFile.tracks[nextEventTrack][nextEventIndex + 1].deltaTime;
			} else {
				trackStates[nextEventTrack].ticksToNextEvent = null;
			}
			trackStates[nextEventTrack].nextEventIndex += 1;
			/* advance timings on all tracks by ticksToNextEvent */
			for (var i = 0; i < trackStates.length; i++) {
				if (trackStates[i].ticksToNextEvent != null) {
					trackStates[i].ticksToNextEvent -= ticksToNextEvent
				}
			}
			return {
				"ticksToEvent": ticksToNextEvent,
				"event": nextEvent,
				"track": nextEventTrack
			}
		} else {
			return null;
		}
	}
	//
	var midiEvent;
	var temporal = [];
	//
	function processEvents() {
		function processNext() {
		    if (!bpmOverride && midiEvent.event.type == "meta" && midiEvent.event.subtype == "setTempo" ) {
				// tempo change events can occur anywhere in the middle and affect events that follow
				beatsPerMinute = 60000000 / midiEvent.event.microsecondsPerBeat;
			}
			///
			var beatsToGenerate = 0;
			var secondsToGenerate = 0;
			if (midiEvent.ticksToEvent > 0) {
				beatsToGenerate = midiEvent.ticksToEvent / ticksPerBeat;
				secondsToGenerate = beatsToGenerate / (beatsPerMinute / 60);
			}
			///
			var time = (secondsToGenerate * 1000 * timeWarp) || 0;
			temporal.push([ midiEvent, time]);
			midiEvent = getNextEvent();
		};
		///
		if (midiEvent = getNextEvent()) {
			while(midiEvent) processNext(true);
		}
	}
	processEvents();

	return {
		"getData": function() {
			return clone(temporal);
		}
	};
};

},{}],17:[function(require,module,exports){
/* Wrapper for accessing strings through sequential reads */
module.exports = function (str) {
    var position = 0;

    function read(length) {
        var result = str.substr(position, length);
        position += length;
        return result;
    }

    /* read a big-endian 32-bit integer */
    function readInt32() {
        var result = (
        (str.charCodeAt(position) << 24)
        + (str.charCodeAt(position + 1) << 16)
        + (str.charCodeAt(position + 2) << 8)
        + str.charCodeAt(position + 3));
        position += 4;
        return result;
    }

    /* read a big-endian 16-bit integer */
    function readInt16() {
        var result = (
        (str.charCodeAt(position) << 8)
        + str.charCodeAt(position + 1));
        position += 2;
        return result;
    }

    /* read an 8-bit integer */
    function readInt8(signed) {
        var result = str.charCodeAt(position);
        if (signed && result > 127) result -= 256;
        position += 1;
        return result;
    }

    function eof() {
        return position >= str.length;
    }

    /* read a MIDI-style variable-length integer
     (big-endian value in groups of 7 bits,
     with top bit set to signify that another byte follows)
     */
    function readVarInt() {
        var result = 0;
        while (true) {
            var b = readInt8();
            if (b & 0x80) {
                result += (b & 0x7f);
                result <<= 7;
            } else {
                /* b is the last byte */
                return result + b;
            }
        }
    }

    return {
        'eof': eof,
        'read': read,
        'readInt32': readInt32,
        'readInt16': readInt16,
        'readInt8': readInt8,
        'readVarInt': readVarInt
    }
};
},{}],18:[function(require,module,exports){
var midi = function () {
    var api = {};
    var loader = require('./midi/loader')();
    var player = require('./midi/player')();
    return loader;
};

module.exports = midi;
window.globalmidi = midi;
},{"./midi/loader":20,"./midi/player":21}],19:[function(require,module,exports){
/*
 ----------------------------------------------------------
 GeneralMIDI
 ----------------------------------------------------------
 */
var root = {};
var _ = {
    find: require('lodash.find')
};
root.GM = (function () {
    var instruments = require('../instruments.json');

    var clean = function (name) {
        return name.replace(/[^a-z0-9 ]/gi, '').replace(/[ ]/g, '_').toLowerCase();
    };

    var res = {
        byId: function(id){
            var ins;
            _.find(instruments, function(categorie, key){
                var result = _.find(categorie, function(instrument, key){
                    if(instrument == id){
                        ins = {};
                        ins.instrument = key;
                        ins.number = instrument;
                        ins.id = clean(key);
                        return true;
                    }
                });
                if(result){
                    ins.category = key;
                    return true;
                }
            });

            return ins;
        },
        byName: function(name){
            var ins;
            _.find(instruments, function(categorie, key){
                var result = _.find(categorie, function(instrument, key){
                    if(name == key){
                        ins = {};
                        ins.instrument = key;
                        ins.number = instrument;
                        ins.id = clean(key);
                        return true;
                    }
                });
                if(result){
                    ins.category = key;
                    return true;
                }
            });

            return ins;
        },
        byCleanName: function(name){
            var ins;
            _.find(instruments, function(categorie, key){
                var result = _.find(categorie, function(instrument, key){
                    if(name == clean(key)){
                        ins = {};
                        ins.instrument = key;
                        ins.number = instrument;
                        ins.id = clean(key);
                        return true;
                    }
                });
                if(result){
                    ins.category = key;
                    return true;
                }
            });

            return ins;
        },
        byCategory: function(cat){
            return _.find(instruments, function(categorie, key){
                return cat == key;
            })
        }
    };

    return res;
})();

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
},{"../instruments.json":14,"lodash.find":8}],20:[function(require,module,exports){
/*
 ----------------------------------------------------------
 MIDI.Player : 0.3.1 : 2015-03-26
 ----------------------------------------------------------
 https://github.com/mudcube/MIDI.js
 ----------------------------------------------------------
 */
module.exports = function (MIDI) {
    var generalMIDI = require('./gm');
    var Replayer = require('../jasmid/replayer');
    var MidiFile = require('../jasmid/midifile');
    'use strict';
    var midi = {};
    midi.tracks = {};
    midi.currentTime = 0;
    midi.endTime = 0;
    midi.restart = 0;
    midi.playing = false;
    midi.timeWarp = 1;
    midi.startDelay = 0;
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
        midi.replayer = new Replayer(MidiFile(midi.currentData), midi.timeWarp, null);
        midi.data = midi.replayer.getData();
        midi.endTime = getLength();
        midi.tracks = midi.getFileTracks();
        midi.instruments = midi.getFileInstruments();
        MIDI.loadResource({instruments : midi.instruments, "onsuccess":onsuccess, onprogress: onprogress, onerror: onerror});
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

    midi.getFileTracks = function(){
        var tracks = {};
        for (var n = 0; n < midi.data.length; n++) {
            var event = midi.data[n][0].event;
            if (event.type !== 'channel') {
                continue;
            }
            var channel = event.channel;
            switch (event.subtype) {
                case 'programChange':
                    tracks[midi.data[n][0].track] = channel;
                    break;
            }
        }
        return tracks;
    }
    midi.getFileInstruments = function () {
        var instruments = {};
        var programs = {};
        var channels ={};

        for (var n = 0; n < midi.data.length; n++) {
            var event = midi.data[n][0].event;
            if (event.type !== 'channel') {
                continue;
            }
            var channel = event.channel;
            switch (event.subtype) {
                case 'controller':(event)
//				console.log(event.channel, MIDI.defineControl[event.controllerType], event.value);
                    break;
                case 'programChange':
                    programs[channel] = event.programNumber;
                    var gm = generalMIDI.GM.byId(event.programNumber);
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
            return MIDI.getContext();
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
        queuedTime = 0;
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
            if ((queuedTime += obj[1]) < currentTime) {
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
                    // the percussion should not be set from the midi, it is set in the loader.
                    if(channelId != 9){
                        MIDI.programChange(channelId, event.programNumber, delay);
                    }
                    break;
                case 'pitchBend':
                    MIDI.pitchBend(channelId, event.value, delay);
                    break;
                case 'noteOn':
                    if (channel.mute) break;
                    note = event.noteNumber - (midi.MIDIOffset || 0);
                    var temp = {
                        event: event,
                        time: queueTime,
                        source: MIDI.noteOn(channelId, event.noteNumber, event.velocity, delay),
                        interval: scheduleTracking(channelId, note, queuedTime + midi.startDelay, offset - foffset, 144, event.velocity)
                    };
                    eventQueue.push(temp);
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

    midi.setChannelVolume = function(val, channel){
        MIDI.channels[channel].volume = val;
        if(MIDI.api === "webaudio"){
            for(var i = 0; i < eventQueue.length; i++){
                var event = eventQueue[i];
                if (event && event.source && typeof event.source.setChannelVolume === 'function' && event.source.channel === channel){
                    event.source.setChannelVolume(val);
                }
            }
        }
    };
    midi.setTrackVolume = function(val, track){
        midi.setChannelVolume(val, midi.tracks[track]);
    };

    return midi;
};

},{"../jasmid/midifile":15,"../jasmid/replayer":16,"./gm":19}],21:[function(require,module,exports){
/*
 ----------------------------------------------------------
 MIDI.Player : 0.3.1 : 2015-03-26
 ----------------------------------------------------------
 https://github.com/mudcube/MIDI.js
 ----------------------------------------------------------
 */
module.exports = function (MIDI) {
    var generalMIDI = require('./gm');
    var Replayer = require('../jasmid/replayer');
    var MidiFile = require('../jasmid/midifile');
    'use strict';
    var midi = {};
    midi.tracks = {};
    midi.currentTime = 0;
    midi.endTime = 0;
    midi.restart = 0;
    midi.playing = false;
    midi.timeWarp = 1;
    midi.startDelay = 0;
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
        midi.replayer = new Replayer(MidiFile(midi.currentData), midi.timeWarp, null);
        midi.data = midi.replayer.getData();
        midi.endTime = getLength();
        midi.tracks = midi.getFileTracks();
        midi.instruments = midi.getFileInstruments();
        MIDI.loadResource(
            {
                instruments: midi.instruments,
                onsuccess: function () {
                    console.log('reconnect')
                    MIDI.reconnect(onsuccess);
                },
                onprogress: onprogress,
                onerror: onerror
            });
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

    midi.getFileTracks = function () {
        var tracks = {};
        for (var n = 0; n < midi.data.length; n++) {
            var event = midi.data[n][0].event;
            if (event.type !== 'channel') {
                continue;
            }
            var channel = event.channel;
            switch (event.subtype) {
                case 'programChange':
                    tracks[midi.data[n][0].track] = channel;
                    break;
            }
        }
        return tracks;
    }
    midi.getFileInstruments = function () {
        var instruments = {};
        var programs = {};
        var channels = {};

        for (var n = 0; n < midi.data.length; n++) {
            var event = midi.data[n][0].event;
            if (event.type !== 'channel') {
                continue;
            }
            var channel = event.channel;
            switch (event.subtype) {
                case 'controller':
                    (event)
//				console.log(event.channel, MIDI.defineControl[event.controllerType], event.value);
                    break;
                case 'programChange':
                    programs[channel] = event.programNumber;
                    var gm = generalMIDI.GM.byId(event.programNumber);
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
            return MIDI.getContext();
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
        queuedTime = 0;
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
            if ((queuedTime += obj[1]) < currentTime) {
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
                    // the percussion should not be set from the midi, it is set in the loader.
                    if (channelId != 9) {
                        MIDI.programChange(channelId, event.programNumber, delay);
                    }
                    break;
                case 'pitchBend':
                    MIDI.pitchBend(channelId, event.value, delay);
                    break;
                case 'noteOn':
                    if (channel.mute) break;
                    note = event.noteNumber - (midi.MIDIOffset || 0);
                    var temp = {
                        event: event,
                        time: queueTime,
                        source: MIDI.noteOn(channelId, event.noteNumber, event.velocity, delay),
                        interval: scheduleTracking(channelId, note, queuedTime + midi.startDelay, offset - foffset, 144, event.velocity)
                    };
                    eventQueue.push(temp);
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

    midi.setChannelVolume = function (val, channel) {
        MIDI.channels[channel].volume = val;
        if (MIDI.api === "webaudio") {
            for (var i = 0; i < eventQueue.length; i++) {
                var event = eventQueue[i];
                if (event && event.source && typeof event.source.setChannelVolume === 'function' && event.source.channel === channel) {
                    event.source.setChannelVolume(val);
                }
            }
        }
    };
    midi.setTrackVolume = function (val, track) {
        midi.setChannelVolume(val, midi.tracks[track]);
    };

    return midi;
};

},{"../jasmid/midifile":15,"../jasmid/replayer":16,"./gm":19}]},{},[18]);

//# sourceMappingURL=bundle.js.map
