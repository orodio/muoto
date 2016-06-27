import test from "./help/test_set"

import {
  Maybe, isMaybe,
  Just, isJust,
  Nope, isNope,
} from "./maybe"



var is_maybe_valid   = test("isMaybe - valid",   d => t => t.true(isMaybe(d)))
var is_maybe_invalid = test("isMaybe - invalid", d => t => t.false(isMaybe(d)))

var is_just_valid    = test("isJust - valid",   d => t => t.true(isJust(d)))
var is_just_invalid  = test("isJust - invalid", d => t => t.false(isJust(d)))

var is_nope_valid    = test("isNope - valid",   d => t => t.true(isNope(d)))
var is_nope_invalid  = test("isNope - invalid", d => t => t.false(isNope(d)))



is_maybe_valid([
  new Maybe("new maybe", "value", "msg", true),
  new Maybe("new maybe", "value", "msg", false),
  Maybe("maybe", "value", "msg", true),
  Maybe("maybe", "value", "msg", false),

  new Just("new just", "value", "msg"),
  Just("just", "value", "msg"),

  new Nope("new nope", "value", "msg"),
  Nope("nope", "value", "msg"),
])

is_maybe_invalid([
  true,
  false,
  function Bob () {},
  function () {},
  () => {},
  "",
  "bob",
  1,
  "1",
  0,
  "0",
  -1,
  "-1",
  null,
  undefined,
  NaN,
  {},
  { foo:1, bar:"bar" },
  [],
  [1, 2, 3],
  ["1","2","3"],
  [1, "bob", { foo:1, bar:"bar" }],
])


is_just_valid([
  new Just("new just", "value", "msg"),
  Just("just", "value", "msg"),
])

is_just_invalid([
  new Maybe("new maybe", "value", "msg", true),
  new Maybe("new maybe", "value", "msg", false),
  Maybe("maybe", "value", "msg", true),
  Maybe("maybe", "value", "msg", false),

  new Nope("new nope", "value", "msg"),
  Nope("nope", "value", "msg"),

  true,
  false,
  function Bob () {},
  function () {},
  () => {},
  "",
  "bob",
  1,
  "1",
  0,
  "0",
  -1,
  "-1",
  null,
  undefined,
  NaN,
  {},
  { foo:1, bar:"bar" },
  [],
  [1, 2, 3],
  ["1","2","3"],
  [1, "bob", { foo:1, bar:"bar" }],
])



is_nope_valid([
  new Nope("new nope", "value", "msg"),
  Nope("nope", "value", "msg"),
])

is_nope_invalid([
  new Maybe("new maybe", "value", "msg", true),
  new Maybe("new maybe", "value", "msg", false),
  Maybe("maybe", "value", "msg", true),
  Maybe("maybe", "value", "msg", false),

  new Just("new just", "value", "msg"),
  Just("just", "value", "msg"),

  true,
  false,
  function Bob () {},
  function () {},
  () => {},
  "",
  "bob",
  1,
  "1",
  0,
  "0",
  -1,
  "-1",
  null,
  undefined,
  NaN,
  {},
  { foo:1, bar:"bar" },
  [],
  [1, 2, 3],
  ["1","2","3"],
  [1, "bob", { foo:1, bar:"bar" }],
])
