+++
author = "Thanish"
categories = ["cloudflare", "docker", "ghost", "nginx"]
date = 2020-04-03T22:11:13Z
description = ""
draft = false
slug = "rebooting-thanish-2"
tags = ["cloudflare", "docker", "ghost", "nginx"]
title = "Rebooting thanish.me - 2"

+++


Previously I wrote about how I attempted to host my (Ghost) blog on a DigitalOcean droplet. The plan was to use nginx as the reverse proxy and Let's Encrypt for SSL. Unfortunately I had some issues running both Ghost and nginx in docker containers. As a temporary patch, I decided to use Cloudflare to resolve SSL.

Just like before, I'm writing this post offline while setting up the server to make sure I don't miss anything. Before we begin, here's the basic overview.

{{< figure src="/imported/1-2Hx64u6UyaGG69NIxJtC8F.png" >}}

And once the request reaches the server an nginx reverse proxy will route it to the blog and all other installed apps. Similar to the previous post, both nginx and Ghost are running inside docker containers.
