# Tiny Rest

An absolutely tiny [9 LOC] REST API client, with no functionality omitted!

Fully typed for TS using JSDoc, with no build process required.

## Install:

```bash
npm i tiny-rest
```

## Usage:

```js
import tinyRest from 'tiny-rest'

const githubUsers = tinyRest('https://api.github.com/users/') // trailing '/' is important!

// fetches https://api.github.com/users/ThaUnknown/repos?direction=desc&per_page=100&sort=updated
const reposResponse = await githubUsers('ThaUnknown/repos', { sort: 'updated', direction: 'desc', per_page: 100 })

const userRepos = await reposResponse.json()
```

## With extra options:

```js
import tinyRest from 'tiny-rest'

// fetch options passed every time restEndpoint makes a query
const restEndpoint = tinyRest('https://api.website.com/rest/', { mode: 'cors', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer *token*' } })

const restResponse = await restEndpoint('slug', { sort: 'updated' })

const restText = await restResponse.text()
```

## Use a custom generator to create duplicate keys:

```js
function * yieldDuplicateKeys(i = 10) {
  while (--i) yield ['key', 'value']
}

// searchParams: ?key=value&key=value&key=value&key=value&key=value&key=value&key=value&key=value&key=value
const restResponse = await restEndpoint('slug', yieldDuplicateKeys(10))
```

### About:

This library uses W3C Web API's built into all modern environments: [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch#browser_compatibility) and [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL#browser_compatibility), if you're running an older environment, simply polyfill those globally.

Search Parameters are always sorted to improve request caching.
