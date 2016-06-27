import test from "./help/test_set"

import shape from "./index"
import {
  isMaybe,
  isJust,
  isNope,
} from "./maybe"

var valid   = test("shape - valid",   d => t => t.true(isMaybe(d) && isJust(d) && !isNope(d)))
var invalid = test("shape - invalid", d => t => t.true(isMaybe(d) && isNope(d) && !isJust(d)))

var custom = (value, cursor, opts) => {
  if (value !== "bob") return opts.Nope(cursor, value, opts.msg(cursor, "bob", value, value))
  return opts.Just(cursor, value)
}

valid([
  shape(1)(1),
  shape("a")("a"),
  shape(custom)("bob"),

  shape([1, 2, 3])([1, 2, 3]),
  shape(["a", "b", "c"])(["a", "b", "c"]),
  shape([ custom, custom ])([ "bob", "bob" ]),
  shape([1])([1, 1, 1, 1, 1]),

  shape({ foo:1 })({ foo:1 }),
  shape({ foo:custom })({ foo:"bob" }),
  shape({ foo:{ foo:1 }})({ foo:{ foo:1 }}),
  shape({ foo:[custom], bar:[{ baz:1 }] })({ foo:["bob", "bob"], bar:[{ baz:1 }, { baz:1 }]}),

  shape(shape.string)("b"),
  shape({ foo:shape.string })({ foo:"a" }),
  shape([ shape.string ])(["a", "b", "c"]),
  shape(shape.number)(1),
  shape({ foo:shape.number })({ foo:1 }),
  shape([ shape.number ])([1, 2, 3, 4, 5]),
])

invalid([
  shape(1)("a"),
  shape(1)("1"),
  shape(custom)("pat"),
  shape(custom)(1),
  shape(custom)("a"),
  shape([1, 2, 3])(1),
  shape([1, 2, 3])("a"),
  shape([1, 2, 3])([1, "2", 3]),
  shape([1])(["a", 1, 1, 1, 1]),
  shape([custom])(["bob", "bob", 1, "bob"]),
  shape({ foo:1 })({ foo:"a" }),
  shape({ foo:{ bar:1 }})({ foo:{ bar:"baz" }}),

  shape(shape.string)(1),
  shape(shape.string)({ foo:"bar" }),
  shape(shape.string)({}),
  shape(shape.string)([]),
])
