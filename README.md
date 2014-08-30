# Quotify

Have a text file filled with straight quotes that should be curly?  Run your text through Quotify to automatically prettify those quotes with their correct HTML entity equivalents!

## Usage (requires [node-machine](https://github.com/mikermcneil/node-machine))

```
var Machine = require('node-machine');
var quotify = require('quotify');
Machine.build(quotify).configure({
	html: '"What\'s the deal?", said the Big Bopper.  "We\'re flying kinda low."'
}).exec({
	success: console.log
});
```

outputs:

```
&ldquo;What&rsquo;s the deal?&rdquo;, said the Big Bopper.  &ldquo;We&rsquo;re flying kinda low.&rdquo;
```
