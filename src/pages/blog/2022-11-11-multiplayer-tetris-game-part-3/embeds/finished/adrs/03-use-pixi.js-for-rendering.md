# 03. Use pixi.js for rendering

Date: 2022-11-11

## Status

Accepted

## Context

The renderer used by the game is written using code which directly calls HTML Canvas APIs.
The effort required to write code requried to render shapes can be significantly reduced
by using a library.

## Decision

Use PixiJS which is a rendering library which can render shapes and text with a low overhead.

## Consequences

- Using a library forces us to work within the API given to us by the library.
- Adding additional dependencies should increases maintenance work.
