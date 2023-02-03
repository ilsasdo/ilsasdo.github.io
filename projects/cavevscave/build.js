(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$element = _Browser_element;
var $author$project$Game$Game = F8(
	function (player1, player2, round, actions, actionTiles, availableRooms, availableWalls, stack) {
		return {actionTiles: actionTiles, actions: actions, availableRooms: availableRooms, availableWalls: availableWalls, player1: player1, player2: player2, round: round, stack: stack};
	});
var $author$project$Game$NewActionPhase = {$: 'NewActionPhase'};
var $author$project$Game$Available = {$: 'Available'};
var $author$project$Game$None = {$: 'None'};
var $author$project$Game$Orange = {$: 'Orange'};
var $author$project$Game$Placed = {$: 'Placed'};
var $author$project$Game$Tile = F8(
	function (title, tileType, status, score, src, price, walls, actions) {
		return {actions: actions, price: price, score: score, src: src, status: status, tileType: tileType, title: title, walls: walls};
	});
var $author$project$Game$Walls = F4(
	function (north, east, south, west) {
		return {east: east, north: north, south: south, west: west};
	});
var $author$project$Game$Action = F6(
	function (classes, available, isDoable, _do, subphase, disableActions) {
		return {available: available, classes: classes, disableActions: disableActions, _do: _do, isDoable: isDoable, subphase: subphase};
	});
var $author$project$Tiles$fullAction = F4(
	function (isDoable, _do, subphase, disableActions) {
		return A6($author$project$Game$Action, 'full', true, isDoable, _do, subphase, disableActions);
	});
var $author$project$Game$Resources = F9(
	function (food, wood, stone, emmer, flax, gold, actions, availableWalls, opponentsGold) {
		return {actions: actions, availableWalls: availableWalls, emmer: emmer, flax: flax, food: food, gold: gold, opponentsGold: opponentsGold, stone: stone, wood: wood};
	});
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $author$project$Resources$priceFree = A9($author$project$Game$Resources, 0, 0, 0, 0, 0, 0, 0, 7, -1);
var $author$project$Resources$priceStone = F2(
	function (qty, resources) {
		return _Utils_update(
			resources,
			{stone: resources.stone + qty});
	});
var $author$project$Resources$require = F4(
	function (getter, condition, qty, resources) {
		return A2(
			condition,
			getter(resources),
			qty);
	});
var $author$project$Resources$topFood = F2(
	function (qty, resources) {
		return _Utils_update(
			resources,
			{
				food: A2($elm$core$Basics$max, resources.food, qty)
			});
	});
var $author$project$Tiles$tileFoodCorner = A8(
	$author$project$Game$Tile,
	'Angolo del Cibo',
	$author$project$Game$Orange,
	$author$project$Game$Available,
	3,
	'assets/img/rooms/angolo_del_cibo.jpg',
	A2($author$project$Resources$priceStone, 1, $author$project$Resources$priceFree),
	A4($author$project$Game$Walls, $author$project$Game$Placed, $author$project$Game$None, $author$project$Game$None, $author$project$Game$Placed),
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$fullAction,
			A3(
				$author$project$Resources$require,
				function ($) {
					return $.food;
				},
				$elm$core$Basics$lt,
				3),
			$author$project$Resources$topFood(3),
			_List_Nil,
			_List_fromArray(
				[0]))
		]));
var $author$project$Game$Optional = {$: 'Optional'};
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $author$project$Resources$addEmmer = F2(
	function (qty, resources) {
		return _Utils_update(
			resources,
			{
				emmer: A2($elm$core$Basics$min, 9, resources.emmer + qty)
			});
	});
var $author$project$Resources$addFood = F2(
	function (qty, resources) {
		return _Utils_update(
			resources,
			{
				food: A2($elm$core$Basics$min, 9, resources.food + qty)
			});
	});
var $elm$core$Basics$ge = _Utils_ge;
var $author$project$Tiles$leftAction = F4(
	function (isDoable, _do, subphase, disableActions) {
		return A6($author$project$Game$Action, 'left', true, isDoable, _do, subphase, disableActions);
	});
var $author$project$Tiles$rightAction = F4(
	function (isDoable, _do, subphase, disableActions) {
		return A6($author$project$Game$Action, 'right', true, isDoable, _do, subphase, disableActions);
	});
var $author$project$Tiles$tileMacina = A8(
	$author$project$Game$Tile,
	'Macina',
	$author$project$Game$Orange,
	$author$project$Game$Available,
	4,
	'assets/img/rooms/macina.jpg',
	A2($author$project$Resources$priceStone, 1, $author$project$Resources$priceFree),
	A4($author$project$Game$Walls, $author$project$Game$Placed, $author$project$Game$None, $author$project$Game$None, $author$project$Game$Optional),
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$leftAction,
			A3(
				$author$project$Resources$require,
				function ($) {
					return $.emmer;
				},
				$elm$core$Basics$ge,
				1),
			function (res) {
				return A2(
					$author$project$Resources$addFood,
					3,
					A2($author$project$Resources$addEmmer, -1, res));
			},
			_List_Nil,
			_List_fromArray(
				[0, 1])),
			A4(
			$author$project$Tiles$rightAction,
			A3(
				$author$project$Resources$require,
				function ($) {
					return $.emmer;
				},
				$elm$core$Basics$ge,
				4),
			function (res) {
				return A2(
					$author$project$Resources$addFood,
					7,
					A2($author$project$Resources$addEmmer, -4, res));
			},
			_List_Nil,
			_List_fromArray(
				[0, 1]))
		]));
var $author$project$Resources$alwaysDoable = function (resources) {
	return true;
};
var $author$project$Resources$priceGold = F2(
	function (qty, resources) {
		return _Utils_update(
			resources,
			{gold: resources.gold + qty});
	});
var $author$project$Resources$topEmmer = F2(
	function (qty, resources) {
		return _Utils_update(
			resources,
			{
				emmer: A2($elm$core$Basics$max, resources.emmer, qty)
			});
	});
var $author$project$Resources$topFlax = F2(
	function (qty, resources) {
		return _Utils_update(
			resources,
			{
				flax: A2($elm$core$Basics$max, resources.flax, qty)
			});
	});
var $author$project$Resources$topGold = F2(
	function (qty, resources) {
		return _Utils_update(
			resources,
			{
				gold: A2($elm$core$Basics$max, resources.gold, qty)
			});
	});
var $author$project$Resources$topWood = F2(
	function (qty, resources) {
		return _Utils_update(
			resources,
			{
				wood: A2($elm$core$Basics$max, resources.wood, qty)
			});
	});
var $author$project$Tiles$tileSalotto = A8(
	$author$project$Game$Tile,
	'Salotto',
	$author$project$Game$Orange,
	$author$project$Game$Available,
	6,
	'assets/img/rooms/salotto.jpg',
	A2(
		$author$project$Resources$priceGold,
		1,
		A2($author$project$Resources$priceStone, 1, $author$project$Resources$priceFree)),
	A4($author$project$Game$Walls, $author$project$Game$Placed, $author$project$Game$Placed, $author$project$Game$None, $author$project$Game$Placed),
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$fullAction,
			$author$project$Resources$alwaysDoable,
			function (res) {
				return A2(
					$author$project$Resources$topGold,
					1,
					A2(
						$author$project$Resources$topFood,
						1,
						A2(
							$author$project$Resources$topFlax,
							1,
							A2(
								$author$project$Resources$topEmmer,
								1,
								A2(
									$author$project$Resources$topWood,
									1,
									A2($author$project$Resources$topWood, 1, res))))));
			},
			_List_Nil,
			_List_fromArray(
				[0]))
		]));
var $author$project$Tiles$firstAction = F4(
	function (isDoable, _do, subphase, disableActions) {
		return A6($author$project$Game$Action, 'first', true, isDoable, _do, subphase, disableActions);
	});
var $author$project$Tiles$fourthAction = F4(
	function (isDoable, _do, subphase, disableActions) {
		return A6($author$project$Game$Action, 'fourth', true, isDoable, _do, subphase, disableActions);
	});
var $author$project$Resources$priceWood = F2(
	function (qty, resources) {
		return _Utils_update(
			resources,
			{wood: resources.wood + qty});
	});
var $author$project$Tiles$secondAction = F4(
	function (isDoable, _do, subphase, disableActions) {
		return A6($author$project$Game$Action, 'second', true, isDoable, _do, subphase, disableActions);
	});
var $author$project$Tiles$thirdAction = F4(
	function (isDoable, _do, subphase, disableActions) {
		return A6($author$project$Game$Action, 'third', true, isDoable, _do, subphase, disableActions);
	});
var $author$project$Resources$topStone = F2(
	function (qty, resources) {
		return _Utils_update(
			resources,
			{
				stone: A2($elm$core$Basics$max, resources.stone, qty)
			});
	});
var $author$project$Tiles$tileShelf = A8(
	$author$project$Game$Tile,
	'Shelf',
	$author$project$Game$Orange,
	$author$project$Game$Available,
	3,
	'assets/img/rooms/scaffale.jpg',
	A2($author$project$Resources$priceWood, 1, $author$project$Resources$priceFree),
	A4($author$project$Game$Walls, $author$project$Game$Placed, $author$project$Game$None, $author$project$Game$None, $author$project$Game$None),
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$firstAction,
			A3(
				$author$project$Resources$require,
				function ($) {
					return $.wood;
				},
				$elm$core$Basics$lt,
				2),
			$author$project$Resources$topWood(2),
			_List_Nil,
			_List_fromArray(
				[0, 1, 2, 3])),
			A4(
			$author$project$Tiles$secondAction,
			A3(
				$author$project$Resources$require,
				function ($) {
					return $.stone;
				},
				$elm$core$Basics$lt,
				2),
			$author$project$Resources$topStone(2),
			_List_Nil,
			_List_fromArray(
				[0, 1, 2, 3])),
			A4(
			$author$project$Tiles$thirdAction,
			A3(
				$author$project$Resources$require,
				function ($) {
					return $.emmer;
				},
				$elm$core$Basics$lt,
				2),
			$author$project$Resources$topEmmer(2),
			_List_Nil,
			_List_fromArray(
				[0, 1, 2, 3])),
			A4(
			$author$project$Tiles$fourthAction,
			A3(
				$author$project$Resources$require,
				function ($) {
					return $.flax;
				},
				$elm$core$Basics$lt,
				2),
			$author$project$Resources$topFlax(2),
			_List_Nil,
			_List_fromArray(
				[0, 1, 2, 3]))
		]));
var $author$project$Resources$addFlax = F2(
	function (qty, resources) {
		return _Utils_update(
			resources,
			{
				flax: A2($elm$core$Basics$min, 9, resources.flax + qty)
			});
	});
var $author$project$Resources$addGold = F2(
	function (qty, resources) {
		return _Utils_update(
			resources,
			{
				gold: A2($elm$core$Basics$min, 19, resources.gold + qty)
			});
	});
var $author$project$Tiles$tileSpinningWheel = A8(
	$author$project$Game$Tile,
	'Filatoio',
	$author$project$Game$Orange,
	$author$project$Game$Available,
	4,
	'assets/img/rooms/filatoio.jpg',
	A2($author$project$Resources$priceWood, 1, $author$project$Resources$priceFree),
	A4($author$project$Game$Walls, $author$project$Game$Placed, $author$project$Game$None, $author$project$Game$None, $author$project$Game$None),
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$leftAction,
			A3(
				$author$project$Resources$require,
				function ($) {
					return $.flax;
				},
				$elm$core$Basics$ge,
				1),
			function (res) {
				return A2(
					$author$project$Resources$addGold,
					1,
					A2($author$project$Resources$addFlax, -1, res));
			},
			_List_Nil,
			_List_fromArray(
				[0, 1])),
			A4(
			$author$project$Tiles$rightAction,
			A3(
				$author$project$Resources$require,
				function ($) {
					return $.flax;
				},
				$elm$core$Basics$ge,
				3),
			function (res) {
				return A2(
					$author$project$Resources$addGold,
					2,
					A2($author$project$Resources$addFlax, -3, res));
			},
			_List_Nil,
			_List_fromArray(
				[0, 1]))
		]));
var $author$project$Resources$addStone = F2(
	function (qty, resources) {
		return _Utils_update(
			resources,
			{
				stone: A2($elm$core$Basics$min, 9, resources.stone + qty)
			});
	});
var $author$project$Tiles$bottomAction = F4(
	function (isDoable, _do, subphase, disableActions) {
		return A6($author$project$Game$Action, 'bottom', true, isDoable, _do, subphase, disableActions);
	});
var $author$project$Resources$minStone = F2(
	function (qty, resources) {
		return _Utils_update(
			resources,
			{
				stone: A2($elm$core$Basics$min, resources.stone, qty)
			});
	});
var $author$project$Tiles$topAction = F4(
	function (isDoable, _do, subphase, disableActions) {
		return A6($author$project$Game$Action, 'top', true, isDoable, _do, subphase, disableActions);
	});
var $author$project$Tiles$tileTunnel = A8(
	$author$project$Game$Tile,
	'Tunnel',
	$author$project$Game$Orange,
	$author$project$Game$Available,
	3,
	'assets/img/rooms/tunnel.jpg',
	A2($author$project$Resources$priceWood, 1, $author$project$Resources$priceFree),
	A4($author$project$Game$Walls, $author$project$Game$None, $author$project$Game$Placed, $author$project$Game$None, $author$project$Game$Placed),
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$topAction,
			$author$project$Resources$alwaysDoable,
			$author$project$Resources$addFood(2),
			_List_Nil,
			_List_fromArray(
				[0])),
			A4(
			$author$project$Tiles$bottomAction,
			A3(
				$author$project$Resources$require,
				function ($) {
					return $.stone;
				},
				$elm$core$Basics$lt,
				3),
			function (resources) {
				return A2(
					$author$project$Resources$minStone,
					3,
					A2($author$project$Resources$addStone, 1, resources));
			},
			_List_Nil,
			_List_fromArray(
				[1]))
		]));
var $author$project$Tiles$initCommonRooms = _List_fromArray(
	[$author$project$Tiles$tileShelf, $author$project$Tiles$tileSpinningWheel, $author$project$Tiles$tileMacina, $author$project$Tiles$tileSalotto, $author$project$Tiles$tileTunnel, $author$project$Tiles$tileFoodCorner]);
var $author$project$Game$InitPlayerBoard = function (a) {
	return {$: 'InitPlayerBoard', a: a};
};
var $author$project$Game$InitRoundTiles = function (a) {
	return {$: 'InitRoundTiles', a: a};
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$random$Random$Generate = function (a) {
	return {$: 'Generate', a: a};
};
var $elm$random$Random$Seed = F2(
	function (a, b) {
		return {$: 'Seed', a: a, b: b};
	});
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$random$Random$next = function (_v0) {
	var state0 = _v0.a;
	var incr = _v0.b;
	return A2($elm$random$Random$Seed, ((state0 * 1664525) + incr) >>> 0, incr);
};
var $elm$random$Random$initialSeed = function (x) {
	var _v0 = $elm$random$Random$next(
		A2($elm$random$Random$Seed, 0, 1013904223));
	var state1 = _v0.a;
	var incr = _v0.b;
	var state2 = (state1 + x) >>> 0;
	return $elm$random$Random$next(
		A2($elm$random$Random$Seed, state2, incr));
};
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0.a;
	return millis;
};
var $elm$random$Random$init = A2(
	$elm$core$Task$andThen,
	function (time) {
		return $elm$core$Task$succeed(
			$elm$random$Random$initialSeed(
				$elm$time$Time$posixToMillis(time)));
	},
	$elm$time$Time$now);
var $elm$random$Random$step = F2(
	function (_v0, seed) {
		var generator = _v0.a;
		return generator(seed);
	});
var $elm$random$Random$onEffects = F3(
	function (router, commands, seed) {
		if (!commands.b) {
			return $elm$core$Task$succeed(seed);
		} else {
			var generator = commands.a.a;
			var rest = commands.b;
			var _v1 = A2($elm$random$Random$step, generator, seed);
			var value = _v1.a;
			var newSeed = _v1.b;
			return A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$random$Random$onEffects, router, rest, newSeed);
				},
				A2($elm$core$Platform$sendToApp, router, value));
		}
	});
var $elm$random$Random$onSelfMsg = F3(
	function (_v0, _v1, seed) {
		return $elm$core$Task$succeed(seed);
	});
var $elm$random$Random$Generator = function (a) {
	return {$: 'Generator', a: a};
};
var $elm$random$Random$map = F2(
	function (func, _v0) {
		var genA = _v0.a;
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v1 = genA(seed0);
				var a = _v1.a;
				var seed1 = _v1.b;
				return _Utils_Tuple2(
					func(a),
					seed1);
			});
	});
var $elm$random$Random$cmdMap = F2(
	function (func, _v0) {
		var generator = _v0.a;
		return $elm$random$Random$Generate(
			A2($elm$random$Random$map, func, generator));
	});
_Platform_effectManagers['Random'] = _Platform_createManager($elm$random$Random$init, $elm$random$Random$onEffects, $elm$random$Random$onSelfMsg, $elm$random$Random$cmdMap);
var $elm$random$Random$command = _Platform_leaf('Random');
var $elm$random$Random$generate = F2(
	function (tagger, generator) {
		return $elm$random$Random$command(
			$elm$random$Random$Generate(
				A2($elm$random$Random$map, tagger, generator)));
	});
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $elm$random$Random$peel = function (_v0) {
	var state = _v0.a;
	var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var $elm$random$Random$int = F2(
	function (a, b) {
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v0 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
				var lo = _v0.a;
				var hi = _v0.b;
				var range = (hi - lo) + 1;
				if (!((range - 1) & range)) {
					return _Utils_Tuple2(
						(((range - 1) & $elm$random$Random$peel(seed0)) >>> 0) + lo,
						$elm$random$Random$next(seed0));
				} else {
					var threshhold = (((-range) >>> 0) % range) >>> 0;
					var accountForBias = function (seed) {
						accountForBias:
						while (true) {
							var x = $elm$random$Random$peel(seed);
							var seedN = $elm$random$Random$next(seed);
							if (_Utils_cmp(x, threshhold) < 0) {
								var $temp$seed = seedN;
								seed = $temp$seed;
								continue accountForBias;
							} else {
								return _Utils_Tuple2((x % range) + lo, seedN);
							}
						}
					};
					return accountForBias(seed0);
				}
			});
	});
var $elm$random$Random$maxInt = 2147483647;
var $elm$random$Random$minInt = -2147483648;
var $elm_community$random_extra$Random$List$anyInt = A2($elm$random$Random$int, $elm$random$Random$minInt, $elm$random$Random$maxInt);
var $elm$random$Random$map3 = F4(
	function (func, _v0, _v1, _v2) {
		var genA = _v0.a;
		var genB = _v1.a;
		var genC = _v2.a;
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v3 = genA(seed0);
				var a = _v3.a;
				var seed1 = _v3.b;
				var _v4 = genB(seed1);
				var b = _v4.a;
				var seed2 = _v4.b;
				var _v5 = genC(seed2);
				var c = _v5.a;
				var seed3 = _v5.b;
				return _Utils_Tuple2(
					A3(func, a, b, c),
					seed3);
			});
	});
var $elm$core$Bitwise$or = _Bitwise_or;
var $elm$random$Random$independentSeed = $elm$random$Random$Generator(
	function (seed0) {
		var makeIndependentSeed = F3(
			function (state, b, c) {
				return $elm$random$Random$next(
					A2($elm$random$Random$Seed, state, (1 | (b ^ c)) >>> 0));
			});
		var gen = A2($elm$random$Random$int, 0, 4294967295);
		return A2(
			$elm$random$Random$step,
			A4($elm$random$Random$map3, makeIndependentSeed, gen, gen, gen),
			seed0);
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$core$List$sortBy = _List_sortBy;
var $elm_community$random_extra$Random$List$shuffle = function (list) {
	return A2(
		$elm$random$Random$map,
		function (independentSeed) {
			return A2(
				$elm$core$List$map,
				$elm$core$Tuple$first,
				A2(
					$elm$core$List$sortBy,
					$elm$core$Tuple$second,
					A3(
						$elm$core$List$foldl,
						F2(
							function (item, _v0) {
								var acc = _v0.a;
								var seed = _v0.b;
								var _v1 = A2($elm$random$Random$step, $elm_community$random_extra$Random$List$anyInt, seed);
								var tag = _v1.a;
								var nextSeed = _v1.b;
								return _Utils_Tuple2(
									A2(
										$elm$core$List$cons,
										_Utils_Tuple2(item, tag),
										acc),
									nextSeed);
							}),
						_Utils_Tuple2(_List_Nil, independentSeed),
						list).a));
		},
		$elm$random$Random$independentSeed);
};
var $author$project$Tiles$setupRandomTiles = F5(
	function (rooms, round1Tiles, round2Tiles, round3Tiles, round4Tiles) {
		return $elm$core$Platform$Cmd$batch(
			_List_fromArray(
				[
					A2(
					$elm$random$Random$generate,
					$author$project$Game$InitPlayerBoard,
					$elm_community$random_extra$Random$List$shuffle(rooms)),
					A2(
					$elm$random$Random$generate,
					$author$project$Game$InitRoundTiles,
					$elm_community$random_extra$Random$List$shuffle(round4Tiles)),
					A2(
					$elm$random$Random$generate,
					$author$project$Game$InitRoundTiles,
					$elm_community$random_extra$Random$List$shuffle(round3Tiles)),
					A2(
					$elm$random$Random$generate,
					$author$project$Game$InitRoundTiles,
					$elm_community$random_extra$Random$List$shuffle(round2Tiles)),
					A2(
					$elm$random$Random$generate,
					$author$project$Game$InitRoundTiles,
					$elm_community$random_extra$Random$List$shuffle(round1Tiles))
				]));
	});
var $author$project$Game$Rock = {$: 'Rock'};
var $author$project$Resources$addWood = F2(
	function (qty, resources) {
		return _Utils_update(
			resources,
			{
				wood: A2($elm$core$Basics$min, 9, resources.wood + qty)
			});
	});
var $author$project$Tiles$tileAltareSacrificale = A8(
	$author$project$Game$Tile,
	'Altare Sacrificale',
	$author$project$Game$Orange,
	$author$project$Game$Rock,
	7,
	'assets/img/rooms/altare_sacrificale.jpg',
	A2($author$project$Resources$priceStone, 4, $author$project$Resources$priceFree),
	A4($author$project$Game$Walls, $author$project$Game$Placed, $author$project$Game$Optional, $author$project$Game$None, $author$project$Game$Optional),
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$fullAction,
			function (res) {
				return A4(
					$author$project$Resources$require,
					function ($) {
						return $.wood;
					},
					$elm$core$Basics$ge,
					1,
					res) && (A4(
					$author$project$Resources$require,
					function ($) {
						return $.emmer;
					},
					$elm$core$Basics$ge,
					1,
					res) && (A4(
					$author$project$Resources$require,
					function ($) {
						return $.flax;
					},
					$elm$core$Basics$ge,
					1,
					res) && A4(
					$author$project$Resources$require,
					function ($) {
						return $.food;
					},
					$elm$core$Basics$ge,
					1,
					res)));
			},
			function (res) {
				return A2(
					$author$project$Resources$addGold,
					3,
					A2(
						$author$project$Resources$addFood,
						-1,
						A2(
							$author$project$Resources$addFlax,
							-1,
							A2(
								$author$project$Resources$addWood,
								-1,
								A2($author$project$Resources$addEmmer, -1, res)))));
			},
			_List_Nil,
			_List_fromArray(
				[0]))
		]));
var $author$project$Game$Furnish = {$: 'Furnish'};
var $author$project$Game$Gray = {$: 'Gray'};
var $author$project$Walls$noWalls = A4($author$project$Game$Walls, $author$project$Game$Optional, $author$project$Game$Optional, $author$project$Game$Optional, $author$project$Game$Optional);
var $author$project$Tiles$tileArredare = A8(
	$author$project$Game$Tile,
	'Arredare',
	$author$project$Game$Gray,
	$author$project$Game$Rock,
	6,
	'assets/img/rounds/arredare.jpg',
	$author$project$Resources$priceFree,
	$author$project$Walls$noWalls,
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$topAction,
			$author$project$Resources$alwaysDoable,
			$author$project$Resources$addFood(1),
			_List_Nil,
			_List_fromArray(
				[0])),
			A4(
			$author$project$Tiles$bottomAction,
			function (r) {
				return _Utils_cmp(r.food, r.actions) > 0;
			},
			function (r) {
				return A2($author$project$Resources$addFood, r.actions, r);
			},
			_List_fromArray(
				[$author$project$Game$Furnish]),
			_List_fromArray(
				[1]))
		]));
var $author$project$Tiles$tileBancarella = A8(
	$author$project$Game$Tile,
	'Bancarella',
	$author$project$Game$Orange,
	$author$project$Game$Rock,
	6,
	'assets/img/rooms/bancarella.jpg',
	A2(
		$author$project$Resources$priceGold,
		1,
		A2($author$project$Resources$priceWood, 1, $author$project$Resources$priceFree)),
	A4($author$project$Game$Walls, $author$project$Game$Placed, $author$project$Game$Optional, $author$project$Game$None, $author$project$Game$Optional),
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$leftAction,
			A3(
				$author$project$Resources$require,
				function ($) {
					return $.emmer;
				},
				$elm$core$Basics$ge,
				5),
			function (res) {
				return A2(
					$author$project$Resources$addGold,
					4,
					A2($author$project$Resources$addEmmer, -5, res));
			},
			_List_Nil,
			_List_fromArray(
				[0, 1])),
			A4(
			$author$project$Tiles$rightAction,
			A3(
				$author$project$Resources$require,
				function ($) {
					return $.flax;
				},
				$elm$core$Basics$ge,
				5),
			function (res) {
				return A2(
					$author$project$Resources$addGold,
					4,
					A2($author$project$Resources$addFlax, -5, res));
			},
			_List_Nil,
			_List_fromArray(
				[0, 1]))
		]));
var $author$project$Tiles$tileCameraSegreta = A8(
	$author$project$Game$Tile,
	'Camera Segreta',
	$author$project$Game$Orange,
	$author$project$Game$Rock,
	8,
	'assets/img/rooms/camera_segreta.jpg',
	A2(
		$author$project$Resources$priceStone,
		1,
		A2($author$project$Resources$priceWood, 2, $author$project$Resources$priceFree)),
	A4($author$project$Game$Walls, $author$project$Game$Placed, $author$project$Game$Placed, $author$project$Game$Placed, $author$project$Game$Placed),
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$leftAction,
			$author$project$Resources$alwaysDoable,
			function (res) {
				return A2($author$project$Resources$addFlax, 3, res);
			},
			_List_Nil,
			_List_fromArray(
				[0, 1])),
			A4(
			$author$project$Tiles$rightAction,
			$author$project$Resources$alwaysDoable,
			function (res) {
				return A2($author$project$Resources$addGold, 1, res);
			},
			_List_Nil,
			_List_fromArray(
				[0, 1]))
		]));
var $author$project$Tiles$tileCavaInEspansione = A8(
	$author$project$Game$Tile,
	'Cava in Espansione',
	$author$project$Game$Orange,
	$author$project$Game$Rock,
	8,
	'assets/img/rooms/cava_in_espansione.jpg',
	A2(
		$author$project$Resources$priceStone,
		3,
		A2($author$project$Resources$priceWood, 1, $author$project$Resources$priceFree)),
	A4($author$project$Game$Walls, $author$project$Game$Placed, $author$project$Game$Placed, $author$project$Game$None, $author$project$Game$Placed),
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$fullAction,
			A3(
				$author$project$Resources$require,
				function ($) {
					return $.gold;
				},
				$elm$core$Basics$ge,
				1),
			function (res) {
				return res;
			},
			_List_Nil,
			_List_fromArray(
				[0]))
		]));
var $author$project$Game$Activate = {$: 'Activate'};
var $author$project$Tiles$tileColtivare = A8(
	$author$project$Game$Tile,
	'Coltivare',
	$author$project$Game$Gray,
	$author$project$Game$Available,
	2,
	'assets/img/rounds/coltivare.jpg',
	$author$project$Resources$priceFree,
	$author$project$Walls$noWalls,
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$topAction,
			$author$project$Resources$alwaysDoable,
			function (r) {
				return r;
			},
			_List_fromArray(
				[$author$project$Game$Activate]),
			_List_fromArray(
				[0])),
			A4(
			$author$project$Tiles$bottomAction,
			$author$project$Resources$alwaysDoable,
			function (r) {
				return A2(
					$author$project$Resources$addFlax,
					1,
					A2($author$project$Resources$addEmmer, 2, r));
			},
			_List_Nil,
			_List_fromArray(
				[1]))
		]));
var $author$project$Game$BuildWall = {$: 'BuildWall'};
var $author$project$Tiles$topLeftAction = F4(
	function (isDoable, _do, subphase, disableActions) {
		return A6($author$project$Game$Action, 'topleft', true, isDoable, _do, subphase, disableActions);
	});
var $author$project$Tiles$tileCostruireUnMuro = A8(
	$author$project$Game$Tile,
	'Costrurire un Muro',
	$author$project$Game$Gray,
	$author$project$Game$Rock,
	7,
	'assets/img/rounds/costruire_un_muro.jpg',
	$author$project$Resources$priceFree,
	$author$project$Walls$noWalls,
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$topLeftAction,
			$author$project$Resources$alwaysDoable,
			function (r) {
				return r;
			},
			_List_fromArray(
				[$author$project$Game$Activate]),
			_List_fromArray(
				[0])),
			A4(
			$author$project$Tiles$thirdAction,
			$author$project$Resources$alwaysDoable,
			$author$project$Resources$addWood(1),
			_List_Nil,
			_List_fromArray(
				[1, 2])),
			A4(
			$author$project$Tiles$fourthAction,
			$author$project$Resources$alwaysDoable,
			$author$project$Resources$addStone(1),
			_List_Nil,
			_List_fromArray(
				[1, 2])),
			A4(
			$author$project$Tiles$bottomAction,
			A3(
				$author$project$Resources$require,
				function ($) {
					return $.availableWalls;
				},
				$elm$core$Basics$gt,
				0),
			function (r) {
				return r;
			},
			_List_fromArray(
				[$author$project$Game$BuildWall]),
			_List_fromArray(
				[3]))
		]));
var $author$project$Game$DestroyWall = {$: 'DestroyWall'};
var $author$project$Tiles$tileDemolireUnMuro = A8(
	$author$project$Game$Tile,
	'Demolire un Muro',
	$author$project$Game$Gray,
	$author$project$Game$Rock,
	0,
	'assets/img/rounds/demolire_un_muro.jpg',
	$author$project$Resources$priceFree,
	$author$project$Walls$noWalls,
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$fullAction,
			$author$project$Resources$alwaysDoable,
			function (r) {
				return A2(
					$author$project$Resources$addGold,
					1,
					A2(
						$author$project$Resources$addFood,
						3,
						A2($author$project$Resources$addStone, 2, r)));
			},
			_List_fromArray(
				[$author$project$Game$DestroyWall]),
			_List_fromArray(
				[0]))
		]));
var $author$project$Tiles$tileDeposito = A8(
	$author$project$Game$Tile,
	'Deposito',
	$author$project$Game$Orange,
	$author$project$Game$Rock,
	6,
	'assets/img/rooms/deposito.jpg',
	A2(
		$author$project$Resources$priceGold,
		1,
		A2($author$project$Resources$priceWood, 2, $author$project$Resources$priceFree)),
	A4($author$project$Game$Walls, $author$project$Game$Placed, $author$project$Game$None, $author$project$Game$None, $author$project$Game$Placed),
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$fullAction,
			$author$project$Resources$alwaysDoable,
			function (res) {
				return A2(
					$author$project$Resources$addFood,
					1,
					A2(
						$author$project$Resources$addFlax,
						1,
						A2($author$project$Resources$addEmmer, 1, res)));
			},
			_List_Nil,
			_List_fromArray(
				[0]))
		]));
var $author$project$Game$Blue = {$: 'Blue'};
var $author$project$Tiles$tileDungeon = A8(
	$author$project$Game$Tile,
	'Dungeon',
	$author$project$Game$Blue,
	$author$project$Game$Rock,
	11,
	'assets/img/equipments/sotterraneo.jpg',
	A2(
		$author$project$Resources$priceStone,
		3,
		A2($author$project$Resources$priceGold, 4, $author$project$Resources$priceFree)),
	A4($author$project$Game$Walls, $author$project$Game$Placed, $author$project$Game$Placed, $author$project$Game$Placed, $author$project$Game$Placed),
	_List_Nil);
var $author$project$Tiles$tileEquipmentRoom = A8(
	$author$project$Game$Tile,
	'Equipment Room',
	$author$project$Game$Blue,
	$author$project$Game$Rock,
	3,
	'assets/img/equipments/equipaggiamenti.jpg',
	A2($author$project$Resources$priceWood, 2, $author$project$Resources$priceFree),
	A4($author$project$Game$Walls, $author$project$Game$Placed, $author$project$Game$None, $author$project$Game$None, $author$project$Game$Optional),
	_List_Nil);
var $author$project$Game$Excavate = {$: 'Excavate'};
var $author$project$Tiles$bottomLeftAction = F4(
	function (isDoable, _do, subphase, disableActions) {
		return A6($author$project$Game$Action, 'bottomleft', true, isDoable, _do, subphase, disableActions);
	});
var $author$project$Tiles$bottomRightAction = F4(
	function (isDoable, _do, subphase, disableActions) {
		return A6($author$project$Game$Action, 'bottomright', true, isDoable, _do, subphase, disableActions);
	});
var $author$project$Tiles$tileEspansione = A8(
	$author$project$Game$Tile,
	'Espansione',
	$author$project$Game$Gray,
	$author$project$Game$Rock,
	10,
	'assets/img/rounds/espansione.jpg',
	$author$project$Resources$priceFree,
	$author$project$Walls$noWalls,
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$topAction,
			$author$project$Resources$alwaysDoable,
			function (r) {
				return r;
			},
			_List_fromArray(
				[$author$project$Game$Excavate]),
			_List_fromArray(
				[0])),
			A4(
			$author$project$Tiles$bottomLeftAction,
			A3(
				$author$project$Resources$require,
				function ($) {
					return $.food;
				},
				$elm$core$Basics$ge,
				5),
			$author$project$Resources$addFood(-5),
			_List_fromArray(
				[$author$project$Game$Furnish]),
			_List_fromArray(
				[1, 2])),
			A4(
			$author$project$Tiles$bottomRightAction,
			A3(
				$author$project$Resources$require,
				function ($) {
					return $.gold;
				},
				$elm$core$Basics$ge,
				1),
			$author$project$Resources$addGold(-1),
			_List_fromArray(
				[$author$project$Game$Furnish]),
			_List_fromArray(
				[1, 2]))
		]));
var $author$project$Tiles$tileFiliera = A8(
	$author$project$Game$Tile,
	'Filiera',
	$author$project$Game$Orange,
	$author$project$Game$Rock,
	5,
	'assets/img/rooms/filiera.jpg',
	A2($author$project$Resources$priceWood, 2, $author$project$Resources$priceFree),
	A4($author$project$Game$Walls, $author$project$Game$Placed, $author$project$Game$None, $author$project$Game$None, $author$project$Game$Placed),
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$fullAction,
			A3(
				$author$project$Resources$require,
				function ($) {
					return $.flax;
				},
				$elm$core$Basics$ge,
				2),
			function (res) {
				return A2(
					$author$project$Resources$addFood,
					2,
					A2(
						$author$project$Resources$addGold,
						2,
						A2($author$project$Resources$addFlax, -2, res)));
			},
			_List_Nil,
			_List_fromArray(
				[0]))
		]));
var $author$project$Tiles$tileForno = A8(
	$author$project$Game$Tile,
	'Forno',
	$author$project$Game$Orange,
	$author$project$Game$Rock,
	6,
	'assets/img/rooms/forno.jpg',
	A2(
		$author$project$Resources$priceStone,
		2,
		A2($author$project$Resources$priceWood, 1, $author$project$Resources$priceFree)),
	A4($author$project$Game$Walls, $author$project$Game$Placed, $author$project$Game$Placed, $author$project$Game$None, $author$project$Game$Placed),
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$leftAction,
			A3(
				$author$project$Resources$require,
				function ($) {
					return $.emmer;
				},
				$elm$core$Basics$ge,
				2),
			function (res) {
				return A2(
					$author$project$Resources$addGold,
					1,
					A2(
						$author$project$Resources$addFood,
						4,
						A2($author$project$Resources$addEmmer, -2, res)));
			},
			_List_Nil,
			_List_fromArray(
				[0, 1])),
			A4(
			$author$project$Tiles$rightAction,
			A3(
				$author$project$Resources$require,
				function ($) {
					return $.emmer;
				},
				$elm$core$Basics$ge,
				3),
			function (res) {
				return A2(
					$author$project$Resources$addGold,
					2,
					A2(
						$author$project$Resources$addFood,
						4,
						A2($author$project$Resources$addEmmer, -3, res)));
			},
			_List_Nil,
			_List_fromArray(
				[0, 1]))
		]));
var $author$project$Tiles$tileGoldMine = A8(
	$author$project$Game$Tile,
	'Miniera d\'Oro',
	$author$project$Game$Orange,
	$author$project$Game$Rock,
	9,
	'assets/img/rooms/miniera_d_oro.jpg',
	A2($author$project$Resources$priceGold, 5, $author$project$Resources$priceFree),
	A4($author$project$Game$Walls, $author$project$Game$Placed, $author$project$Game$Optional, $author$project$Game$None, $author$project$Game$Placed),
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$fullAction,
			$author$project$Resources$alwaysDoable,
			function (res) {
				return A2(
					$author$project$Resources$addStone,
					1,
					A2($author$project$Resources$addGold, 1, res));
			},
			_List_Nil,
			_List_fromArray(
				[0]))
		]));
var $author$project$Tiles$tileLavoriDomestici = A8(
	$author$project$Game$Tile,
	'Lavori Domestici',
	$author$project$Game$Gray,
	$author$project$Game$Available,
	3,
	'assets/img/rounds/lavori_domestici.jpg',
	$author$project$Resources$priceFree,
	$author$project$Walls$noWalls,
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$topAction,
			function (r) {
				return _Utils_cmp(r.food, r.actions) > 0;
			},
			function (r) {
				return A2($author$project$Resources$addFood, -r.actions, r);
			},
			_List_fromArray(
				[$author$project$Game$Furnish]),
			_List_fromArray(
				[0])),
			A4(
			$author$project$Tiles$bottomLeftAction,
			A3(
				$author$project$Resources$require,
				function ($) {
					return $.food;
				},
				$elm$core$Basics$ge,
				5),
			$author$project$Resources$addFood(-5),
			_List_fromArray(
				[$author$project$Game$Furnish]),
			_List_fromArray(
				[1, 2])),
			A4(
			$author$project$Tiles$bottomRightAction,
			A3(
				$author$project$Resources$require,
				function ($) {
					return $.gold;
				},
				$elm$core$Basics$ge,
				1),
			$author$project$Resources$addGold(-1),
			_List_fromArray(
				[$author$project$Game$Furnish]),
			_List_fromArray(
				[1, 2]))
		]));
var $author$project$Tiles$tileLuxuryRoom = A8(
	$author$project$Game$Tile,
	'Stanza di Lusso',
	$author$project$Game$Orange,
	$author$project$Game$Rock,
	12,
	'assets/img/rooms/stanza_di_lusso.jpg',
	A2($author$project$Resources$priceGold, 7, $author$project$Resources$priceFree),
	A4($author$project$Game$Walls, $author$project$Game$Placed, $author$project$Game$Placed, $author$project$Game$Optional, $author$project$Game$Placed),
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$fullAction,
			$author$project$Resources$alwaysDoable,
			function (res) {
				return A2(
					$author$project$Resources$addFlax,
					1,
					A2($author$project$Resources$addGold, 1, res));
			},
			_List_Nil,
			_List_fromArray(
				[0]))
		]));
var $author$project$Game$ExcavateThroughWall = {$: 'ExcavateThroughWall'};
var $author$project$Tiles$tileMinare = A8(
	$author$project$Game$Tile,
	'Minare',
	$author$project$Game$Gray,
	$author$project$Game$Available,
	5,
	'assets/img/rounds/minare.jpg',
	$author$project$Resources$priceFree,
	$author$project$Walls$noWalls,
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$leftAction,
			$author$project$Resources$alwaysDoable,
			function (r) {
				return r;
			},
			_List_fromArray(
				[$author$project$Game$Activate, $author$project$Game$Activate]),
			_List_fromArray(
				[0, 1])),
			A4(
			$author$project$Tiles$rightAction,
			$author$project$Resources$alwaysDoable,
			function (r) {
				return r;
			},
			_List_fromArray(
				[$author$project$Game$ExcavateThroughWall]),
			_List_fromArray(
				[0, 1]))
		]));
var $author$project$Tiles$tileOfficina = A8(
	$author$project$Game$Tile,
	'Officina',
	$author$project$Game$Orange,
	$author$project$Game$Rock,
	5,
	'assets/img/rooms/officina.jpg',
	A2(
		$author$project$Resources$priceStone,
		2,
		A2($author$project$Resources$priceWood, 1, $author$project$Resources$priceFree)),
	A4($author$project$Game$Walls, $author$project$Game$Placed, $author$project$Game$Optional, $author$project$Game$None, $author$project$Game$Placed),
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$fullAction,
			function (res) {
				return A4(
					$author$project$Resources$require,
					function ($) {
						return $.flax;
					},
					$elm$core$Basics$ge,
					1,
					res) && A4(
					$author$project$Resources$require,
					function ($) {
						return $.food;
					},
					$elm$core$Basics$ge,
					2,
					res);
			},
			function (res) {
				return A2(
					$author$project$Resources$addGold,
					3,
					A2(
						$author$project$Resources$addFlax,
						-1,
						A2($author$project$Resources$addWood, -2, res)));
			},
			_List_Nil,
			_List_fromArray(
				[0]))
		]));
var $author$project$Tiles$tilePerforare = A8(
	$author$project$Game$Tile,
	'Perforare',
	$author$project$Game$Gray,
	$author$project$Game$Rock,
	8,
	'assets/img/rounds/perforare.jpg',
	$author$project$Resources$priceFree,
	$author$project$Walls$noWalls,
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$topAction,
			$author$project$Resources$alwaysDoable,
			function (r) {
				return r;
			},
			_List_fromArray(
				[$author$project$Game$Activate]),
			_List_fromArray(
				[0])),
			A4(
			$author$project$Tiles$bottomAction,
			function (r) {
				return A4(
					$author$project$Resources$require,
					function ($) {
						return $.gold;
					},
					$elm$core$Basics$gt,
					r.opponentsGold,
					r);
			},
			function (r) {
				return r;
			},
			_List_fromArray(
				[$author$project$Game$Excavate]),
			_List_fromArray(
				[1]))
		]));
var $author$project$Tiles$tileProspectingSite = A8(
	$author$project$Game$Tile,
	'Prospecting Site',
	$author$project$Game$Blue,
	$author$project$Game$Rock,
	5,
	'assets/img/equipments/analisi_territoriale.jpg',
	$author$project$Resources$priceFree,
	A4($author$project$Game$Walls, $author$project$Game$Placed, $author$project$Game$None, $author$project$Game$None, $author$project$Game$Optional),
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$bottomAction,
			function (r) {
				return A4(
					$author$project$Resources$require,
					function ($) {
						return $.food;
					},
					$elm$core$Basics$gt,
					0,
					r);
			},
			function (r) {
				return A2(
					$author$project$Resources$addGold,
					1,
					A2($author$project$Resources$addFood, -1, r));
			},
			_List_Nil,
			_List_fromArray(
				[0]))
		]));
var $author$project$Tiles$tileRettingRoom = A8(
	$author$project$Game$Tile,
	'Retting Room',
	$author$project$Game$Blue,
	$author$project$Game$Rock,
	3,
	'assets/img/equipments/lavorare_il_lino.jpg',
	A2($author$project$Resources$priceStone, 1, $author$project$Resources$priceFree),
	A4($author$project$Game$Walls, $author$project$Game$Placed, $author$project$Game$Optional, $author$project$Game$None, $author$project$Game$Placed),
	_List_Nil);
var $author$project$Tiles$tileRinnovare = A8(
	$author$project$Game$Tile,
	'Rinnovare',
	$author$project$Game$Gray,
	$author$project$Game$Rock,
	11,
	'assets/img/rounds/rinnovare.jpg',
	$author$project$Resources$priceFree,
	$author$project$Walls$noWalls,
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$topAction,
			A3(
				$author$project$Resources$require,
				function ($) {
					return $.availableWalls;
				},
				$elm$core$Basics$gt,
				0),
			function (r) {
				return r;
			},
			_List_fromArray(
				[$author$project$Game$BuildWall]),
			_List_fromArray(
				[0])),
			A4(
			$author$project$Tiles$bottomAction,
			$author$project$Resources$alwaysDoable,
			function (r) {
				return r;
			},
			_List_fromArray(
				[$author$project$Game$Furnish]),
			_List_fromArray(
				[1]))
		]));
var $author$project$Tiles$topRightAction = F4(
	function (isDoable, _do, subphase, disableActions) {
		return A6($author$project$Game$Action, 'topright', true, isDoable, _do, subphase, disableActions);
	});
var $author$project$Tiles$tileScavare = A8(
	$author$project$Game$Tile,
	'Scavare',
	$author$project$Game$Gray,
	$author$project$Game$Available,
	4,
	'assets/img/rounds/scavare.jpg',
	$author$project$Resources$priceFree,
	$author$project$Walls$noWalls,
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$topLeftAction,
			$author$project$Resources$alwaysDoable,
			function (r) {
				return r;
			},
			_List_fromArray(
				[$author$project$Game$Excavate]),
			_List_fromArray(
				[0, 1])),
			A4(
			$author$project$Tiles$topRightAction,
			A3(
				$author$project$Resources$require,
				function ($) {
					return $.food;
				},
				$elm$core$Basics$ge,
				2),
			$author$project$Resources$addFood(-2),
			_List_fromArray(
				[$author$project$Game$Excavate, $author$project$Game$Excavate]),
			_List_fromArray(
				[0, 1])),
			A4(
			$author$project$Tiles$bottomAction,
			$author$project$Resources$alwaysDoable,
			$author$project$Resources$addStone(1),
			_List_Nil,
			_List_fromArray(
				[2]))
		]));
var $author$project$Tiles$tileSottobosco = A8(
	$author$project$Game$Tile,
	'Sottobosco',
	$author$project$Game$Gray,
	$author$project$Game$Available,
	1,
	'assets/img/rounds/sottobosco.jpg',
	$author$project$Resources$priceFree,
	$author$project$Walls$noWalls,
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$topAction,
			$author$project$Resources$alwaysDoable,
			function (r) {
				return r;
			},
			_List_fromArray(
				[$author$project$Game$Activate]),
			_List_fromArray(
				[0])),
			A4(
			$author$project$Tiles$bottomAction,
			$author$project$Resources$alwaysDoable,
			$author$project$Resources$addWood(2),
			_List_Nil,
			_List_fromArray(
				[1]))
		]));
var $author$project$Tiles$tileSpedizione = A8(
	$author$project$Game$Tile,
	'Spedizione',
	$author$project$Game$Gray,
	$author$project$Game$Available,
	9,
	'assets/img/rounds/spedizione.jpg',
	$author$project$Resources$priceFree,
	$author$project$Walls$noWalls,
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$firstAction,
			A3(
				$author$project$Resources$require,
				function ($) {
					return $.wood;
				},
				$elm$core$Basics$ge,
				5),
			function (r) {
				return A2(
					$author$project$Resources$addGold,
					5,
					A2($author$project$Resources$addWood, -5, r));
			},
			_List_Nil,
			_List_fromArray(
				[0, 1, 2])),
			A4(
			$author$project$Tiles$secondAction,
			A3(
				$author$project$Resources$require,
				function ($) {
					return $.stone;
				},
				$elm$core$Basics$ge,
				5),
			function (r) {
				return A2(
					$author$project$Resources$addGold,
					5,
					A2($author$project$Resources$addStone, -5, r));
			},
			_List_Nil,
			_List_fromArray(
				[0, 1, 2])),
			A4(
			$author$project$Tiles$rightAction,
			$author$project$Resources$alwaysDoable,
			function (r) {
				return r;
			},
			_List_fromArray(
				[$author$project$Game$Activate, $author$project$Game$Activate, $author$project$Game$Activate]),
			_List_fromArray(
				[0, 1, 2]))
		]));
var $author$project$Game$ChooseResource = {$: 'ChooseResource'};
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $author$project$Resources$atLeastThreeResources = function (resources) {
	return 3 <= $elm$core$List$length(
		A2(
			$elm$core$List$filter,
			function (qty) {
				return qty > 0;
			},
			_List_fromArray(
				[resources.wood, resources.emmer, resources.gold, resources.food, resources.flax, resources.stone])));
};
var $author$project$Tiles$tileStanzaDiSnodo = A8(
	$author$project$Game$Tile,
	'Stanza di Snodo',
	$author$project$Game$Orange,
	$author$project$Game$Rock,
	6,
	'assets/img/rooms/stanza_di_snodo.jpg',
	A2($author$project$Resources$priceWood, 2, $author$project$Resources$priceFree),
	A4($author$project$Game$Walls, $author$project$Game$None, $author$project$Game$Placed, $author$project$Game$None, $author$project$Game$Placed),
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$fullAction,
			$author$project$Resources$atLeastThreeResources,
			function (res) {
				return A2($author$project$Resources$addGold, 2, res);
			},
			_List_fromArray(
				[$author$project$Game$ChooseResource, $author$project$Game$ChooseResource, $author$project$Game$ChooseResource]),
			_List_fromArray(
				[0]))
		]));
var $author$project$Tiles$tileTesoreria = A8(
	$author$project$Game$Tile,
	'Tesoreria',
	$author$project$Game$Orange,
	$author$project$Game$Rock,
	10,
	'assets/img/rooms/tesoreria.jpg',
	A2($author$project$Resources$priceGold, 3, $author$project$Resources$priceFree),
	A4($author$project$Game$Walls, $author$project$Game$Placed, $author$project$Game$Placed, $author$project$Game$Placed, $author$project$Game$Placed),
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$fullAction,
			A3(
				$author$project$Resources$require,
				function ($) {
					return $.gold;
				},
				$elm$core$Basics$ge,
				3),
			function (res) {
				return A2(
					$author$project$Resources$addFood,
					1,
					A2(
						$author$project$Resources$addGold,
						4,
						A2($author$project$Resources$addGold, -3, res)));
			},
			_List_Nil,
			_List_fromArray(
				[0]))
		]));
var $author$project$Tiles$tileWarehouse = A8(
	$author$project$Game$Tile,
	'Magazzino',
	$author$project$Game$Orange,
	$author$project$Game$Rock,
	2,
	'assets/img/rooms/magazzino.jpg',
	A2($author$project$Resources$priceWood, 2, $author$project$Resources$priceFree),
	A4($author$project$Game$Walls, $author$project$Game$Placed, $author$project$Game$Optional, $author$project$Game$None, $author$project$Game$Optional),
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$fullAction,
			A3(
				$author$project$Resources$require,
				function ($) {
					return $.food;
				},
				$elm$core$Basics$ge,
				2),
			function (res) {
				return A2(
					$author$project$Resources$addEmmer,
					1,
					A2(
						$author$project$Resources$addFlax,
						1,
						A2(
							$author$project$Resources$addStone,
							1,
							A2(
								$author$project$Resources$addWood,
								1,
								A2($author$project$Resources$addFood, -2, res)))));
			},
			_List_Nil,
			_List_fromArray(
				[0]))
		]));
var $author$project$Tiles$tileWoodStoreroom = A8(
	$author$project$Game$Tile,
	'Wood Storeroom',
	$author$project$Game$Blue,
	$author$project$Game$Rock,
	2,
	'assets/img/equipments/deposito_di_legna.jpg',
	A2($author$project$Resources$priceStone, 1, $author$project$Resources$priceFree),
	A4($author$project$Game$Walls, $author$project$Game$Placed, $author$project$Game$None, $author$project$Game$None, $author$project$Game$Placed),
	_List_Nil);
var $author$project$Tiles$initRandomTiles = A5(
	$author$project$Tiles$setupRandomTiles,
	_List_fromArray(
		[$author$project$Tiles$tileWarehouse, $author$project$Tiles$tileAltareSacrificale, $author$project$Tiles$tileBancarella, $author$project$Tiles$tileCameraSegreta, $author$project$Tiles$tileCavaInEspansione, $author$project$Tiles$tileDeposito, $author$project$Tiles$tileFiliera, $author$project$Tiles$tileForno, $author$project$Tiles$tileGoldMine, $author$project$Tiles$tileOfficina, $author$project$Tiles$tileLuxuryRoom, $author$project$Tiles$tileStanzaDiSnodo, $author$project$Tiles$tileTesoreria, $author$project$Tiles$tileProspectingSite, $author$project$Tiles$tileDungeon, $author$project$Tiles$tileEquipmentRoom, $author$project$Tiles$tileRettingRoom, $author$project$Tiles$tileWoodStoreroom]),
	_List_fromArray(
		[$author$project$Tiles$tileLavoriDomestici, $author$project$Tiles$tileColtivare, $author$project$Tiles$tileSottobosco, $author$project$Tiles$tileScavare]),
	_List_fromArray(
		[$author$project$Tiles$tileArredare, $author$project$Tiles$tileCostruireUnMuro, $author$project$Tiles$tileMinare]),
	_List_fromArray(
		[$author$project$Tiles$tileDemolireUnMuro, $author$project$Tiles$tileEspansione, $author$project$Tiles$tileSpedizione, $author$project$Tiles$tilePerforare]),
	_List_fromArray(
		[$author$project$Tiles$tileRinnovare]));
var $author$project$Game$PlayerBoard = F6(
	function (resources, freeAction, rooms, walls, actionTiles, active) {
		return {actionTiles: actionTiles, active: active, freeAction: freeAction, resources: resources, rooms: rooms, walls: walls};
	});
var $elm$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			$elm$core$Array$initialize,
			n,
			function (_v0) {
				return e;
			});
	});
var $author$project$Game$Active = {$: 'Active'};
var $author$project$Tiles$tileFreeAction = A8(
	$author$project$Game$Tile,
	'Free Action',
	$author$project$Game$Gray,
	$author$project$Game$Active,
	0,
	'none',
	$author$project$Resources$priceFree,
	$author$project$Walls$noWalls,
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$firstAction,
			A3(
				$author$project$Resources$require,
				function ($) {
					return $.emmer;
				},
				$elm$core$Basics$gt,
				0),
			function (r) {
				return A2(
					$author$project$Resources$addEmmer,
					-1,
					A2($author$project$Resources$addFood, 1, r));
			},
			_List_Nil,
			_List_Nil),
			A4(
			$author$project$Tiles$secondAction,
			A3(
				$author$project$Resources$require,
				function ($) {
					return $.flax;
				},
				$elm$core$Basics$gt,
				0),
			function (r) {
				return A2(
					$author$project$Resources$addFlax,
					-1,
					A2($author$project$Resources$addFood, 1, r));
			},
			_List_Nil,
			_List_Nil),
			A4(
			$author$project$Tiles$thirdAction,
			A3(
				$author$project$Resources$require,
				function ($) {
					return $.gold;
				},
				$elm$core$Basics$gt,
				0),
			function (r) {
				return A2(
					$author$project$Resources$addGold,
					-1,
					A2($author$project$Resources$addFood, 1, r));
			},
			_List_Nil,
			_List_Nil)
		]));
var $author$project$PlayerBoard$newBoard = function (active) {
	return A6(
		$author$project$Game$PlayerBoard,
		A9($author$project$Game$Resources, 1, 1, 1, 1, 1, 1, 1, 7, 0),
		$author$project$Tiles$tileFreeAction,
		_List_Nil,
		A2($elm$core$Array$repeat, 14, $author$project$Game$None),
		_List_Nil,
		active);
};
var $author$project$Main$init = function (_v0) {
	return _Utils_Tuple2(
		A8(
			$author$project$Game$Game,
			$author$project$PlayerBoard$newBoard(true),
			$author$project$PlayerBoard$newBoard(false),
			1,
			2,
			_List_Nil,
			$author$project$Tiles$initCommonRooms,
			7,
			_List_fromArray(
				[$author$project$Game$NewActionPhase])),
		$author$project$Tiles$initRandomTiles);
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $author$project$Game$AddToAvailableRooms = function (a) {
	return {$: 'AddToAvailableRooms', a: a};
};
var $author$project$Game$PlaceRoom = function (a) {
	return {$: 'PlaceRoom', a: a};
};
var $author$project$Game$RemoveFromAvailableRooms = function (a) {
	return {$: 'RemoveFromAvailableRooms', a: a};
};
var $author$project$Game$WallBuilt = {$: 'WallBuilt'};
var $author$project$Game$WallDestroyed = {$: 'WallDestroyed'};
var $author$project$Tiles$updateStatus = F3(
	function (tile, status, tiles) {
		return A2(
			$elm$core$List$map,
			function (t) {
				return _Utils_eq(t.title, tile.title) ? _Utils_update(
					t,
					{status: status}) : t;
			},
			tiles);
	});
var $author$project$PlayerBoard$activateRoom = F2(
	function (tile, player) {
		return _Utils_update(
			player,
			{
				rooms: A3($author$project$Tiles$updateStatus, tile, $author$project$Game$Active, player.rooms)
			});
	});
var $author$project$Main$addToAvailableRooms = F2(
	function (tile, game) {
		return _Utils_update(
			game,
			{
				availableRooms: _Utils_ap(
					game.availableRooms,
					_List_fromArray(
						[
							_Utils_update(
							tile,
							{status: $author$project$Game$Available})
						]))
			});
	});
var $author$project$PlayerBoard$playerHasEquipment = F2(
	function (player, tile) {
		return 0 < $elm$core$List$length(
			A2(
				$elm$core$List$filter,
				function (t) {
					return _Utils_eq(t.title, tile.title);
				},
				A2(
					$elm$core$List$filter,
					function (t) {
						return _Utils_eq(t.status, $author$project$Game$Available);
					},
					player.rooms)));
	});
var $author$project$PlayerBoard$applyDungeon = function (player) {
	return A2($author$project$PlayerBoard$playerHasEquipment, player, $author$project$Tiles$tileDungeon) ? _Utils_update(
		player,
		{
			resources: A2($author$project$Resources$addGold, 2, player.resources)
		}) : player;
};
var $author$project$PlayerBoard$applyEquipmentRoom = F2(
	function (subphase, player) {
		var activateCount = $elm$core$List$length(
			A2(
				$elm$core$List$filter,
				$elm$core$Basics$eq($author$project$Game$Activate),
				subphase));
		return (((activateCount === 2) || (activateCount === 3)) && A2($author$project$PlayerBoard$playerHasEquipment, player, $author$project$Tiles$tileEquipmentRoom)) ? A2($elm$core$List$cons, $author$project$Game$Activate, subphase) : subphase;
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$PlayerBoard$applyWoodStoreroom = F2(
	function (phases, player) {
		return (($elm$core$List$length(phases) === 1) && (_Utils_eq(
			$elm$core$List$head(phases),
			$elm$core$Maybe$Just($author$project$Game$Activate)) && A2($author$project$PlayerBoard$playerHasEquipment, player, $author$project$Tiles$tileWoodStoreroom))) ? _Utils_update(
			player,
			{
				resources: A2($author$project$Resources$addFood, 1, player.resources)
			}) : player;
	});
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var $elm$core$Array$setHelp = F4(
	function (shift, index, value, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
		if (_v0.$ === 'SubTree') {
			var subTree = _v0.a;
			var newSub = A4($elm$core$Array$setHelp, shift - $elm$core$Array$shiftStep, index, value, subTree);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$SubTree(newSub),
				tree);
		} else {
			var values = _v0.a;
			var newLeaf = A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, values);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$Leaf(newLeaf),
				tree);
		}
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$set = F3(
	function (index, value, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? array : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			tree,
			A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, tail)) : A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A4($elm$core$Array$setHelp, startShift, index, value, tree),
			tail));
	});
var $author$project$Game$Empty = {$: 'Empty'};
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_v0.$ === 'SubTree') {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $author$project$Walls$get = F2(
	function (index, walls) {
		var _v0 = A2($elm$core$Array$get, index, walls);
		if (_v0.$ === 'Just') {
			var wall = _v0.a;
			return wall;
		} else {
			return $author$project$Game$Optional;
		}
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $author$project$Tiles$updateTileWalls = F3(
	function (walls, index, tile) {
		if (!_Utils_eq(tile.status, $author$project$Game$Empty)) {
			return tile;
		} else {
			switch (index) {
				case 0:
					return _Utils_update(
						tile,
						{
							walls: A4(
								$author$project$Game$Walls,
								$author$project$Game$Placed,
								A2($author$project$Walls$get, 0, walls),
								A2($author$project$Walls$get, 1, walls),
								$author$project$Game$Placed)
						});
				case 1:
					return _Utils_update(
						tile,
						{
							walls: A4(
								$author$project$Game$Walls,
								$author$project$Game$Placed,
								$author$project$Game$Placed,
								A2($author$project$Walls$get, 2, walls),
								A2($author$project$Walls$get, 0, walls))
						});
				case 2:
					return _Utils_update(
						tile,
						{
							walls: A4(
								$author$project$Game$Walls,
								A2($author$project$Walls$get, 1, walls),
								A2($author$project$Walls$get, 3, walls),
								A2($author$project$Walls$get, 4, walls),
								$author$project$Game$Placed)
						});
				case 3:
					return _Utils_update(
						tile,
						{
							walls: A4(
								$author$project$Game$Walls,
								A2($author$project$Walls$get, 2, walls),
								$author$project$Game$Placed,
								A2($author$project$Walls$get, 5, walls),
								A2($author$project$Walls$get, 3, walls))
						});
				case 4:
					return _Utils_update(
						tile,
						{
							walls: A4(
								$author$project$Game$Walls,
								A2($author$project$Walls$get, 4, walls),
								A2($author$project$Walls$get, 6, walls),
								A2($author$project$Walls$get, 7, walls),
								$author$project$Game$Placed)
						});
				case 5:
					return _Utils_update(
						tile,
						{
							walls: A4(
								$author$project$Game$Walls,
								A2($author$project$Walls$get, 5, walls),
								$author$project$Game$Placed,
								A2($author$project$Walls$get, 8, walls),
								A2($author$project$Walls$get, 6, walls))
						});
				case 6:
					return _Utils_update(
						tile,
						{
							walls: A4(
								$author$project$Game$Walls,
								A2($author$project$Walls$get, 7, walls),
								A2($author$project$Walls$get, 9, walls),
								A2($author$project$Walls$get, 10, walls),
								$author$project$Game$Placed)
						});
				case 7:
					return _Utils_update(
						tile,
						{
							walls: A4(
								$author$project$Game$Walls,
								A2($author$project$Walls$get, 8, walls),
								$author$project$Game$Placed,
								A2($author$project$Walls$get, 9, walls),
								A2($author$project$Walls$get, 11, walls))
						});
				case 8:
					return _Utils_update(
						tile,
						{
							walls: A4(
								$author$project$Game$Walls,
								A2($author$project$Walls$get, 10, walls),
								A2($author$project$Walls$get, 12, walls),
								$author$project$Game$Placed,
								$author$project$Game$Placed)
						});
				case 9:
					return _Utils_update(
						tile,
						{
							walls: A4(
								$author$project$Game$Walls,
								A2($author$project$Walls$get, 11, walls),
								A2($author$project$Walls$get, 13, walls),
								$author$project$Game$Placed,
								A2($author$project$Walls$get, 12, walls))
						});
				case 10:
					return _Utils_update(
						tile,
						{
							walls: A4(
								$author$project$Game$Walls,
								$author$project$Game$Placed,
								$author$project$Game$Placed,
								$author$project$Game$Placed,
								A2($author$project$Walls$get, 13, walls))
						});
				default:
					return tile;
			}
		}
	});
var $author$project$Tiles$updateWalls = F2(
	function (walls, tiles) {
		return A2(
			$elm$core$List$indexedMap,
			$author$project$Tiles$updateTileWalls(walls),
			tiles);
	});
var $author$project$PlayerBoard$buildWall = F2(
	function (wallIndex, player) {
		var walls = A3($elm$core$Array$set, wallIndex, $author$project$Game$Placed, player.walls);
		return _Utils_update(
			player,
			{
				rooms: A2($author$project$Tiles$updateWalls, walls, player.rooms),
				walls: walls
			});
	});
var $author$project$PlayerBoard$chooseResource = F2(
	function (updateResources, player) {
		return _Utils_update(
			player,
			{
				resources: updateResources(player.resources)
			});
	});
var $author$project$PlayerBoard$destroyWall = F2(
	function (wallIndex, player) {
		var walls = A3($elm$core$Array$set, wallIndex, $author$project$Game$None, player.walls);
		return _Utils_update(
			player,
			{
				rooms: A2($author$project$Tiles$updateWalls, walls, player.rooms),
				walls: walls
			});
	});
var $author$project$PlayerBoard$applyRettingRoom = F2(
	function (player, newResources) {
		var flaxGain = newResources.flax - player.resources.flax;
		return (((flaxGain >= 1) && (flaxGain <= 3)) && A2($author$project$PlayerBoard$playerHasEquipment, player, $author$project$Tiles$tileRettingRoom)) ? A2($author$project$Resources$addFood, 1, newResources) : newResources;
	});
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $author$project$Tiles$consumeAction = F2(
	function (tile, action) {
		return _Utils_update(
			tile,
			{
				actions: A2(
					$elm$core$List$indexedMap,
					function (index) {
						return function (a) {
							return A2($elm$core$List$member, index, action.disableActions) ? _Utils_update(
								a,
								{available: false}) : a;
						};
					},
					tile.actions)
			});
	});
var $author$project$PlayerBoard$updateTile = F2(
	function (tile, tiles) {
		return A2(
			$elm$core$List$map,
			function (r) {
				return _Utils_eq(r.title, tile.title) ? tile : r;
			},
			tiles);
	});
var $author$project$PlayerBoard$doAction = F3(
	function (tile, action, player) {
		var consumedTile = A2($author$project$Tiles$consumeAction, tile, action);
		return _Utils_update(
			player,
			{
				actionTiles: A2($author$project$PlayerBoard$updateTile, consumedTile, player.actionTiles),
				resources: A2(
					$author$project$PlayerBoard$applyRettingRoom,
					player,
					action._do(player.resources)),
				rooms: A2($author$project$PlayerBoard$updateTile, consumedTile, player.rooms)
			});
	});
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$PlayerBoard$indexOf = F2(
	function (tile, tiles) {
		return A2(
			$elm$core$Maybe$withDefault,
			_Utils_Tuple2(0, tile),
			$elm$core$List$head(
				A2(
					$elm$core$List$filter,
					function (tp) {
						return _Utils_eq(tp.b.title, tile.title);
					},
					A2($elm$core$List$indexedMap, $elm$core$Tuple$pair, tiles)))).a;
	});
var $author$project$PlayerBoard$addFoodForBonusRooms = F2(
	function (player, tile) {
		var resources = player.resources;
		var roomIndex = A2($author$project$PlayerBoard$indexOf, tile, player.rooms);
		return ((roomIndex === 3) || (roomIndex === 7)) ? A2($author$project$Resources$addFood, 1, player.resources) : player.resources;
	});
var $author$project$PlayerBoard$escavateRoom = F2(
	function (tile, player) {
		return _Utils_update(
			player,
			{
				resources: A2($author$project$PlayerBoard$addFoodForBonusRooms, player, tile),
				rooms: A2(
					$author$project$Tiles$updateWalls,
					player.walls,
					A3($author$project$Tiles$updateStatus, tile, $author$project$Game$Empty, player.rooms))
			});
	});
var $author$project$Main$getCurrentPlayer = function (game) {
	return game.player1.active ? game.player1 : game.player2;
};
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $author$project$Tiles$tileCaveEntrance = A8(
	$author$project$Game$Tile,
	'Entrata della Cava',
	$author$project$Game$Orange,
	$author$project$Game$Available,
	0,
	'assets/img/rooms/entrata_della_cava.jpg',
	$author$project$Resources$priceFree,
	$author$project$Walls$noWalls,
	_List_fromArray(
		[
			A4(
			$author$project$Tiles$firstAction,
			$author$project$Resources$alwaysDoable,
			$author$project$Resources$addWood(1),
			_List_Nil,
			_List_fromArray(
				[0, 1, 2, 3])),
			A4(
			$author$project$Tiles$secondAction,
			$author$project$Resources$alwaysDoable,
			$author$project$Resources$addStone(1),
			_List_Nil,
			_List_fromArray(
				[0, 1, 2, 3])),
			A4(
			$author$project$Tiles$thirdAction,
			$author$project$Resources$alwaysDoable,
			$author$project$Resources$addEmmer(1),
			_List_Nil,
			_List_fromArray(
				[0, 1, 2, 3])),
			A4(
			$author$project$Tiles$fourthAction,
			$author$project$Resources$alwaysDoable,
			$author$project$Resources$addFlax(1),
			_List_Nil,
			_List_fromArray(
				[0, 1, 2, 3]))
		]));
var $author$project$Tiles$tileEmpty = A8(
	$author$project$Game$Tile,
	'Empty Tile',
	$author$project$Game$Gray,
	$author$project$Game$Empty,
	0,
	'',
	$author$project$Resources$priceFree,
	A4($author$project$Game$Walls, $author$project$Game$None, $author$project$Game$None, $author$project$Game$None, $author$project$Game$Placed),
	_List_Nil);
var $author$project$PlayerBoard$init = function (rooms) {
	return _Utils_ap(
		A2($elm$core$List$take, 4, rooms),
		_Utils_ap(
			_List_fromArray(
				[$author$project$Tiles$tileEmpty]),
			_Utils_ap(
				A2(
					$elm$core$List$take,
					1,
					A2($elm$core$List$drop, 4, rooms)),
				_Utils_ap(
					_List_fromArray(
						[$author$project$Tiles$tileCaveEntrance]),
					A2($elm$core$List$drop, 5, rooms)))));
};
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Main$opponentPlayer = function (game) {
	return game.player1.active ? game.player2 : game.player1;
};
var $author$project$PlayerBoard$restoreTile = function (room) {
	return _Utils_eq(room.status, $author$project$Game$Active) ? _Utils_update(
		room,
		{
			actions: A2(
				$elm$core$List$map,
				function (a) {
					return _Utils_update(
						a,
						{available: true});
				},
				room.actions),
			status: $author$project$Game$Available
		}) : room;
};
var $author$project$Main$setCurrentPlayer = F2(
	function (player, game) {
		return game.player1.active ? _Utils_update(
			game,
			{player1: player}) : _Utils_update(
			game,
			{player2: player});
	});
var $author$project$Tiles$setStatus = F2(
	function (status, tile) {
		return _Utils_update(
			tile,
			{status: status});
	});
var $author$project$Resources$updateOpponentsGold = F2(
	function (qty, resources) {
		return _Utils_update(
			resources,
			{opponentsGold: qty});
	});
var $author$project$Main$activatePlayer = function (game) {
	var player = $author$project$Main$getCurrentPlayer(game);
	var opponent = $author$project$Main$opponentPlayer(game);
	return A2(
		$author$project$Main$setCurrentPlayer,
		_Utils_update(
			player,
			{
				freeAction: A2(
					$author$project$Tiles$setStatus,
					$author$project$Game$Active,
					$author$project$PlayerBoard$restoreTile(player.freeAction)),
				resources: A2($author$project$Resources$updateOpponentsGold, opponent.resources.gold, player.resources)
			}),
		game);
};
var $elm$core$Basics$not = _Basics_not;
var $author$project$Main$nextPlayer = function (game) {
	var player1 = game.player1;
	var player2 = game.player2;
	return _Utils_update(
		game,
		{
			player1: _Utils_update(
				player1,
				{active: !player1.active}),
			player2: _Utils_update(
				player2,
				{active: !player2.active}),
			stack: _List_fromArray(
				[$author$project$Game$NewActionPhase])
		});
};
var $author$project$PlayerBoard$restorePlayerNextRound = F2(
	function (player, round) {
		var resources = player.resources;
		return _Utils_update(
			player,
			{
				actionTiles: _List_Nil,
				resources: _Utils_update(
					resources,
					{actions: round}),
				rooms: A2($elm$core$List$map, $author$project$PlayerBoard$restoreTile, player.rooms)
			});
	});
var $author$project$Main$nextRound = function (game) {
	var round = game.round + 1;
	var actions = (round < 4) ? 2 : ((round < 8) ? 3 : 4);
	var actionTiles = A2(
		$elm$core$List$indexedMap,
		function (i) {
			return function (r) {
				return (_Utils_cmp(i, round + 3) < 1) ? _Utils_update(
					r,
					{status: $author$project$Game$Available}) : r;
			};
		},
		game.actionTiles);
	return _Utils_update(
		game,
		{
			actionTiles: actionTiles,
			actions: actions,
			player1: A2($author$project$PlayerBoard$restorePlayerNextRound, game.player1, actions),
			player2: A2($author$project$PlayerBoard$restorePlayerNextRound, game.player2, actions),
			round: round,
			stack: _List_fromArray(
				[$author$project$Game$NewActionPhase])
		});
};
var $author$project$PlayerBoard$restorePlayerPass = function (board) {
	return _Utils_update(
		board,
		{
			actionTiles: A2(
				$elm$core$List$map,
				function (t) {
					return _Utils_update(
						t,
						{status: $author$project$Game$Available});
				},
				board.actionTiles),
			freeAction: A2($author$project$Tiles$setStatus, $author$project$Game$Available, board.freeAction),
			rooms: A2($elm$core$List$map, $author$project$PlayerBoard$restoreTile, board.rooms)
		});
};
var $author$project$Main$pass = function (game) {
	return (_Utils_eq(
		$elm$core$List$length(game.player1.actionTiles),
		game.actions) && _Utils_eq(
		$elm$core$List$length(game.player2.actionTiles),
		game.actions)) ? $author$project$Main$nextRound(game) : $author$project$Main$activatePlayer(
		$author$project$Main$nextPlayer(
			A2(
				$author$project$Main$setCurrentPlayer,
				$author$project$PlayerBoard$restorePlayerPass(
					$author$project$Main$getCurrentPlayer(game)),
				game)));
};
var $author$project$Game$ActionPhase = {$: 'ActionPhase'};
var $author$project$Main$activateProspectingSite = F3(
	function (player, tile, game) {
		return (_Utils_eq(tile.title, $author$project$Tiles$tileSottobosco.title) && A2($author$project$PlayerBoard$playerHasEquipment, player, $author$project$Tiles$tileProspectingSite)) ? A2(
			$author$project$Main$setCurrentPlayer,
			A2($author$project$PlayerBoard$activateRoom, $author$project$Tiles$tileProspectingSite, player),
			game) : game;
	});
var $author$project$Stack$push = F2(
	function (a, stack) {
		return A2($elm$core$List$cons, a, stack);
	});
var $author$project$Main$pickActionTile = F3(
	function (game, activePlayer, tile) {
		var player = _Utils_update(
			activePlayer,
			{
				actionTiles: A2(
					$elm$core$List$cons,
					_Utils_update(
						tile,
						{status: $author$project$Game$Active}),
					activePlayer.actionTiles)
			});
		return A3(
			$author$project$Main$activateProspectingSite,
			player,
			tile,
			A2(
				$author$project$Main$setCurrentPlayer,
				player,
				_Utils_update(
					game,
					{
						actionTiles: A3($author$project$Tiles$updateStatus, tile, $author$project$Game$Empty, game.actionTiles),
						stack: A2($author$project$Stack$push, $author$project$Game$ActionPhase, game.stack)
					})));
	});
var $author$project$PlayerBoard$payRoom = F2(
	function (price, resources) {
		return _Utils_update(
			resources,
			{emmer: resources.emmer - price.emmer, flax: resources.flax - price.flax, food: resources.food - price.food, gold: resources.gold - price.gold, stone: resources.stone - price.stone, wood: resources.wood - price.wood});
	});
var $author$project$PlayerBoard$placeRoom = F3(
	function (tile, tileToPlace, player) {
		return _Utils_update(
			player,
			{
				resources: A2($author$project$PlayerBoard$payRoom, tileToPlace.price, player.resources),
				rooms: A2(
					$elm$core$List$map,
					function (r) {
						return _Utils_eq(r.title, tile.title) ? tileToPlace : r;
					},
					player.rooms)
			});
	});
var $author$project$Stack$pop = function (stack) {
	return A2($elm$core$List$drop, 1, stack);
};
var $author$project$Main$popFromPhase = function (game) {
	return _Utils_update(
		game,
		{
			stack: $author$project$Stack$pop(game.stack)
		});
};
var $author$project$Stack$pushAll = F2(
	function (list, stack) {
		return _Utils_ap(list, stack);
	});
var $author$project$Main$pushToPhase = F2(
	function (subphase, game) {
		return _Utils_update(
			game,
			{
				stack: A2($author$project$Stack$pushAll, subphase, game.stack)
			});
	});
var $author$project$Main$removeFromAvailableRooms = F2(
	function (tile, game) {
		return _Utils_update(
			game,
			{
				availableRooms: A2(
					$elm$core$List$filter,
					function (r) {
						return !_Utils_eq(r.title, tile.title);
					},
					game.availableRooms)
			});
	});
var $author$project$Main$setCurrentPlayer2 = F2(
	function (player, game) {
		return A2($author$project$Main$setCurrentPlayer, game, player);
	});
var $author$project$Main$swap = function (_v0) {
	var a = _v0.a;
	var b = _v0.b;
	return _Utils_Tuple2(b, a);
};
var $author$project$Stack$top = function (stack) {
	return $elm$core$List$head(stack);
};
var $author$project$Main$updateAvailableWallsResource = F2(
	function (qty, player) {
		var resources = player.resources;
		return _Utils_update(
			player,
			{
				resources: _Utils_update(
					resources,
					{availableWalls: resources.availableWalls + qty})
			});
	});
var $author$project$Main$updateAvailableWalls = F2(
	function (qty, game) {
		var player1 = game.player1;
		var player2 = game.player2;
		return _Utils_update(
			game,
			{
				availableWalls: game.availableWalls + qty,
				player1: A2($author$project$Main$updateAvailableWallsResource, qty, player1),
				player2: A2($author$project$Main$updateAvailableWallsResource, qty, player2)
			});
	});
var $author$project$Main$update = F2(
	function (msg, game) {
		var player1 = game.player1;
		var player2 = game.player2;
		var activePlayer = $author$project$Main$getCurrentPlayer(game);
		switch (msg.$) {
			case 'InitRoundTiles':
				var tiles = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						game,
						{
							actionTiles: A2(
								$elm$core$List$indexedMap,
								function (i) {
									return function (t) {
										return (i < 5) ? _Utils_update(
											t,
											{status: $author$project$Game$Available}) : t;
									};
								},
								_Utils_ap(game.actionTiles, tiles))
						}),
					$elm$core$Platform$Cmd$none);
			case 'InitPlayerBoard':
				var rooms = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						game,
						{
							player1: _Utils_update(
								player1,
								{
									freeAction: A2($author$project$Tiles$setStatus, $author$project$Game$Active, player1.freeAction),
									rooms: $author$project$PlayerBoard$init(
										A2($elm$core$List$take, 9, rooms))
								}),
							player2: _Utils_update(
								player2,
								{
									freeAction: A2($author$project$Tiles$setStatus, $author$project$Game$Available, player1.freeAction),
									rooms: $author$project$PlayerBoard$init(
										A2(
											$elm$core$List$take,
											9,
											A2($elm$core$List$drop, 9, rooms)))
								})
						}),
					$elm$core$Platform$Cmd$none);
			case 'AddToAvailableRooms':
				var tile = msg.a;
				return _Utils_Tuple2(
					A2($author$project$Main$addToAvailableRooms, tile, game),
					$elm$core$Platform$Cmd$none);
			case 'RemoveFromAvailableRooms':
				var tile = msg.a;
				return _Utils_Tuple2(
					A2($author$project$Main$removeFromAvailableRooms, tile, game),
					$elm$core$Platform$Cmd$none);
			case 'WallBuilt':
				return $author$project$Main$swap(
					A2(
						$elm$core$Tuple$pair,
						$elm$core$Platform$Cmd$none,
						A2(
							$author$project$Main$updateAvailableWalls,
							-1,
							A2(
								$author$project$Main$setCurrentPlayer2,
								game,
								$author$project$PlayerBoard$applyDungeon(
									$author$project$Main$getCurrentPlayer(game))))));
			case 'WallDestroyed':
				return _Utils_Tuple2(
					A2($author$project$Main$updateAvailableWalls, 1, game),
					$elm$core$Platform$Cmd$none);
			case 'Pass':
				return _Utils_Tuple2(
					$author$project$Main$pass(game),
					$elm$core$Platform$Cmd$none);
			case 'PickRoundTile':
				var tile = msg.a;
				return _Utils_Tuple2(
					A3($author$project$Main$pickActionTile, game, activePlayer, tile),
					$elm$core$Platform$Cmd$none);
			case 'DoAction':
				var tile = msg.a;
				var action = msg.b;
				return $author$project$Main$swap(
					A2(
						$elm$core$Tuple$pair,
						$elm$core$Platform$Cmd$none,
						A2(
							$author$project$Main$pushToPhase,
							A2(
								$author$project$PlayerBoard$applyEquipmentRoom,
								action.subphase,
								$author$project$Main$getCurrentPlayer(game)),
							A2(
								$author$project$Main$setCurrentPlayer2,
								game,
								A2(
									$author$project$PlayerBoard$applyWoodStoreroom,
									action.subphase,
									A3(
										$author$project$PlayerBoard$doAction,
										tile,
										action,
										$author$project$Main$getCurrentPlayer(game)))))));
			case 'SelectWall':
				var index = msg.a;
				var _v1 = $author$project$Stack$top(game.stack);
				_v1$2:
				while (true) {
					if (_v1.$ === 'Just') {
						switch (_v1.a.$) {
							case 'BuildWall':
								var _v2 = _v1.a;
								return A2(
									$author$project$Main$update,
									$author$project$Game$WallBuilt,
									A2(
										$author$project$Main$setCurrentPlayer2,
										game,
										A2($author$project$PlayerBoard$buildWall, index, activePlayer)));
							case 'DestroyWall':
								var _v3 = _v1.a;
								return A2(
									$author$project$Main$update,
									$author$project$Game$WallDestroyed,
									A2(
										$author$project$Main$setCurrentPlayer2,
										game,
										A2($author$project$PlayerBoard$destroyWall, index, activePlayer)));
							default:
								break _v1$2;
						}
					} else {
						break _v1$2;
					}
				}
				return _Utils_Tuple2(game, $elm$core$Platform$Cmd$none);
			case 'SelectRoomTile':
				var tile = msg.a;
				var _v4 = $author$project$Stack$top(game.stack);
				_v4$5:
				while (true) {
					if (_v4.$ === 'Just') {
						switch (_v4.a.$) {
							case 'Furnish':
								var _v5 = _v4.a;
								return $author$project$Main$swap(
									A2(
										$elm$core$Tuple$pair,
										$elm$core$Platform$Cmd$none,
										A2(
											$author$project$Main$pushToPhase,
											_List_fromArray(
												[
													$author$project$Game$PlaceRoom(tile)
												]),
											$author$project$Main$popFromPhase(game))));
							case 'PlaceRoom':
								var tileToPlace = _v4.a.a;
								return A2(
									$author$project$Main$update,
									$author$project$Game$RemoveFromAvailableRooms(tileToPlace),
									$author$project$Main$popFromPhase(
										A2(
											$author$project$Main$setCurrentPlayer2,
											game,
											A3($author$project$PlayerBoard$placeRoom, tile, tileToPlace, activePlayer))));
							case 'ExcavateThroughWall':
								var _v6 = _v4.a;
								return A2(
									$author$project$Main$update,
									$author$project$Game$AddToAvailableRooms(tile),
									$author$project$Main$popFromPhase(
										A2(
											$author$project$Main$setCurrentPlayer2,
											game,
											A2($author$project$PlayerBoard$escavateRoom, tile, activePlayer))));
							case 'Excavate':
								var _v7 = _v4.a;
								return A2(
									$author$project$Main$update,
									$author$project$Game$AddToAvailableRooms(tile),
									$author$project$Main$popFromPhase(
										A2(
											$author$project$Main$setCurrentPlayer2,
											game,
											A2($author$project$PlayerBoard$escavateRoom, tile, activePlayer))));
							case 'Activate':
								var _v8 = _v4.a;
								return $author$project$Main$swap(
									A2(
										$elm$core$Tuple$pair,
										$elm$core$Platform$Cmd$none,
										$author$project$Main$popFromPhase(
											A2(
												$author$project$Main$setCurrentPlayer2,
												game,
												A2($author$project$PlayerBoard$activateRoom, tile, activePlayer)))));
							default:
								break _v4$5;
						}
					} else {
						break _v4$5;
					}
				}
				return _Utils_Tuple2(game, $elm$core$Platform$Cmd$none);
			default:
				var updateResources = msg.a;
				return $author$project$Main$swap(
					A2(
						$elm$core$Tuple$pair,
						$elm$core$Platform$Cmd$none,
						$author$project$Main$popFromPhase(
							A2(
								$author$project$Main$setCurrentPlayer2,
								game,
								A2(
									$author$project$PlayerBoard$chooseResource,
									updateResources,
									$author$project$Main$getCurrentPlayer(game))))));
		}
	});
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$div = _VirtualDom_node('div');
var $author$project$Game$PickRoundTile = function (a) {
	return {$: 'PickRoundTile', a: a};
};
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $author$project$Game$DoAction = F2(
	function (a, b) {
		return {$: 'DoAction', a: a, b: b};
	});
var $author$project$Tiles$viewAction = F3(
	function (tile, resources, action) {
		return (action.available && action.isDoable(resources)) ? A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('action doable ' + action.classes),
					$elm$html$Html$Events$onClick(
					A2($author$project$Game$DoAction, tile, action))
				]),
			_List_Nil) : A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('action notdoable ' + action.classes)
				]),
			_List_Nil);
	});
var $author$project$Tiles$viewTile = F3(
	function (attributes, resources, tile) {
		return A2(
			$elm$html$Html$div,
			attributes,
			_List_fromArray(
				[
					function () {
					var _v0 = tile.status;
					switch (_v0.$) {
						case 'Active':
							return A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'background-image', 'url(' + (tile.src + ')')),
										$elm$html$Html$Attributes$class('tile')
									]),
								A2(
									$elm$core$List$map,
									A2($author$project$Tiles$viewAction, tile, resources),
									tile.actions));
						case 'Available':
							return A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'background-image', 'url(' + (tile.src + ')')),
										$elm$html$Html$Attributes$class('tile')
									]),
								_List_Nil);
						case 'Empty':
							return A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('tile empty')
									]),
								_List_Nil);
						default:
							return A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('tile hidden')
									]),
								_List_Nil);
					}
				}()
				]));
	});
var $author$project$Main$viewActionTile = F2(
	function (game, tile) {
		return (_Utils_eq(
			$author$project$Stack$top(game.stack),
			$elm$core$Maybe$Just($author$project$Game$NewActionPhase)) && _Utils_eq(tile.status, $author$project$Game$Available)) ? A3(
			$author$project$Tiles$viewTile,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('actiontile pick'),
					$elm$html$Html$Events$onClick(
					$author$project$Game$PickRoundTile(tile))
				]),
			$author$project$Main$getCurrentPlayer(game).resources,
			tile) : A3(
			$author$project$Tiles$viewTile,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('actiontile')
				]),
			game.player1.resources,
			tile);
	});
var $author$project$Main$viewActionTiles = function (game) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('actiontiles')
			]),
		A2(
			$elm$core$List$map,
			$author$project$Main$viewActionTile(game),
			game.actionTiles));
};
var $author$project$Game$SelectRoomTile = function (a) {
	return {$: 'SelectRoomTile', a: a};
};
var $author$project$PlayerBoard$moreOrangeRooms = F2(
	function (player, tile) {
		var orangeCount = $elm$core$List$length(
			A2(
				$elm$core$List$filter,
				function (t) {
					return _Utils_eq(t.tileType, $author$project$Game$Orange);
				},
				player.rooms));
		var blueCount = $elm$core$List$length(
			A2(
				$elm$core$List$filter,
				function (t) {
					return _Utils_eq(t.tileType, $author$project$Game$Blue);
				},
				player.rooms));
		return _Utils_eq(tile.tileType, $author$project$Game$Blue) ? (_Utils_cmp(orangeCount, blueCount + 1) > 0) : true;
	});
var $author$project$Walls$matchSide = F3(
	function (r1, side, r2) {
		var _v0 = side(r2);
		switch (_v0.$) {
			case 'Placed':
				return _Utils_eq(
					side(r1),
					$author$project$Game$Placed) || _Utils_eq(
					side(r1),
					$author$project$Game$Optional);
			case 'Optional':
				return true;
			default:
				return _Utils_eq(
					side(r1),
					$author$project$Game$None) || _Utils_eq(
					side(r1),
					$author$project$Game$Optional);
		}
	});
var $author$project$Walls$matchSides = F2(
	function (caveWall, roomWall) {
		return A3(
			$author$project$Walls$matchSide,
			caveWall,
			function ($) {
				return $.north;
			},
			roomWall) && (A3(
			$author$project$Walls$matchSide,
			caveWall,
			function ($) {
				return $.east;
			},
			roomWall) && (A3(
			$author$project$Walls$matchSide,
			caveWall,
			function ($) {
				return $.south;
			},
			roomWall) && A3(
			$author$project$Walls$matchSide,
			caveWall,
			function ($) {
				return $.west;
			},
			roomWall)));
	});
var $author$project$Walls$rotateClockwise = function (walls) {
	return A4($author$project$Game$Walls, walls.west, walls.north, walls.east, walls.south);
};
var $author$project$Walls$matchesAux = F3(
	function (caveWall, roomWall, rotation) {
		matchesAux:
		while (true) {
			if (!rotation) {
				return false;
			} else {
				if (A2($author$project$Walls$matchSides, caveWall, roomWall)) {
					return true;
				} else {
					var $temp$caveWall = caveWall,
						$temp$roomWall = $author$project$Walls$rotateClockwise(roomWall),
						$temp$rotation = rotation - 1;
					caveWall = $temp$caveWall;
					roomWall = $temp$roomWall;
					rotation = $temp$rotation;
					continue matchesAux;
				}
			}
		}
	});
var $author$project$Walls$matches = F2(
	function (caveWall, roomWall) {
		return A3($author$project$Walls$matchesAux, caveWall, roomWall, 4);
	});
var $author$project$PlayerBoard$playerCanPlaceRoom = F2(
	function (player, tile) {
		return A3(
			$elm$core$List$foldl,
			$elm$core$Basics$or,
			false,
			A2(
				$elm$core$List$map,
				function (t) {
					return _Utils_eq(t.status, $author$project$Game$Empty) && A2($author$project$Walls$matches, t.walls, tile.walls);
				},
				player.rooms));
	});
var $author$project$PlayerBoard$allResourcesAvailable = function (r) {
	return (r.gold >= 0) && ((r.food >= 0) && ((r.wood >= 0) && ((r.flax >= 0) && ((r.stone >= 0) && (r.emmer >= 0)))));
};
var $author$project$PlayerBoard$playerHaveResources = F2(
	function (player, price) {
		return $author$project$PlayerBoard$allResourcesAvailable(
			A2($author$project$PlayerBoard$payRoom, price, player.resources));
	});
var $author$project$PlayerBoard$isRoomSelectable = F2(
	function (player, tile) {
		return A2($author$project$PlayerBoard$playerHaveResources, player, tile.price) && (A2($author$project$PlayerBoard$playerCanPlaceRoom, player, tile) && A2($author$project$PlayerBoard$moreOrangeRooms, player, tile));
	});
var $author$project$Main$viewAvailableRoom = F3(
	function (player, subphase, room) {
		return (_Utils_eq(
			subphase,
			$elm$core$Maybe$Just($author$project$Game$Furnish)) && A2($author$project$PlayerBoard$isRoomSelectable, player, room)) ? A3(
			$author$project$Tiles$viewTile,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('availableroom pick'),
					$elm$html$Html$Events$onClick(
					$author$project$Game$SelectRoomTile(room))
				]),
			player.resources,
			room) : A3(
			$author$project$Tiles$viewTile,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('availableroom')
				]),
			player.resources,
			room);
	});
var $author$project$Main$viewAvailableRooms = F3(
	function (player, subphase, rooms) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('availablerooms')
				]),
			A2(
				$elm$core$List$map,
				A2($author$project$Main$viewAvailableRoom, player, subphase),
				rooms));
	});
var $author$project$PlayerBoard$viewActionTiles = F2(
	function (resources, actionTiles) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('actiontiles')
				]),
			A2(
				$elm$core$List$map,
				A2(
					$author$project$Tiles$viewTile,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('actiontile')
						]),
					resources),
				actionTiles));
	});
var $author$project$PlayerBoard$viewFreeAction = function (board) {
	return A3(
		$author$project$Tiles$viewTile,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('freeaction')
			]),
		board.resources,
		board.freeAction);
};
var $author$project$Game$ResourceChosen = function (a) {
	return {$: 'ResourceChosen', a: a};
};
var $elm$core$Debug$toString = _Debug_toString;
var $author$project$PlayerBoard$viewResource = F5(
	function (active, resource, qty, subphase, resfun) {
		if (active) {
			if ((subphase.$ === 'Just') && (subphase.a.$ === 'ChooseResource')) {
				var _v1 = subphase.a;
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							resource + (' ' + ('qty' + $elm$core$Debug$toString(qty)))),
							$elm$html$Html$Events$onClick(
							$author$project$Game$ResourceChosen(resfun))
						]),
					_List_Nil);
			} else {
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							resource + (' ' + ('qty' + $elm$core$Debug$toString(qty))))
						]),
					_List_Nil);
			}
		} else {
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class(
						resource + (' ' + ('qty' + $elm$core$Debug$toString(qty))))
					]),
				_List_Nil);
		}
	});
var $author$project$PlayerBoard$viewResources = F2(
	function (board, subphase) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('resources')
				]),
			_List_fromArray(
				[
					A5(
					$author$project$PlayerBoard$viewResource,
					board.active,
					'food',
					board.resources.food,
					subphase,
					function (r) {
						return _Utils_update(
							r,
							{food: r.food - 1});
					}),
					A5(
					$author$project$PlayerBoard$viewResource,
					board.active,
					'wood',
					board.resources.wood,
					subphase,
					function (r) {
						return _Utils_update(
							r,
							{wood: r.wood - 1});
					}),
					A5(
					$author$project$PlayerBoard$viewResource,
					board.active,
					'stone',
					board.resources.stone,
					subphase,
					function (r) {
						return _Utils_update(
							r,
							{stone: r.stone - 1});
					}),
					A5(
					$author$project$PlayerBoard$viewResource,
					board.active,
					'emmer',
					board.resources.emmer,
					subphase,
					function (r) {
						return _Utils_update(
							r,
							{emmer: r.emmer - 1});
					}),
					A5(
					$author$project$PlayerBoard$viewResource,
					board.active,
					'flax',
					board.resources.flax,
					subphase,
					function (r) {
						return _Utils_update(
							r,
							{flax: r.flax - 1});
					}),
					A5(
					$author$project$PlayerBoard$viewResource,
					board.active,
					'gold',
					board.resources.gold,
					subphase,
					function (r) {
						return _Utils_update(
							r,
							{gold: r.gold - 1});
					})
				]));
	});
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{nodeList: nodeList, nodeListSize: nodeListSize, tail: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $author$project$Tiles$tileRock = A8(
	$author$project$Game$Tile,
	'Rock Tile',
	$author$project$Game$Gray,
	$author$project$Game$Rock,
	0,
	'',
	$author$project$Resources$priceFree,
	A4($author$project$Game$Walls, $author$project$Game$None, $author$project$Game$None, $author$project$Game$None, $author$project$Game$None),
	_List_Nil);
var $author$project$PlayerBoard$isRoom = F2(
	function (tileIndex, roomArray) {
		return function (t) {
			return !_Utils_eq(t.status, $author$project$Game$Rock);
		}(
			A2(
				$elm$core$Maybe$withDefault,
				$author$project$Tiles$tileRock,
				A2($elm$core$Array$get, tileIndex, roomArray)));
	});
var $author$project$PlayerBoard$isReachable = F2(
	function (tileIndex, roomArray) {
		switch (tileIndex) {
			case 0:
				return A2($author$project$PlayerBoard$isRoom, 1, roomArray) || A2($author$project$PlayerBoard$isRoom, 2, roomArray);
			case 1:
				return A2($author$project$PlayerBoard$isRoom, 0, roomArray) || A2($author$project$PlayerBoard$isRoom, 3, roomArray);
			case 2:
				return A2($author$project$PlayerBoard$isRoom, 0, roomArray) || (A2($author$project$PlayerBoard$isRoom, 4, roomArray) || A2($author$project$PlayerBoard$isRoom, 3, roomArray));
			case 3:
				return A2($author$project$PlayerBoard$isRoom, 1, roomArray) || (A2($author$project$PlayerBoard$isRoom, 5, roomArray) || A2($author$project$PlayerBoard$isRoom, 2, roomArray));
			case 4:
				return A2($author$project$PlayerBoard$isRoom, 2, roomArray) || (A2($author$project$PlayerBoard$isRoom, 5, roomArray) || A2($author$project$PlayerBoard$isRoom, 6, roomArray));
			case 5:
				return A2($author$project$PlayerBoard$isRoom, 3, roomArray) || (A2($author$project$PlayerBoard$isRoom, 4, roomArray) || A2($author$project$PlayerBoard$isRoom, 7, roomArray));
			case 6:
				return A2($author$project$PlayerBoard$isRoom, 4, roomArray) || (A2($author$project$PlayerBoard$isRoom, 7, roomArray) || A2($author$project$PlayerBoard$isRoom, 8, roomArray));
			case 7:
				return A2($author$project$PlayerBoard$isRoom, 5, roomArray) || (A2($author$project$PlayerBoard$isRoom, 6, roomArray) || A2($author$project$PlayerBoard$isRoom, 9, roomArray));
			case 8:
				return A2($author$project$PlayerBoard$isRoom, 9, roomArray) || A2($author$project$PlayerBoard$isRoom, 6, roomArray);
			case 9:
				return A2($author$project$PlayerBoard$isRoom, 7, roomArray) || (A2($author$project$PlayerBoard$isRoom, 10, roomArray) || A2($author$project$PlayerBoard$isRoom, 8, roomArray));
			case 10:
				return A2($author$project$PlayerBoard$isRoom, 9, roomArray);
			default:
				return false;
		}
	});
var $author$project$PlayerBoard$isExcavatable = F2(
	function (board, tile) {
		var tileIndex = A2($author$project$PlayerBoard$indexOf, tile, board.rooms);
		var roomArray = $elm$core$Array$fromList(board.rooms);
		return A2($author$project$PlayerBoard$isReachable, tileIndex, roomArray);
	});
var $elm$core$Debug$log = _Debug_log;
var $author$project$PlayerBoard$viewNonSelectableTile = F3(
	function (resources, index, tile) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(
					'room room-' + $elm$core$Debug$toString(index))
				]),
			_List_fromArray(
				[
					A3($author$project$Tiles$viewTile, _List_Nil, resources, tile)
				]));
	});
var $author$project$PlayerBoard$viewSelectableTile = F3(
	function (resources, index, tile) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(
					'room room-' + $elm$core$Debug$toString(index))
				]),
			_List_fromArray(
				[
					A3(
					$author$project$Tiles$viewTile,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('pick'),
							$elm$html$Html$Events$onClick(
							$author$project$Game$SelectRoomTile(tile))
						]),
					resources,
					tile)
				]));
	});
var $author$project$PlayerBoard$viewRoom = F4(
	function (board, subphase, index, tile) {
		if (!board.active) {
			return A3($author$project$PlayerBoard$viewNonSelectableTile, board.resources, index, tile);
		} else {
			_v0$4:
			while (true) {
				if (subphase.$ === 'Just') {
					switch (subphase.a.$) {
						case 'ExcavateThroughWall':
							var _v1 = subphase.a;
							return (_Utils_eq(tile.status, $author$project$Game$Rock) && A2($author$project$PlayerBoard$isExcavatable, board, tile)) ? A3($author$project$PlayerBoard$viewSelectableTile, board.resources, index, tile) : A3($author$project$PlayerBoard$viewNonSelectableTile, board.resources, index, tile);
						case 'Excavate':
							var _v2 = subphase.a;
							return (_Utils_eq(tile.status, $author$project$Game$Rock) && A2($author$project$PlayerBoard$isExcavatable, board, tile)) ? A3($author$project$PlayerBoard$viewSelectableTile, board.resources, index, tile) : A3($author$project$PlayerBoard$viewNonSelectableTile, board.resources, index, tile);
						case 'PlaceRoom':
							var t = subphase.a.a;
							return (A2(
								$elm$core$Debug$log,
								'(tile.status == Empty)',
								_Utils_eq(tile.status, $author$project$Game$Empty)) && A2(
								$author$project$Walls$matches,
								A2($elm$core$Debug$log, '(t.walls)', t.walls),
								A2($elm$core$Debug$log, '(tile.walls)', tile.walls))) ? A3($author$project$PlayerBoard$viewSelectableTile, board.resources, index, tile) : A3($author$project$PlayerBoard$viewNonSelectableTile, board.resources, index, tile);
						case 'Activate':
							var _v3 = subphase.a;
							return _Utils_eq(tile.status, $author$project$Game$Available) ? A3($author$project$PlayerBoard$viewSelectableTile, board.resources, index, tile) : A3($author$project$PlayerBoard$viewNonSelectableTile, board.resources, index, tile);
						default:
							break _v0$4;
					}
				} else {
					break _v0$4;
				}
			}
			return A3($author$project$PlayerBoard$viewNonSelectableTile, board.resources, index, tile);
		}
	});
var $author$project$PlayerBoard$viewRooms = F2(
	function (board, subphase) {
		return A2(
			$elm$core$List$indexedMap,
			A2($author$project$PlayerBoard$viewRoom, board, subphase),
			board.rooms);
	});
var $elm$core$Elm$JsArray$foldl = _JsArray_foldl;
var $elm$core$Elm$JsArray$indexedMap = _JsArray_indexedMap;
var $elm$core$Array$indexedMap = F2(
	function (func, _v0) {
		var len = _v0.a;
		var tree = _v0.c;
		var tail = _v0.d;
		var initialBuilder = {
			nodeList: _List_Nil,
			nodeListSize: 0,
			tail: A3(
				$elm$core$Elm$JsArray$indexedMap,
				func,
				$elm$core$Array$tailIndex(len),
				tail)
		};
		var helper = F2(
			function (node, builder) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldl, helper, builder, subTree);
				} else {
					var leaf = node.a;
					var offset = builder.nodeListSize * $elm$core$Array$branchFactor;
					var mappedLeaf = $elm$core$Array$Leaf(
						A3($elm$core$Elm$JsArray$indexedMap, func, offset, leaf));
					return {
						nodeList: A2($elm$core$List$cons, mappedLeaf, builder.nodeList),
						nodeListSize: builder.nodeListSize + 1,
						tail: builder.tail
					};
				}
			});
		return A2(
			$elm$core$Array$builderToArray,
			true,
			A3($elm$core$Elm$JsArray$foldl, helper, initialBuilder, tree));
	});
var $author$project$Game$SelectWall = function (a) {
	return {$: 'SelectWall', a: a};
};
var $author$project$PlayerBoard$viewWall = F3(
	function (subphase, index, wall) {
		switch (wall.$) {
			case 'Placed':
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							'wall placed wall-' + $elm$core$Debug$toString(index))
						]),
					_List_Nil);
			case 'Optional':
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							'wall placed wall-' + $elm$core$Debug$toString(index))
						]),
					_List_Nil);
			default:
				return (_Utils_eq(
					subphase,
					$elm$core$Maybe$Just($author$project$Game$DestroyWall)) || _Utils_eq(
					subphase,
					$elm$core$Maybe$Just($author$project$Game$BuildWall))) ? A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							'wall available wall-' + $elm$core$Debug$toString(index)),
							$elm$html$Html$Events$onClick(
							$author$project$Game$SelectWall(index))
						]),
					_List_Nil) : A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							'wall available wall-' + $elm$core$Debug$toString(index))
						]),
					_List_Nil);
		}
	});
var $author$project$PlayerBoard$viewWalls = F2(
	function (board, subphase) {
		return $elm$core$Array$toList(
			A2(
				$elm$core$Array$indexedMap,
				$author$project$PlayerBoard$viewWall(subphase),
				board.walls));
	});
var $author$project$PlayerBoard$viewBoard = F2(
	function (board, subphase) {
		var activeClass = board.active ? 'active' : '';
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('playerboard'),
					$elm$html$Html$Attributes$class(activeClass)
				]),
			_List_fromArray(
				[
					A2($author$project$PlayerBoard$viewActionTiles, board.resources, board.actionTiles),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('board')
						]),
					_Utils_ap(
						_List_fromArray(
							[
								A2($author$project$PlayerBoard$viewResources, board, subphase),
								$author$project$PlayerBoard$viewFreeAction(board)
							]),
						_Utils_ap(
							A2($author$project$PlayerBoard$viewRooms, board, subphase),
							A2($author$project$PlayerBoard$viewWalls, board, subphase))))
				]));
	});
var $author$project$Main$viewMain = function (game) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('mainboard')
			]),
		_List_fromArray(
			[
				A2(
				$author$project$PlayerBoard$viewBoard,
				game.player1,
				$author$project$Stack$top(game.stack)),
				A3(
				$author$project$Main$viewAvailableRooms,
				$author$project$Main$getCurrentPlayer(game),
				$author$project$Stack$top(game.stack),
				game.availableRooms),
				A2(
				$author$project$PlayerBoard$viewBoard,
				game.player2,
				$author$project$Stack$top(game.stack))
			]));
};
var $author$project$Game$Pass = {$: 'Pass'};
var $elm$html$Html$button = _VirtualDom_node('button');
var $author$project$Game$subphaseToString = function (subphase) {
	if (subphase.$ === 'Nothing') {
		return '';
	} else {
		switch (subphase.a.$) {
			case 'NewActionPhase':
				var _v1 = subphase.a;
				return 'New Action Phase';
			case 'ActionPhase':
				var _v2 = subphase.a;
				return 'Action Phase';
			case 'Excavate':
				var _v3 = subphase.a;
				return 'Escavate 1';
			case 'Furnish':
				var _v4 = subphase.a;
				return 'Furnish';
			case 'PlaceRoom':
				var tile = subphase.a.a;
				return 'PlaceRoom ' + tile.title;
			case 'BuildWall':
				var _v5 = subphase.a;
				return 'Build a Wall';
			case 'DestroyWall':
				var _v6 = subphase.a;
				return 'Destroy a Wall';
			case 'ExcavateThroughWall':
				var _v7 = subphase.a;
				return 'Escavate through a Wall';
			case 'Activate':
				var _v8 = subphase.a;
				return 'Activate a Room 1';
			default:
				var _v9 = subphase.a;
				return 'Choose One Resource';
		}
	}
};
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Main$viewStatusBar = function (game) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('statusbar')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Events$onClick($author$project$Game$Pass)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Pass')
					])),
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(
						'Round: ' + ($elm$core$String$fromInt(game.round) + (' || Player ' + ($elm$core$String$fromInt(
							game.player1.active ? 1 : 2) + (' || Actions: ' + ($elm$core$String$fromInt(
							$elm$core$List$length(
								$author$project$Main$getCurrentPlayer(game).actionTiles)) + ('/' + ($elm$core$String$fromInt(game.actions) + (' || Phase: ' + ($author$project$Game$subphaseToString(
							$author$project$Stack$top(game.stack)) + (' || Available Walls: ' + $elm$core$String$fromInt(game.availableWalls))))))))))))
					]))
			]));
};
var $author$project$Main$view = function (game) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('container')
			]),
		_List_fromArray(
			[
				$author$project$Main$viewStatusBar(game),
				$author$project$Main$viewActionTiles(game),
				$author$project$Main$viewMain(game)
			]));
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{
		init: $author$project$Main$init,
		subscriptions: function (_v0) {
			return $elm$core$Platform$Sub$none;
		},
		update: $author$project$Main$update,
		view: $author$project$Main$view
	});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));