var test = require("ava")

function tests (msg, fn) {
  return function (vals) {
    return vals.forEach((value, i) => test(`${ msg } ${ i }`, fn(value)))
  }
}

module.exports = tests;
