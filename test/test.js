var Machine = require('node-machine');
var assert = require('assert');


describe("Quotify", function() {

	describe('with the default options', function() {

		it('should transform straight quotes into curly quotes, skipping HTML tag attributes and code blocks', function() {

			var quotify = Machine.build(require('../index.js')).configure({
				html: '<a href="test.html">"What\'s the deal?", said the Big Bopper. ```"\'sup, code!"``` "We\'re flying kinda low."</a>'
			}).exec({
				success: function(html) {
					assert(html == "<a href=\"test.html\">&ldquo;What&rsquo;s the deal?&rdquo;, said the Big Bopper. ```\"'sup, code!\"``` &ldquo;We&rsquo;re flying kinda low.&rdquo;</a>", html);
				},
				error: function(e) {
					assert(false, e);
				}
			});

		});

	});

	describe('with skipTag==false', function() {

		it('should transform straight quotes into curly quotes, including HTML tag attributes but skipping code blocks', function() {

			var quotify = Machine.build(require('../index.js')).configure({
				html: '<a href="test.html">"What\'s the deal?", said the Big Bopper. ```"\'sup, code!"``` "We\'re flying kinda low."</a>',
				options: {
					skipTag: false
				}
			}).exec({
				success: function(html) {
					assert(html == "<a href=&ldquo;test.html&rdquo;>&ldquo;What&rsquo;s the deal?&rdquo;, said the Big Bopper. ```\"'sup, code!\"``` &ldquo;We&rsquo;re flying kinda low.&rdquo;</a>", html);
				},
				error: function(e) {
					assert(false, e);
				}
			});

		});

	});

	describe('with skipTag==false and skipCode==false', function() {

		it('should transform straight quotes into curly quotes, including HTML tag attributes and code blocks', function() {

			var quotify = Machine.build(require('../index.js')).configure({
				html: '<a href="test.html">"What\'s the deal?", said the Big Bopper. ```"\'sup, code!"``` "We\'re flying kinda low."</a>',
				options: {
					skipTag: false,
					skipCode: false
				}
			}).exec({
				success: function(html) {
					assert(html == "<a href=&ldquo;test.html&rdquo;>&ldquo;What&rsquo;s the deal?&rdquo;, said the Big Bopper. ```&ldquo;&rsquo;sup, code!&rdquo;``` &ldquo;We&rsquo;re flying kinda low.&rdquo;</a>", html);
				},
				error: function(e) {
					assert(false, e);
				}
			});

		});

	});


});

