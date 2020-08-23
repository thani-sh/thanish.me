+++
author = "Thanish"
categories = ["js"]
date = 2016-09-07T18:30:00Z
description = ""
draft = false
slug = "rant--javascript-import-syntax"
tags = ["js"]
title = "Rant: JavaScript import syntax"

+++


The import syntax on javascript looks damn ugly when many items from a module. Take this example piece of code form a typical GraphQL code:

```
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql'
```

The most important part of the statement, the module gets overshadowed by the list of items we’re importing from it. The module name would stand out more if we write it like this (_warning: fake code ahead_).

```
from 'graphql' import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLList,
  GraphQLBoolean,
}
```

I’m not an expert in languages so if anyone knows why its done this way please let me know.

