+++
author = "Thanish"
categories = ["docker", "nginx", "ghost"]
date = 2020-01-15T10:15:50Z
description = ""
draft = false
slug = "rebooting-thanish"
tags = ["docker", "nginx", "ghost"]
title = "Rebooting thanish.me"

+++


Here's a basic diagram explaining how I'm planning to set it up. Both nginx and Ghost will be running inside Docker containers to keep the distro clean.

{{< figure src="/imported/1-ZXCIknjf3-MNMO2QSSoKLP.png" caption="Fig 1. diagram explaining the layout" >}}

I'm using a DigitalOcean droplet ( [referall link](https://m.do.co/c/8898755a9f11) ) to host this blog. Just a standard droplet with the latest Ubuntu LTS 18.04 with backups enabled. Also added a network level firewall through the dashboard to only allow traffic through ports 22, 80 and 443. Planning to block port 22 after some time.

Log into the server with SSH.

> ****TLDR;**** my setup didn't work in the end and I ended up using Cloudflare for SSL. This post describes what I tried. The next blog post will probably have a fully working solution.

### **Configure Ubuntu**

It is important to keep the distro up to date.

```
apt update
apt upgrade
```

Setup the host firewall to only allow incoming connections to ssh, http and https ports. We'll use this in addition to the network firewall so we can add more advanced firewall rules later on.

```
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow http
ufw allow https
ufw enable
```

Be careful not to block port 22 😁

### **Install Docker CE**

Simply follow all the instructions given in the [official guide](https://docs.docker.com/install/linux/docker-ce/ubuntu/) or use the shell script at [get.docker.com](https://get.docker.com).

```
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

And also install docker-compose which will help us keep everything nice and tidy.

```
apt install docker-compose
```

### **Get the Certificate**

Create the following shell script which can be used to both obtain and renew certificates. This will run certbot in standalone mode to serve the challenge files. I'm using the `certbot/certbot` Docker image to do this.

```
#!/bin/bash

docker run -it --rm \
  -p 80:80 \
  -v /root/volumes/cert/conf:/etc/letsencrypt \
  -v /root/volumes/cert/www:/var/www/certbot \
   certbot/certbot \
   certonly -n --standalone -d thanish.me -d www.thanish.me --agree-tos -m YOUR_EMAIL@gmail.com
```

We also need to set it up so that it will renew the certificate automatically but let's move on to setting up Ghost for the moment. Please note that the `/root/volumes/cert/www` volume is not used at the moment. When we setup automatic certificate renewals later on we'll be using it.

### **Start the Ghost Blog**

Let's use a docker-compose.yml file this time to keep everything together. The following configuration creates 2 containers, an nginx reverse proxy and the Ghost blog.

```
version: '3'

services:

  blog:
    image: ghost:3-alpine
    restart: always
    environment:
      - url=https://thanish.me
    volumes:
      - ./volumes/blog:/var/lib/ghost/content

  proxy:
    image: nginx:1.17-alpine
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./volumes/proxy:/etc/nginx/conf.d
      - ./volumes/cert/conf:/etc/letsencrypt
      - ./volumes/cert/www:/var/www/certbot
```

And the nginx config file at `./volumes/proxy/app.conf` to terminate SSL and proxy all incoming requests to the blog:

```
server {
    listen 443 ssl;
    server_name thanish.me;
    ssl_certificate /etc/letsencrypt/live/thanish.me/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/thanish.me/privkey.pem;
    location / {
        proxy_pass http://blog:2368;
    }
}
```

Then I had some trouble, above configuration didn't work. The nginx serve kept redirecting the browser to `http://blog` which is not what we want.

__Continue debugging or do something else?__

Somehow, I have written a blog post this long after a long time and I like it if I can post it today itself. I found a [blog post](https://blog.alexellis.io/your-ghost-blog/) exploring a similar problem. The only difference is that `nginx` is installed on the host machine instead of Docker 😞. Let's keep that as an option and keep looking for other solutions.

After fiddling around with nginx a little more I decided to let it rest for now and temporarily use Cloudflare's SSL in flexible mode instead. After removing the proxy, the docker-compose file looks like this.

```
version: '3'

services:

  blog:
    image: ghost:3-alpine
    restart: always
    environment:
      - url=http://thanish.me
    volumes:
      - ./volumes/blog:/var/lib/ghost/content
    ports:
      - "80:2368"
```

I'll be probably continue this over a weekend and write about it here. Until next time 👋.

---

****Reference****

* [https://docs.docker.com/install/linux/docker-ce/ubuntu/](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
* [https://medium.com/@pentacent/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71](https://medium.com/@pentacent/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71)
