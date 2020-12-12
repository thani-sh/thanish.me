+++
author = "Thanish"
categories = ["go"]
date = 2015-07-29T18:30:00Z
description = ""
draft = false
slug = "day-3--packages"
tags = ["go"]
title = "Day 3: Packages"

+++


All go packages except packages from the standard library are placed inside the $GOPATH. A package consists of a set of go files in a directory. All go files should have “package mypackage” line before other code. There can be only one package per directory. Although it’s not required It’s expected that the directory name and the package name to be equal.

By default Go provides a very large standard library. It consists of many kinds of packages including packages for formatting, logging, Operating System and filesystem operations, http/network request handling and JSON encoding/decoding. In previous examples we used the **fmt** package to print different data types to STDOUT. More packages will be used in future tutorials. The [packages page](https://golang.org/pkg/) in golang website explains these packages in detail.

## The $GOPATH

$GOPATH is a directory in your computer. The $GOPATH environment variable should be set to a directory and all your Go code should be placed inside it. There should be three directories inside the $GOPATH.

### bin

When a “main” package is compiled, it creates an executable with the directory name as executable name. All built executables will be placed here.

### lib

All non-main packages create non-executable libraries which will be placed here. This speeds up Go compile time significantly.

### src

All source files (.go files) should be placed here. This is the only directory most developers have to work with.

**In order to continue this and future tutorials a new directory should be made and the $GOPATH environment variable should point to it.**

## Using Packages

The hello world example can be written where a package named **hello** is used to print the message. Code for the hello package should be placed inside $GOPATH/src/myname/hello/hello.go file.

```go
package hello

func Print () {
	println("Hello World")
}
```

The hello package can be used to create an executable called say-hello. Code for the **say-hello** main package should be placed inside $GOPATH/src/myname/say-hello/main.go file. The import path for the package is the relative path to the package directory from $GOPATH/src directory.

```go
package hello

func Print () {
	println("Hello World")
}
```

Go packages can be written using multiple files. Code written in multiple files work as if they’re written in a single file. Above hello package can be changed to use 2 files. In this example, the greeting constant created inside strings.go file is used inside hello.go file without problems.

```go
package hello

const greeting = "Hello World"
```

```go
package hello

func Print () {
  println(greeting)
}
```

### Exporting

An important fact is that constants, variables and functions starting with a capital letter will be exposed to other packages. Those starting with a simple letter can be used only from inside the package.

The **greeting** constant cannot be accessed form outside the package. If it were to be renamed as **Greeting**, it would be possible to access it with **hello.Greeting** after importing the **hello** package.

The same way, if **Print** were to be renamed as **print** it would be impossible to access it from outside the package.

### Bootstrapping

Packages may have an **init** function which will be executed before the main function. In this example the **time** package (std) is used to get the Hour.I know that this example is simply WRONG!. Its just an example okay, cool.

```go
package hello

import "time"

var greeting string

func init() {
	h := time.Now().Hour()

	switch {
	case h < 12:
		greeting = "Good Morning"
	case h < 18:
		greeting = "Good Evening"
	case h < 24:
		greeting = "Good Night"
	default:
		greeting = "Good Lord!!!"
	}
}

// Print prints a greeting to stdout
func Print() {
	println(greeting)
}
```

## The “main” Package

The main package is in most ways similar to any other package. It can be written in multiple files. The difference is that main packages create executables. When the executable is run, the **main** function inside the **main** package is executed. Another difference is that the directory name of the is named after the executable name instead of package name (main).

```go
package main

import "myname/hello"

func main () {
	hello.Print()
}
```

## What’s Next

Go community packages are named after the place where they are hosted. The go get tool can download go packages from many sources the most popular being github. Therefore, most package imprts would look like “github.com/my-username/my-reponame/mypkg”.

The Go community is still finding ways to maintain package versions. The best solution so far is vendoring (making a full copy of the package and using files from the copy from that time forward). A solution is expected to be finalized at Go version 1.6.

After this tutorial, the next best thing to do is to check out the standard library and build applications using them.

