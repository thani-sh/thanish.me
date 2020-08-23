+++
author = "Thanish"
categories = ["js"]
date = 2014-08-13T13:00:00Z
description = ""
draft = false
slug = "empty-function-shorthand"
tags = ["js"]
title = "Empty Function Shorthand"

+++


JavaScript is an interesting language and so far my favorite. Maybe  it's just me but I find stuff some people complain about javascript such  as _automatic semicolon insertion, the way javascript scoping works and function/variable hoisting_ to be some of its best features.

Sometimes javascript functions may require `Function` arguments or callbacks when you don't want to. This can happen often  when you're writing mock components for tests. I used to do this by

```js
var do_nothing = function(){};
foo('bar', do_nothing);
```

You can get get the same result by using the `Function` constructor and make the code a tiny bit cleaner. This is not a random  hack either. If you check what happens, it also makes sense. The demo  code would look like this when using the constructor.

```js
foo('bar', Function());
```

What happens is, `Function()` returns a `Function` object with an empty body so it does nothing interesting. If you're  still not sure, copy the following code to your browser console or node  REPL.

```js
Function().toString();
```

---

**Update:** found out that `Function.prototype` is an empty function and a much better choice because you're not creating new functions like the `Function()` constructor does.

