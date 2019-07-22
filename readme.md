![](https://github.com/zeit/art/blob/e081cf46e6609b51ac485dcc337ac6644c0da5e7/slackin/repo-banner.png)

## Features

- A landing page you can point users to fill in their emails and receive an invite (`https://slack.yourdomain.com`)
- An `<iframe>` badge to embed on any website that shows connected users in *realtime* with socket.io.
- A SVG badge that works well from static mediums (like GitHub README pages)
- Abuse prevention via [Google reCAPTCHA](https://www.google.com/recaptcha/intro/)

## Usage

### Badges

#### Realtime ([demo](https://cldup.com/IaiPnDEAA6.gif))

```html
<script async defer src="https://slack.yourdomain.com/slackin.js"></script>
<!-- append "?large" to the URL for the large version -->
```

#### SVG ([demo](https://cldup.com/jWUT4QFLnq.png))

```html
<img src="https://slack.yourdomain.com/badge.svg">
```

## API

Loading `slackin` will return a `Function` that creates a `HTTP.Server` instance:

```js
const slackin = require('slackin')

slackin.default({
  token: 'yourtoken',                             // required
  interval: 1000,
  org: 'your-slack-subdomain',                    // required
  path: '/some/path/you/host/slackin/under/',     // defaults to '/'
  channels: 'channel,channel,...',                // for single channel mode
  silent: false                                   // suppresses warnings
}).listen(3000)
```

This will show response times from Slack and how many online users you have on the console. The returned `http.Server` has an `app` property that is the `express` application that you can define or override routes on.

All the metadata for your organization can be fetched via a JSON HTTP request to `/data`.

## Caught a Bug?

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Uninstall slackin if it's already installed: `npm uninstall -g slack`
3. Link it to the global module directory: `npm link`
4. Transpile the source code and watch for changes: `npm start`

Yey! Now can use the `slack` command everywhere.
