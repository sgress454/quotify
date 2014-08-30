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
        // Double quotes are easy
        .replace(/"(.*?)"/g,'&ldquo;$1&rdquo;')
        // Replace `we're` with `we&rsquo;re`
        .replace(/(\w)'(\w)/g,'$1&rsquo;$2')
        // Replace `'who is that?'` with `&lsquo;who is that&rsquo;`
        .replace(/'(\w)([^']+)(\w)'/g,'&lsquo;$1$2$3&rsquo;')
        // Replace `'sup, yo` with `&rsquo;sup, yo`
        .replace(/(\s|^)'([^']+)([^A-Za-z'])/g,'$1&rsquo;$2$3');

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