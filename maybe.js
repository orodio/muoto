function Maybe (cursor, value, msg, valid) {
  if (!isMaybe(this)) return new Maybe(cursor, value, msg, valid)
  this.cursor = cursor
  this.value  = value
  this.msg    = msg
  this.valid  = valid
}

function isMaybe(d) {
  return d instanceof Maybe
}



function Just (cursor, value) {
  if (!isJust(this)) return new Just(cursor, value)
  Maybe.call(this, cursor, value, "ok", true)
}
Just.prototype = Object.create(Maybe.prototype, {})
Just.prototype.constructor = Just

function isJust(d) {
  return d instanceof Just
}



function Nope (cursor, value, msg) {
  if (!isNope(this)) return new Nope(cursor, value, msg)
  Maybe.call(this, cursor, value, msg, false)
}
Nope.prototype = Object.create(Maybe.prototype, {})
Nope.prototype.constructor = Nope

function isNope(d) {
  return d instanceof Nope
}



exports.Maybe   = Maybe
exports.isMaybe = isMaybe
exports.Just    = Just
exports.isJust  = isJust
exports.Nope    = Nope
exports.isNope  = isNope
