module.exports = {
  id: 'quotify',
  moduleName: 'quotify',
  description: 'Transform straight quotes into curly quotes',
  transparent: true,
  inputs: {
    html: {
      example: '"What\'s the deal?", said the Big Bopper.  "We\'re flying kinda low."'
    },
    options: {
			example: {
				skipCode: true,
				skipTag: false
			}
    }
  },
  exits: {
    error: {},
    success: {
      example: "&ldquo;What&rsquo;s the deal?&rdquo;, said the Big Bopper.  &ldquo;We&rsquo;re flying kinda low.&rdquo;"
    }
  },
  fn: function ($i,$x) {

    $i.options = $i.options || {};
    if (typeof $i.options.skipCode == 'undefined') {$i.options.skipCode = true;}
    if (typeof $i.options.skipTag == 'undefined') {$i.options.skipTag = true;}

    try {
      var curText = $i.html;
      var matches;
      // Strip out code blocks if requested
      var codeBlocks = [];
      if ($i.options.skipCode) {
        while(/```([\S\s]*?)```/m.test(curText)) {
          matches = curText.match(/```([\S\s]*?)```/);
          curText = curText.replace(/```([\S\s]*?)```/, "[[["+codeBlocks.length+"]]]");
          codeBlocks.push("```"+matches[1]+"```");
        }
        while(/`.*`/.test(curText)) {
          matches = curText.match(/`(.*?)`/);
          curText = curText.replace(/`(.*?)`/, "[[["+codeBlocks.length+"]]]");
          codeBlocks.push("`"+matches[1]+"`");
        }
      }
      if ($i.options.skipTag) {
        while(/<([\S\s]*?)>/.test(curText)) {
          matches = curText.match(/<([\S\s]*?)>/);
          curText = curText.replace(/<([\S\s]*?)>/, "[[["+codeBlocks.length+"]]]");
          codeBlocks.push("<"+matches[1]+">");
        }
      }
      curText = curText
        .replace(/"(.*?)"/g,'&ldquo;$1&rdquo;')
        .replace(/^'(.*?)'/g,'&lsquo;$1&rsquo;')
        .replace(/^(\S*?)'/g,'$1&rsquo;')
        .replace(/(\s)'(\S*?)'/g,'$1&lsquo;$2&rsquo;')
        .replace(/(\W)'(\w*?)'(\W)/g,'$1&lsquo;$2&rsquo;$3')
        .replace(/(\S)'(\S|\s)/g,'$1&rsquo;$2');

      for (var i = 0; i < codeBlocks.length; i++) {
        curText = curText.replace("[[["+i+"]]]", codeBlocks[i]);
      }

      return $x.success(curText);
    }
    catch(e) {
      return $x.error(e);
    }
  }
};