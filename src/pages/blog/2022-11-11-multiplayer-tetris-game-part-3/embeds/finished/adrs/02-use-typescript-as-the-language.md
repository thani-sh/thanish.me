# 02. Use TypeScript as the language

Date: 2022-11-11

## Status

Accepted

## Context

The entire game code is written on a single js file which is at the moment 333 lines of code.
Since the game is not complete, this is expected to grow significantly.

While writing this code, there were several type errors which were only discovered at runtime
when the game crashed because of them.

## Decision

An ECMAScript proposal exists to add types to JavaScript but it could take years to get accepted.
As of now, TypeScript is the most commonly used typed language which transpiles to JavaScript.

- Translate all existing code to TypeScript and avoid using the `any` type.
- Split the code into multiple typescript files and import code where needed.

## Consequences

- Having types should help detect type related bugs at build time.
- Adding additional dependencies should increases maintenance work.
- The code is no longer runnable as-is (need to be transpiled & bundled).
