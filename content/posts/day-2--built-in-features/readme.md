+++
author = "Thanish"
categories = ["go"]
date = 2015-07-28T18:30:00Z
description = ""
draft = false
slug = "day-2--built-in-features"
tags = ["go"]
title = "Day 2: Built-in Features"

+++


This tutorial consists of a number of example go programs demonstrating each feature. It is recommended to try some of them on the Go playground or on your local machine.

Constants are declared using the `const` keyword. They can be declared with a data type but it’s not common. The “Hello World” string can be stored in a constant and printed.

```go
package main

func main() {
	const hello = "Hello World"
	println(hello)
}
```

## Variables

Variables can be declared using the **var** keyword. The “Hello World” string can be stored in a variable before printing.

```go
package main

func main() {
	var hello string
	hello = "Hello World"

	// hello := "Hello World"
	// Can be used to declare and assign
	// at the same time. Check note below.

	println(hello)
}
```

The first 2 lines in the function can be shortened with the “:=” operator. This will attempt to identify the type form the value and use it. In most cases this will work as expected but when using numbers, it will always use **int** for integers and **float64** for floating point numbers. When writing Go programs, the := operator is preferred more than declaring with **var** and assigning later.

Please note that all variables created must be used in the program otherwise it’ll give an error when running/compiling. In some cases the “_” can be used in place of a variable.

Go has many more data types which can be read from the [go specification](https://golang.org/ref/spec#Types). The go spec is shorter than most others and also very easy to read and understand.

## Functions

Functions can be defined in Go using the **func** keyword. The hello world program can be written using a sayHello function.

```go
package main

func main() {
	sayHello()
}

func sayHello() {
	println("Hello World")
}
```

Go functions can also get a number of arguments and use them.

```go
package main

func main() {
	sayHello("John", "Doe")
}

// sayHello(fname string, lname string)
// is also valid and does the same thing
func sayHello(fname, lname string) {
	println("Hello " + fname + " " + lname)
}
```

Go functions can also **return multiple arguments**.

```go
package main

func main() {
	fname, lname := getName()
	sayHello(fname, lname)
}

func getName() (string, string) {
	return "John", "Doe"
}

func sayHello(fname, lname string) {
	println("Hello " + fname + " " + lname)
}
```

Go functions can be used as values. They can be stored in variables, passed as arguments and returned from other functions.

```go
package main

func main() {
	greet := getGreeter("Hi")
	greet("John Doe")
}

func getGreeter(prefix string) func(name string) {
	fn := func(name string) {
		println(prefix + " " + name)
	}
	return fn
}
```

Above example also demonstrates why is most commonly known as a **closure**. The function created inside getGreeter captures surrounding variables (in this example, the prefix variable) and remembers it when it’s used later.

## Control Statements

Go only has a few statements to control program flow. They are **if**, **switch**, **for**, **break**, **continue** and **goto**. Go also has a **select** statement which is best explained after getting used to go-routines and basics of concurrent programming in go.

### If

In Go control statements do not use parentheses.

```go
package main

func main() {
	user := "Goku"

	if user == "Goku" {
		println("Hello Admin")
	}
}
```

If conditions may also have an else block.

```go
package main

func main() {
	user := "Nappa"

	if user == "Goku" {
		println("Hello Admin")
	} else {
		println("Hello Guest")
	}
}
```

Go also supports else-if blocks. In some cases, a switch may be more appropriate than long if-else ladders.

```go
package main

func main() {
	user := "Gohan"

	if user == "Goku" {
		println("Hello Admin")
	} else if user == "Gohan" {
		println("Hello User")
	} else {
		println("Hello Guest")
	}
}
```

### switch

Above example can be written using a switch statement. A switch can be used with strings, integers and other types.

```
package main

func main() {
	user := "Gohan"

	switch user {
	case "Goku":
		println("Hello Admin")
	case "Gohan":
		println("Hello User")
	default:
		println("Hello Guest")
	}
}
```

The switch can be written in another format which is useful for more complex situations.

```go
package main

func main() {
	user := "Goku"
	pass := "Pass"

	switch {
	case user == "Goku" && pass == "P@$Z":
		println("Login Success")
	case user == "Goku":
		println("Incorrect Password")
	default:
		println("User Not Found")
	}
}
```

### for

Go only has for loops but it has a few forms. For loops can be used in many ways depending on the situation. The first form is the infinite loop. The break keyword can be used to exit the loop when necessary.

```go
package main

func main() {
	for {
		println("Loop")
	}
}
```

The second form is similar to the while loop in most languages.

```go
package main

func main() {
	i := 0

	for i < 5 {
		i++
		println("Loop")
	}
}
```

Above loop can be written using the more common for loop like form.

```go
package main

func main() {
	for i := 0; i < 5; i++ {
		println("Loop")
	}
}
```

There are 2 more special cases which is explained under Slices and Maps.

## Data Structures

Go only has a few data structures built into the language but they are flexible enough to more complex ones on top of them.

### Slices

Go **arrays** are fixed length therefore not easy to handle. Therefore, go programmers often use slices to store series of data. A slice can be created using the **make** keyword. In this example the **Println** function inside the **fmt** package is used. **fmt.Println** can print more data types than **println**. Packages will be explained more in a future tutorial.

```go
package main

import "fmt"

func main() {
	sz := 3 // slice size
	t3s := make([]string, sz)
	t3s[0] = "Krillin"
	t3s[1] = "Gohan"
	t3s[2] = "Dende"
	fmt.Println(t3s)
}
```

Slices can also be created with an initial set of elements. Additional items can be added to a slice using the append function. _Please note that the array used for the slice may or may not change which depends on the slice’s capacity (array size)._

```go
package main

import "fmt"

func main() {
	t3s := []string{"Krillin", "Gohan", "Dende"}
	t4s := append(t3s, "Vegeta")
	fmt.Println(t3s, t4s)
}
```

The for loop has a special form to iterate over a slice.

```go
package main

import "fmt"

func main() {
	t3s := []string{"Krillin", "Gohan", "Dende"}
	t4s := make([]string, 4)

	for i, name := range t3s {
		t4s[i] = name
	}

	t4s[3] = "Vegeta"
	fmt.Println(t3s, t4s)
}
```

The **copy** function can be used to copy data form one slice to another.

```go
package main

import "fmt"

func main() {
	t4s := []string{"Krillin", "Gohan", "Dende", "Vegeta"}
	t3s := make([]string, 3)
	copy(t3s, t4s)

	fmt.Println(t3s, t4s)
}
```

A slice can be made from another slice. Both slices still use the same array. Therefore any changes made to one slice will reflect on the other.

```go
package main

import "fmt"

func main() {
	t4s := []string{"Krillin", "Gohan", "Dende", "Vegeta"}
	t3s := t4s[0:3]
	fmt.Println(t3s, t4s)

	t3s[2] = "Little Green"
	fmt.Println(t3s, t4s)
}
```

To learn more about how slices work, read [go slice usage and internals](http://blog.golang.org/go-slices-usage-and-internals) on golang blog.

### Maps

Go map keys can be strings, integers, floats, structs or pointers to data types. This can be useful for mapping one value to another with many data types. The same **make** keyword can be used to create an empty map.

```go
package main

import "fmt"

func main() {
	t3s := make(map[string]string)
	t3s["Krillin"] = "Human"
	t3s["Gohan"] = "Saiyan"
	t3s["Dende"] = "Namekian"
	fmt.Println(t3s)
}
```

A map can be created with an initial set of items. Unlike slices, maps are copied if assigned to a new variable.

```
package main

import "fmt"

func main() {
	t3s := map[string]string{
		"Krillin": "Human",
		"Gohan": "Saiyan",
		"Dende": "Namekian",
	}
	
	t4s := t3s
	t4s["Vegeta"] = "Saiyan"

	fmt.Println(t3s, t4s)
}
```

For loop has a special form for maps to iterate over keys and values. The order keys are accessed is randomized by Go to make sure that developers do not depend on it accidentally.

```go
package main

func main() {
	t3s := map[string]string{
		"Krillin": "Human",
		"Gohan":   "Saiyan",
		"Dende":   "Namekian",
	}

	for name, race := range t3s {
		println(name + " is a " + race)
	}
}
```

### Structs

Go structs are a collection of variables with one or more data types.

```go
package main

import "fmt"

func main() {
	type member struct {
		name string
		race string
	}
	
	krillin := member{}
	krillin.name = "Krillin"
	krillin.race = "Human"

	gohan := member{
		name: "Gohan",
		race: "Saiyan",
	}

	fmt.Println(krillin, gohan)
}
```

Structs may also have **methods** which makes it similar to classes in OOP languages. To add methods to structs, they must be declared outside the main function.

```go
package main

type member struct {
	name string
	race string
}

func (m member) intro() {
	println("Hi, I'm " + m.name)
}

func main() {
	krillin := member{
		name: "Krillin",
		race: "Human",
	}

	krillin.intro()
}
```

## What’s Next ?

This tutorial only covers the most common parts of golang built-ins. To read more the best place is the [golang spec](https://golang.org/ref/spec). It’s also the best place to look when there’s a question regarding how go works.

