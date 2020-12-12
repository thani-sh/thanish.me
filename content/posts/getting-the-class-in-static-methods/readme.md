+++
author = "Thanish"
categories = ["js"]
date = 2017-01-25T18:30:00Z
description = ""
draft = false
slug = "getting-the-class-in-static-methods"
tags = ["js"]
title = "Getting the class in static methods"

+++


This is useful when writing static methods which can be inherited by other classes. Here’s an example:

```
class Parent {
  static x() {
    return 10
  }

  static y() {
    return 2
  }

  static xy() {
    // return x * y ?
  }
}

class Child extends Person {
  static x() {
    return 100
  }
}

console.log(Person.xy(), Child.xy())
```

The solution was so simple I feel bad it took me some time to figure it out. The important this to remember is that what happens behind all the OOP is just simple javascript. Let’s focus on where we call the function.

```
Parent.xy()
```

What do you think the value of this is inside the xy function? The class Parent is just a function object. The value of this works just like when we call obj.fn().

But the value of "this" can quickly get confusing once we start using both static and non-static methods.

```
class Parent {
  static x() {
    return 10
  }

  static y() {
    return 2
  }

  static xy() {
    return this.x() * this.y()
  }

  z() {
    return this.z
  }
}

class Child extends Parent {
  static x() {
    return 100
  }
}

console.log(Parent.xy(), Child.xy())
```

