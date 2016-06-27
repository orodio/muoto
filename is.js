function primative (type, fn) {
  fn = fn || function (d) { return true }

  return function (d) {
    return d != null && typeof d === type && fn(d)
  }
}

exports.ARRAY    = primative("object", Array.isArray)
exports.BOOLEAN  = primative("boolean")
exports.FUNCTION = primative("function")
exports.FN       = primative("function")
exports.NUMBER   = primative("number")
exports.OBJECT   = primative("object", function (d) { return !Array.isArray(d) })
exports.STRING   = primative("string")
