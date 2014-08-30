# partial-apply

Implements a context-free version of `Function.prototype.apply` in Node.js/JavaScript.


If `someFn` has unknown arguments, and we want to pass those arguments through
to a wrapped function, say `someOtherFn`, we can use `someOtherFn.apply()` to
call the wrapped function with `someFn`'s arguments.

But in the process, we corrupt the "this" context of the wrapped function.
In order to have it stay correctly defined, we have to pass in the context manually.
This creates some nasty dependencies and hurts reusability in your code base.

`_.partial()` in lodash gets us a bit closer, but it does not support an **array**
of arguments- just arguments passed in one after the other, like `_.partial(fn,x0,x1,etc)`.

For example, if we expected `someOtherFn` in the example below to have its "this"
value refer to, say, a Waterline model, it's actually quite annoying in vanilla
JavaScript to pass down a dynamic array of arguments to a function AND maintain its
original "this" context.

Anyway, this is why `partial-apply` was created.


## Installation

```sh
$ npm install partial-apply
```

## Usage

```javascript
var partialApply = require('partial-apply');

function someFn( /* ... */ ) {
  return partialApply(someOtherFn, arguments);
}

```

## Why?

This module is a temporary solution, until lodash has something
similar in core that can be called as a single method.
In the mean time, this is a hack to make our code more readable.

To get the latest status, see the [lodash docs](http://lodash.com/docs).

I'll update this repo with install/version info if something comparable is
added to lodash core at some point.



## License

MIT &copy; Mike McNeil 2014
