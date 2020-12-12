+++
author = "Thanish"
categories = ["js", "rxjs"]
date = 2018-09-05T13:00:00Z
description = ""
draft = false
slug = "debugging-rxjs-code"
tags = ["js", "rxjs"]
title = "Debugging RxJS code"

+++


This are undocumented internal details of RxJS and it can break anytime. It probably would have changed by the time you're reading this blog post. But still, there can be something similar.

* Add a breakpoint on the line where it throws the error message
* On the call stack, go up a little until you can find the observable instance
* inspect it (usually it'll be the `this` variable)
* check the `_destination` field and you may find the operator which is added after the faling operator (if there are any)
* if you inspect the destination operator, you may find callback functions you gave to that operator => your app code! 🙂

