+++
author = "Thanish"
categories = ["go"]
date = 2015-07-27T18:30:00Z
description = ""
draft = false
slug = "day-1--getting-started"
tags = ["go"]
title = "Day 1: Getting Started"

+++


The go playground is where go code can be run easily and fast therefore it makes an efficient place to try new go code. This also makes the playground useful when learning how to program with Go.

{{< figure src="/imported/1-2GusYKCdRZNnN9xL1VVFxw.png" caption="The Go playground with a very familiar go program" >}}

> The Go Playground is a web service that runs on [golang.org](https://golang.org/)’s servers. The service receives a Go program, compiles, links, and runs the program inside a sandbox, then returns the output. — Go Playground About Page

When visiting the playground, it will already have a simple a hello-world like program in the editor. The code can be executed using the **Run** button. Google chrome users can install the [Better Go Playground](https://chrome.google.com/webstore/detail/better-go-playground/odfhkelcmblecfdnboahphiafolojmpl?hl=en) extension for syntax highlighting, code auto completion, auto save and more features.

## Installing Go

The Go playground is awesome but it has it’s limits. To run most go programs, you’ll have to install Go tools. Go website has [binary distributions](https://golang.org/dl/) for Linux, Mac and Windows.

### Installing on Windows

Download the [go1.4.2.windows-amd64.msi](https://storage.googleapis.com/golang/go1.4.2.windows-amd64.msi) file (or the [go1.4.2.windows-386.msi](https://storage.googleapis.com/golang/go1.4.2.windows-386.msi) file for 32-bit systems) and follow the setup process. It will install go tools and update your **PATH** variable to include go commands.

### Installing on Mac OSX

Mac OSX users can either use the setup pkg file [go1.4.2.darwin-amd64-osx10.8.pkg](https://storage.googleapis.com/golang/go1.4.2.darwin-amd64-osx10.8.pkg) and follow the instructions or install go using homebrew.

```bash
brew install go
```

### Installing on Ubuntu

Ubuntu users can or simply install it using the apt package manager.

```bash
sudo apt-get install go
```

For other linux distributions, check the corresponding package manager or download the [go1.4.2.linux-amd64.tar.gz](https://storage.googleapis.com/golang/go1.4.2.linux-amd64.tar.gz) file and extract it into /usr/local.

## The Hello World

Running go code on the system is almost as easy as running it on the Go playground. To get started, create a new directory called hello-world and add the following code into a go file (main.go).

{{< figure src="/imported/1-ICIw1jJimwLsTpjyWXl9Tg.png" caption="A really simple Hello World program in Go" >}}

### Running Go Code

The go run command can be used to run a go file. Only go files inside a main package can be run, otherwise go will return go run: cannot run non-main package error message. More information on packages will be available on upcoming tutorials (hopefully tomorrow). The following command can be used to run the hello world example created above.

{{< figure src="/imported/1-ikblFqSQVaBecOfvms7GQQ.png" caption="Running go files with the go tool without compiling" >}}

### Compiling Go Code

The go build command can be used to compile go code and create an executable file. These files are statically compiled therefore do not require go tools to be installed in order to run.

Go also supports cross os/arch compiling. As of Go 1.4 cross OS compiling can be a bit tricky therefore tools such [gox](https://github.com/mitchellh/gox) can be useful. From Go 1.5 cross compiling become as simple and easy as setting **GOOS** and **GOARCH** environment variables when running the Go build command.

The go build command can be run from the hello-world directory to build the program for current operating system and architecture.

{{< figure src="/imported/1-C_9LBAqmiU6gUke0VZ7u-A.png" caption="Compiling a go program for current os/arch and running the executable" >}}

## What’s Next?

The next tutorial will be on Go packages the **GOPATH**. Until the next article is published, it’s a good idea to go through the [Tour of Go](https://tour.golang.org/list) to get a glimpse of go syntax, data types and built in functions
