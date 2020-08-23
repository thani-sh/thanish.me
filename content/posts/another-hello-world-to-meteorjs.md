+++
author = "Thanish"
categories = ["meteor"]
date = 2014-05-02T13:00:00Z
description = ""
draft = false
slug = "another-hello-world-to-meteorjs"
tags = ["meteor"]
title = "Another ‘Hello World’ to MeteorJS"

+++


In this tutorial, I’ll try to walk you through building a simple  realtime wall (like a guestbook) where anyone can post messages. And  let’s try to do this without using any magic.

### Install Meteor and Atmosphere

* Installing Meteor
* Installing Atmosphere

### Create new project

Just go to the directory you want to create the app and create a new meteor project using following command.

```
meteor create the-wall

```

Feel free to run the meteor app although we haven’t even started  coding it yet. It’s okay to keep it running even while you’re coding.

```
cd the-wall
meteor

```

### Remove the magic

We’re not going to use any magical features of Meteor. So, let’s remove them.

```
meteor remove insecure
meteor remove autopublish

```

### Create a collection

In meteor, we’ll be keeping most of our realtime data in collections. Create a new file `posts/collections/posts.js`.  This will make this collection available in both the server and the  client. And we want to let anyone post messages and make sure no one can  delete them.

posts/collections/posts.js

```
Posts = new Meteor.Collection('posts');

Posts.allow({
  insert: function () { return true },
  remove: function () { return false }
});

```

### Publish the collection

Data collections must be first published before they can be accessed  by clients. For our example, let’s publish posts which posted in last 24  hours.

posts/server/publications/latestPosts.js

```
Meteor.publish('latestPosts', function () {
  var yesterday = new Date().getTime() - 1000*60*60*24;
  return Posts.find({created: {$gt: yesterday}});
});

```

Publishing happens server side therefor we can place the code inside a directory called `server`. For more information about meteor directories, please read [Organizing Meteor files](#).

Let’s add some example posts so we can check if everything works. Go to `localhost:3000` using a browser (I guess its either Firefox or Chrome). Bring up the developer console and enter the following.

```
var twoDaysAgo = new Date().getTime() - 1000*60*60*24*2;
Posts.insert({text: "Two Days Ago", created: twoDaysAgo});

var twoHoursAgo = new Date().getTime() - 1000*60*60*2;
Posts.insert({text: "Two Hours Ago", created: twoHoursAgo});

var now = new Date().getTime();
Posts.insert({text: "Now", created: now});

```

### Subscribe and fetch posts

If you try fetching them from the database, it won’t work because  first we must subscribe to a publication. If you try to fetch anyways,  it’ll return an empty array.

```
Posts.find().fetch()
=> []

```

First you must subscribe to the publication and wait until it’s ready.

```
var sub = Meteor.subscribe('latestPosts');

```

After some time, the subscription will be ready. You can check it  using the ready method of the object returned by Meteor.subscribe().

```
sub.ready()
=> true

```

Finally, you can access posts from the client.

```
Posts.find().fetch().toString()
=> "[object Object],[object Object]"

```

You’ll notice that although there are 3 docs in the collection, only 2  gets to the client through this publication/subscription. This happens  because we have limited docs sent to the client when publishing them.

### Method to add posts

Earlier we added posts from the client side and we set the created  time manually. To make things simpler, we can create a Meteor method  which does this for us.

posts/server/methods/saveMethod.js

```
Meteor.methods({
  addPost: function (text) {
    check(text, String);
    Posts.insert({
      text: text,
      created: new Date().getTime()
    });
  }
});

```

And we can make sure this works by calling the method form the client. Try running this command on browser console.

```
Meteor.call('addPost', 'Added using method');

```

## Finally the UI

Let’s just wrap things up with a simple UI.

### Main Wrapper

client/index.html

```
<body>
  <div id="wrapper">
    {{> newPost}}
    {{> postsList}}
  </div>
</body>

```

client/index.css

```
#wrapper {
  max-width: 900px;
  margin: 5em auto;
  padding: 0 5em;
  font-family: sans-serif;
}

```

### Form to add new post

posts/client/newPost.html

```
<template name="newPost">
  <div id="newPost">
    <textarea autofocus id="newPostText"></textarea>
    <button id="newPostButton">Save Post</button>
  </div>
</template>

```

posts/client/newPost.css

```
#newPost textarea {
  display: block;
  width: 100%;
  height: 2.5em;
  padding: 0.5em 0.75em;
  outline: none;
  font-size: 1.5em;
  box-sizing: border-box;
}

#newPost button {
  display: block;
  width: 100%;
  background: rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.1);
  outline: none;
}

```

posts/client/newPost.js

```
Template.newPost.events({
  'click #newPostButton': function (e) {
    var textarea = $('#newPostText');
    var text = textarea.val();
    Meteor.call('addPost', text);
    textarea.val('');
  }
});

```

### List Posts

posts/client/postsList.html

```
<template name="postsList">
  <ul id="postsList">
  {{#each posts}}
    <li>{{text}}</li>
  {{/each}}
  </ul>
</template>

```

posts/client/postsList.css

```
#postsList {
  padding: 0;
}

#postsList li {
  display: block;
  font-size: 1em;
  background: rgba(0,0,0,0.05);
  padding: 1.5em 2em;
  margin: 1em 0;
  border: 1px solid rgba(0,0,0,0.1);
}

```

posts/client/postsList.js

```
Meteor.subscribe('latestPosts');

Template.postsList.posts = function () {
  return Posts.find();
}

```

Original Post: [https://mnmtanish.svbtle.com/another-hello-world-to-meteorjs](https://mnmtanish.svbtle.com/another-hello-world-to-meteorjs)

