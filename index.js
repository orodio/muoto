var Just    = require("./maybe").Just
var isJust  = require("./maybe").isJust
var Nope    = require("./maybe").Nope
var isNope  = require("./maybe").isNope
var isMaybe = require("./maybe").isMaybe
var is      = require("./is")

function next_cursor (cursor) {
  return function (key) {
    if (cursor == null) return key

    return is.NUMBER(key)
      ? cursor + "[" + key + "]"
      : cursor + "." + key
  }
}

function message (cursor, expected, received, value) {
  return [
    "======\n",
    "Shape Invariant:",
    "----------------",
    "Cursor:   " + cursor,
    "Expected: " + expected,
    "Received: " + received,
    "Value:    " + value,
    "\n======\n"
  ].join("\n")
}

function shapePrimative (result, shp, opts, value, cursor) {
  return result(function () {
    return shp === value
      ? opts.Just(cursor, value)
      : opts.Nope(cursor, value, opts.msg(cursor, shp, value, value))
  })
}

function shapeFn (result, shp, opts, value, cursor) {
  return result(function () {
    return shp(value, cursor, opts)
  })
}

function shapeArray (result, shp, opts, value, cursor) {
  return result(function () {
    if (!is.ARRAY(value)) return opts.Nope(cursor, value, opts.msg(cursor, "array", typeof value, value))

    var next = next_cursor(cursor)

    return value.reduce(function (result, val, i) {
      if (opts.isNope(result)) return result
      var key = shp.length === 1 ? 0 : i
      var end = shape(shp[key], opts)(val, next(i))
      return opts.isNope(end) ? end : result
    }, opts.Just(cursor, value))
  })
}

function shapeObject (result, shp, opts, value, cursor) {

  return result(function () {
    if (!is.OBJECT(value)) return opts.Nope(cursor, value, opts.msg(cursor, "object", typeof value, value))

    var shp_keys = Object.keys(shp)
    var val_keys = Object.keys(value)
    var next     = next_cursor(cursor)

    return shp_keys.reduce(function (result, key) {
      if (opts.isNope(result))          return result
      if (val_keys.indexOf(key) === -1) return opts.Nope(next(key), value, next(key) + " was in the shape but not present in the value")
      var end = shape(shp[key], opts)(value[key], next(key))
      return opts.isNope(end) ? end : result
    }, opts.Just(cursor, value))
  })
}

function shape (shp, opts) {
  opts = opts || {}
  opts = Object.assign({}, {
    Just:     Just,
    isJust:   isJust,
    Nope:     Nope,
    isNope:   isNope,
    isMaybe:  isMaybe,
    is:       is,
    msg:      message,
    blocking: false,
    logging:  false,
  }, opts)

  function result (fn) {
    try {
      var end = fn()
      if (opts.isNope(end)) throw end
      return end
    } catch (err) {
      if (opts.logging) console.error(err.msg, err.value)
      if (opts.blocking) throw err
      return err
    }
  }

  if (is.OBJECT(shp)) return shapeObject.bind(   null, result, shp, opts)
  if (is.ARRAY(shp))  return shapeArray.bind(    null, result, shp, opts)
  if (is.FN(shp))     return shapeFn.bind(       null, result, shp, opts)
                      return shapePrimative.bind(null, result, shp, opts)
}

shape.string = function (value, cursor, opts) {
  return opts.is.STRING(value)
    ? opts.Just(cursor, value)
    : opts.Nope(cursor, value, opts.msg(cursor, "string", typeof value, value))
}

shape.number = function (value, cursor, opts) {
  return opts.is.NUMBER(value)
    ? opts.Just(cursor, value)
    : opts.Nope(cursor, value, opts.msg(cursor, "number", typeof value, value))
}

shape.bool = function (value, cursor, opts) {
  return opts.is.BOOLEAN(value)
    ? opts.Just(cursor, value)
    : opts.Nope(cursor, value, opts.msg(cursor, "boolean", typeof value, value))
}

module.exports = shape
