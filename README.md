# muoto

## install

```
$ npm intall --save muoto
```

## usage

```
import { shape } from "muoto"

var bypass = false

function bob (thing) {
  if (!shape({
    foo:  1,
    bar:  shape.number,
    baz:  shape.string,
    fuzz: shape.bool,
  })(thing).valid) throw new Error("Passed in the wrong thing")

  // do stuff
}

bob({ foo:1, bar:1, baz:"a", fuzz:true }) // does stuff
bob() // throws
bob({}) // throws
bob({ foo:2, bar:1, baz:"a", fuzz:true }) // throws

```

### using your own shape things

```
function greater_than (n) {
  return function (value, cursor, tools) {
    if (tools.is.NUMBER(value)) return tools.Nope(cursor, value, cursor + " needs to be a number")
    if (value <= n) return tools.Nope(cursor, value, cursor + " needs to be greater than " + n + ", but was " + value)
    return tools.Just(cursor, value)
  }
}
```
