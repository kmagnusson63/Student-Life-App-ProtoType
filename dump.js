function echo() {
  //  discuss at: http://phpjs.org/functions/echo/
  // original by: Philip Peterson
  // improved by: echo is bad
  // improved by: Nate
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //  revised by: Der Simon (http://innerdom.sourceforge.net/)
  // bugfixed by: Eugene Bulkin (http://doubleaw.com/)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: EdorFaus
  //    input by: JB
  //        note: If browsers start to support DOM Level 3 Load and Save (parsing/serializing),
  //        note: we wouldn't need any such long code (even most of the code below). See
  //        note: link below for a cross-browser implementation in JavaScript. HTML5 might
  //        note: possibly support DOMParser, but that is not presently a standard.
  //        note: Although innerHTML is widely used and may become standard as of HTML5, it is also not ideal for
  //        note: use with a temporary holder before appending to the DOM (as is our last resort below),
  //        note: since it may not work in an XML context
  //        note: Using innerHTML to directly add to the BODY is very dangerous because it will
  //        note: break all pre-existing references to HTMLElements.
  //   example 1: echo('<div><p>abc</p><p>abc</p></div>');
  //   returns 1: undefined

  var isNode = typeof module !== 'undefined' && module.exports && typeof global !== "undefined" && {}.toString.call(
    global) == '[object global]';
  if (isNode) {
    var args = Array.prototype.slice.call(arguments);
    return console.log(args.join(' '));
  }

  var arg = '';
  var argc = arguments.length;
  var argv = arguments;
  var i = 0;
  var holder, win = this.window;
  var d = win.document;
  var ns_xhtml = 'http://www.w3.org/1999/xhtml';
  // If we're in a XUL context
  var ns_xul = 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul';

  var stringToDOM = function (str, parent, ns, container) {
    var extraNSs = '';
    if (ns === ns_xul) {
      extraNSs = ' xmlns:html="' + ns_xhtml + '"';
    }
    var stringContainer = '<' + container + ' xmlns="' + ns + '"' + extraNSs + '>' + str + '</' + container + '>';
    var dils = win.DOMImplementationLS;
    var dp = win.DOMParser;
    var ax = win.ActiveXObject;
    if (dils && dils.createLSInput && dils.createLSParser) {
      // Follows the DOM 3 Load and Save standard, but not
      // implemented in browsers at present; HTML5 is to standardize on innerHTML, but not for XML (though
      // possibly will also standardize with DOMParser); in the meantime, to ensure fullest browser support, could
      // attach http://svn2.assembla.com/svn/brettz9/DOMToString/DOM3.js (see http://svn2.assembla.com/svn/brettz9/DOMToString/DOM3.xhtml for a simple test file)
      var lsInput = dils.createLSInput();
      // If we're in XHTML, we'll try to allow the XHTML namespace to be available by default
      lsInput.stringData = stringContainer;
      // synchronous, no schema type
      var lsParser = dils.createLSParser(1, null);
      return lsParser.parse(lsInput)
        .firstChild;
    } else if (dp) {
      // If we're in XHTML, we'll try to allow the XHTML namespace to be available by default
      try {
        var fc = new dp()
          .parseFromString(stringContainer, 'text/xml');
        if (fc && fc.documentElement && fc.documentElement.localName !== 'parsererror' && fc.documentElement.namespaceURI !==
          'http://www.mozilla.org/newlayout/xml/parsererror.xml') {
          return fc.documentElement.firstChild;
        }
        // If there's a parsing error, we just continue on
      } catch (e) {
        // If there's a parsing error, we just continue on
      }
    } else if (ax) {
      // We don't bother with a holder in Explorer as it doesn't support namespaces
      var axo = new ax('MSXML2.DOMDocument');
      axo.loadXML(str);
      return axo.documentElement;
    }
    /*else if (win.XMLHttpRequest) {
     // Supposed to work in older Safari
      var req = new win.XMLHttpRequest;
      req.open('GET', 'data:application/xml;charset=utf-8,'+encodeURIComponent(str), false);
      if (req.overrideMimeType) {
        req.overrideMimeType('application/xml');
      }
      req.send(null);
      return req.responseXML;
    }*/
    // Document fragment did not work with innerHTML, so we create a temporary element holder
    // If we're in XHTML, we'll try to allow the XHTML namespace to be available by default
    //if (d.createElementNS && (d.contentType && d.contentType !== 'text/html')) {
    // Don't create namespaced elements if we're being served as HTML (currently only Mozilla supports this detection in true XHTML-supporting browsers, but Safari and Opera should work with the above DOMParser anyways, and IE doesn't support createElementNS anyways)
    if (d.createElementNS && // Browser supports the method
      (d.documentElement.namespaceURI || // We can use if the document is using a namespace
        d.documentElement.nodeName.toLowerCase() !== 'html' || // We know it's not HTML4 or less, if the tag is not HTML (even if the root namespace is null)
        (d.contentType && d.contentType !== 'text/html') // We know it's not regular HTML4 or less if this is Mozilla (only browser supporting the attribute) and the content type is something other than text/html; other HTML5 roots (like svg) still have a namespace
      )) {
      // Don't create namespaced elements if we're being served as HTML (currently only Mozilla supports this detection in true XHTML-supporting browsers, but Safari and Opera should work with the above DOMParser anyways, and IE doesn't support createElementNS anyways); last test is for the sake of being in a pure XML document
      holder = d.createElementNS(ns, container);
    } else {
      // Document fragment did not work with innerHTML
      holder = d.createElement(container);
    }
    holder.innerHTML = str;
    while (holder.firstChild) {
      parent.appendChild(holder.firstChild);
    }
    return false;
    // throw 'Your browser does not support DOM parsing as required by echo()';
  };

  var ieFix = function (node) {
    if (node.nodeType === 1) {
      var newNode = d.createElement(node.nodeName);
      var i, len;
      if (node.attributes && node.attributes.length > 0) {
        for (i = 0, len = node.attributes.length; i < len; i++) {
          newNode.setAttribute(node.attributes[i].nodeName, node.getAttribute(node.attributes[i].nodeName));
        }
      }
      if (node.childNodes && node.childNodes.length > 0) {
        for (i = 0, len = node.childNodes.length; i < len; i++) {
          newNode.appendChild(ieFix(node.childNodes[i]));
        }
      }
      return newNode;
    } else {
      return d.createTextNode(node.nodeValue);
    }
  };

  var replacer = function (s, m1, m2) {
    // We assume for now that embedded variables do not have dollar sign; to add a dollar sign, you currently must use {$$var} (We might change this, however.)
    // Doesn't cover all cases yet: see http://php.net/manual/en/language.types.string.php#language.types.string.syntax.double
    if (m1 !== '\\') {
      return m1 + eval(m2);
    } else {
      return s;
    }
  };

  this.php_js = this.php_js || {};
  var phpjs = this.php_js;
  var ini = phpjs.ini;
  var obs = phpjs.obs;
  for (i = 0; i < argc; i++) {
    arg = argv[i];
    if (ini && ini['phpjs.echo_embedded_vars']) {
      arg = arg.replace(/(.?)\{?\$(\w*?\}|\w*)/g, replacer);
    }

    if (!phpjs.flushing && obs && obs.length) {
      // If flushing we output, but otherwise presence of a buffer means caching output
      obs[obs.length - 1].buffer += arg;
      continue;
    }

    if (d.appendChild) {
      if (d.body) {
        if (win.navigator.appName === 'Microsoft Internet Explorer') {
          // We unfortunately cannot use feature detection, since this is an IE bug with cloneNode nodes being appended
          d.body.appendChild(stringToDOM(ieFix(arg)));
        } else {
          var unappendedLeft = stringToDOM(arg, d.body, ns_xhtml, 'div')
            .cloneNode(true); // We will not actually append the div tag (just using for providing XHTML namespace by default)
          if (unappendedLeft) {
            d.body.appendChild(unappendedLeft);
          }
        }
      } else {
        // We will not actually append the description tag (just using for providing XUL namespace by default)
        d.documentElement.appendChild(stringToDOM(arg, d.documentElement, ns_xul, 'description'));
      }
    } else if (d.write) {
      d.write(arg);
    } else {
      console.log(arg);
    }
  }
}

function var_export(mixed_expression, bool_return) {
  //  discuss at: http://phpjs.org/functions/var_export/
  // original by: Philip Peterson
  // improved by: johnrembo
  // improved by: Brett Zamir (http://brett-zamir.me)
  //    input by: Brian Tafoya (http://www.premasolutions.com/)
  //    input by: Hans Henrik (http://hanshenrik.tk/)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //  depends on: echo
  //   example 1: var_export(null);
  //   returns 1: null
  //   example 2: var_export({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, true);
  //   returns 2: "array (\n  0 => 'Kevin',\n  1 => 'van',\n  2 => 'Zonneveld'\n)"
  //   example 3: data = 'Kevin';
  //   example 3: var_export(data, true);
  //   returns 3: "'Kevin'"

  var retstr = '',
    iret = '',
    value,
    cnt = 0,
    x = [],
    i = 0,
    funcParts = [],
    // We use the last argument (not part of PHP) to pass in
    // our indentation level
    idtLevel = arguments[2] || 2,
    innerIndent = '',
    outerIndent = '',
    getFuncName = function (fn) {
      var name = (/\W*function\s+([\w\$]+)\s*\(/)
        .exec(fn);
      if (!name) {
        return '(Anonymous)';
      }
      return name[1];
    };
  _makeIndent = function (idtLevel) {
    return (new Array(idtLevel + 1))
      .join(' ');
  };
  __getType = function (inp) {
    var i = 0,
      match, types, cons, type = typeof inp;
    if (type === 'object' && (inp && inp.constructor) &&
      getFuncName(inp.constructor) === 'PHPJS_Resource') {
      return 'resource';
    }
    if (type === 'function') {
      return 'function';
    }
    if (type === 'object' && !inp) {
      // Should this be just null?
      return 'null';
    }
    if (type === 'object') {
      if (!inp.constructor) {
        return 'object';
      }
      cons = inp.constructor.toString();
      match = cons.match(/(\w+)\(/);
      if (match) {
        cons = match[1].toLowerCase();
      }
      types = ['boolean', 'number', 'string', 'array'];
      for (i = 0; i < types.length; i++) {
        if (cons === types[i]) {
          type = types[i];
          break;
        }
      }
    }
    return type;
  };
  type = __getType(mixed_expression);

  if (type === null) {
    retstr = 'NULL';
  } else if (type === 'array' || type === 'object') {
    outerIndent = _makeIndent(idtLevel - 2);
    innerIndent = _makeIndent(idtLevel);
    for (i in mixed_expression) {
      value = this.var_export(mixed_expression[i], 1, idtLevel + 2);
      value = typeof value === 'string' ? value.replace(/</g, '&lt;')
        .
      replace(/>/g, '&gt;') : value;
      x[cnt++] = innerIndent + i + ' => ' +
        (__getType(mixed_expression[i]) === 'array' ?
        '\n' : '') + value;
    }
    iret = x.join(',\n');
    retstr = outerIndent + 'array (\n' + iret + '\n' + outerIndent + ')';
  } else if (type === 'function') {
    funcParts = mixed_expression.toString()
      .
    match(/function .*?\((.*?)\) \{([\s\S]*)\}/);

    // For lambda functions, var_export() outputs such as the following:
    // '\000lambda_1'. Since it will probably not be a common use to
    // expect this (unhelpful) form, we'll use another PHP-exportable
    // construct, create_function() (though dollar signs must be on the
    // variables in JavaScript); if using instead in JavaScript and you
    // are using the namespaced version, note that create_function() will
    // not be available as a global
    retstr = "create_function ('" + funcParts[1] + "', '" +
      funcParts[2].replace(new RegExp("'", 'g'), "\\'") + "')";
  } else if (type === 'resource') {
    // Resources treated as null for var_export
    retstr = 'NULL';
  } else {
    retstr = typeof mixed_expression !== 'string' ? mixed_expression :
      "'" + mixed_expression.replace(/(["'])/g, '\\$1')
      .
    replace(/\0/g, '\\0') + "'";
  }

  if (!bool_return) {
    this.echo(retstr);
    return null;
  }

  return retstr;
}
function var_dump() {
  //  discuss at: http://phpjs.org/functions/var_dump/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Zahlii
  // improved by: Brett Zamir (http://brett-zamir.me)
  //  depends on: echo
  //        note: For returning a string, use var_export() with the second argument set to true
  //        test: skip
  //   example 1: var_dump(1);
  //   returns 1: 'int(1)'

  var output = '',
    pad_char = ' ',
    pad_val = 4,
    lgth = 0,
    i = 0;

  var _getFuncName = function (fn) {
    var name = (/\W*function\s+([\w\$]+)\s*\(/)
      .exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };

  var _repeat_char = function (len, pad_char) {
    var str = '';
    for (var i = 0; i < len; i++) {
      str += pad_char;
    }
    return str;
  };
  var _getInnerVal = function (val, thick_pad) {
    var ret = '';
    if (val === null) {
      ret = 'NULL';
    } else if (typeof val === 'boolean') {
      ret = 'bool(' + val + ')';
    } else if (typeof val === 'string') {
      ret = 'string(' + val.length + ') "' + val + '"';
    } else if (typeof val === 'number') {
      if (parseFloat(val) == parseInt(val, 10)) {
        ret = 'int(' + val + ')';
      } else {
        ret = 'float(' + val + ')';
      }
    }
    // The remaining are not PHP behavior because these values only exist in this exact form in JavaScript
    else if (typeof val === 'undefined') {
      ret = 'undefined';
    } else if (typeof val === 'function') {
      var funcLines = val.toString()
        .split('\n');
      ret = '';
      for (var i = 0, fll = funcLines.length; i < fll; i++) {
        ret += (i !== 0 ? '\n' + thick_pad : '') + funcLines[i];
      }
    } else if (val instanceof Date) {
      ret = 'Date(' + val + ')';
    } else if (val instanceof RegExp) {
      ret = 'RegExp(' + val + ')';
    } else if (val.nodeName) {
      // Different than PHP's DOMElement
      switch (val.nodeType) {
      case 1:
        if (typeof val.namespaceURI === 'undefined' || val.namespaceURI === 'http://www.w3.org/1999/xhtml') {
          // Undefined namespace could be plain XML, but namespaceURI not widely supported
          ret = 'HTMLElement("' + val.nodeName + '")';
        } else {
          ret = 'XML Element("' + val.nodeName + '")';
        }
        break;
      case 2:
        ret = 'ATTRIBUTE_NODE(' + val.nodeName + ')';
        break;
      case 3:
        ret = 'TEXT_NODE(' + val.nodeValue + ')';
        break;
      case 4:
        ret = 'CDATA_SECTION_NODE(' + val.nodeValue + ')';
        break;
      case 5:
        ret = 'ENTITY_REFERENCE_NODE';
        break;
      case 6:
        ret = 'ENTITY_NODE';
        break;
      case 7:
        ret = 'PROCESSING_INSTRUCTION_NODE(' + val.nodeName + ':' + val.nodeValue + ')';
        break;
      case 8:
        ret = 'COMMENT_NODE(' + val.nodeValue + ')';
        break;
      case 9:
        ret = 'DOCUMENT_NODE';
        break;
      case 10:
        ret = 'DOCUMENT_TYPE_NODE';
        break;
      case 11:
        ret = 'DOCUMENT_FRAGMENT_NODE';
        break;
      case 12:
        ret = 'NOTATION_NODE';
        break;
      }
    }
    return ret;
  };

  var _formatArray = function (obj, cur_depth, pad_val, pad_char) {
    var someProp = '';
    if (cur_depth > 0) {
      cur_depth++;
    }

    var base_pad = _repeat_char(pad_val * (cur_depth - 1), pad_char);
    var thick_pad = _repeat_char(pad_val * (cur_depth + 1), pad_char);
    var str = '';
    var val = '';

    if (typeof obj === 'object' && obj !== null) {
      if (obj.constructor && _getFuncName(obj.constructor) === 'PHPJS_Resource') {
        return obj.var_dump();
      }
      lgth = 0;
      for (someProp in obj) {
        lgth++;
      }
      str += 'array(' + lgth + ') {\n';
      for (var key in obj) {
        var objVal = obj[key];
        if (typeof objVal === 'object' && objVal !== null && !(objVal instanceof Date) && !(objVal instanceof RegExp) && !
          objVal.nodeName) {
          str += thick_pad + '[' + key + '] =>\n' + thick_pad + _formatArray(objVal, cur_depth + 1, pad_val,
            pad_char);
        } else {
          val = _getInnerVal(objVal, thick_pad);
          str += thick_pad + '[' + key + '] =>\n' + thick_pad + val + '\n';
        }
      }
      str += base_pad + '}\n';
    } else {
      str = _getInnerVal(obj, thick_pad);
    }
    return str;
  };

  output = _formatArray(arguments[0], 0, pad_val, pad_char);
  for (i = 1; i < arguments.length; i++) {
    output += '\n' + _formatArray(arguments[i], 0, pad_val, pad_char);
  }
//alert(output);
document.getElementById("testing").textContent = document.getElementById("testing").textContent + "<br>" + output;
  this.echo(output);
}

