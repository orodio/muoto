# muoto

## install

```
$ npm intall --save muoto
```

## usage

```javascript
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

```javascript
function greater_than (n) {
  return function (value, cursor, tools) {
    if (tools.is.NUMBER(value)) return tools.Nope(cursor, value, cursor + " needs to be a number")
    if (value <= n) return tools.Nope(cursor, value, cursor + " needs to be greater than " + n + ", but was " + value)
    return tools.Just(cursor, value)
  }
}

var check = shape({ foo:greater_than(4) })

check({ foo:9 }).valid // true
check({ foo:3 }).valid // false
check({ foo:19 }).valid // true
```

### some other stuff

```javascript
// arrays
shape([1])([1, 1, 1, 1]).valid // true
shape([1])([1, 2, 1, 1]).valid // false
shape([1, 2, 1, 1])([1, 2, 1, 1]).valid // true
shape([1, 2, 1, 1])([1, 1, 1, 1]).valid // false
shape([{ foo:shape.number }])([ { foo:1 }, { foo:2 }, { foo:3} ]).valid // true

shape(shape.number, { blocking: true })("b") // throws an error
shape(shape.number, { logging: true })("b") // logs an error message

var shp = shape({ foo:[{ bar:1 }] })({ foo:[{ bar:1 }, { bar:1 }, { bar:2 }, { bar:1 }] })
shp.valid  // false
shp.cursor // foo[2].bar
```
