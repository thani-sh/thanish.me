+++
author = "Thanish"
categories = ["js", "canvas"]
date = 2017-05-17T18:30:00Z
description = ""
draft = false
slug = "fabricjs-performance-hack"
tags = ["js", "canvas"]
title = "FabricJS performance hack"

+++


The frame rate can be improved by only rendering inside a rAF callback.

```js
let isRendering = false;
let isAnimating = false;

const render = canvas.renderAll.bind(canvas);
const stop = () => isAnimating = false;
const play = () => {
    isAnimating = true;
    canvas.renderAll();
};

canvas.renderAll = () => {
    if (!isRendering) {
        isRendering = true;
        requestAnimationFrame(() => {
            render();
            isRendering = false;
            if (isAnimating) {
                canvas.renderAll();
            }
        });
    }
};
```

I started working with FabricJS this week so there’s a big chance things might break. I couldn’t find any place this might break after going through the canvas.renderAll method source code but this needs more tests before it can be used in any project. Here’s screenshots of profiles before and after applying the hack on an example scene.

{{< figure src="/imported/1-I5nrwmWgIbaqEACsZFTMRA.png" caption="Screenshot of the profile before applying the hack" >}}

{{< figure src="/imported/1-h5PmFsdbKLTv1BXc8FUJsQ.png" caption="Screenshot of the profile after applying the hack" >}}

The frame rate can be improved further by running requestAnimationFrame in a loop ( example: using the play function in the gist ).

{{< figure src="/imported/1-3Wu64u6UyaUPH7NIxJtC6A.png" >}}

Even if this hack works, you’ll need to do customize the hack depending on your application. Like I said, I’ve only started using FabricJS this week so if there’s something wrong with the code, please let me know with a comment.
