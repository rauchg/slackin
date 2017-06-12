![](https://github.com/zeit/art/blob/e081cf46e6609b51ac485dcc337ac6644c0da5e7/slackin/repo-banner.png)

## Features

- A landing page you can point users to fill in their emails and receive an invite (`https://slack.yourdomain.com`)
- An `<iframe>` badge to embed on any website that shows connected users in *realtime* with socket.io.
- A SVG badge that works well from static mediums (like GitHub README pages)
- Abuse prevention via [Google reCAPTCHA](https://www.google.com/recaptcha/intro/)

Check out the [Demo](https://slackin.now.sh/) or read more about the [motivations and history](http://rauchg.com/slackin) behind Slackin.

## Usage

Set up [Now](https://zeit.co/now) on your device and run this command. [Now](https://zeit.co/now) will automatically ask you for the required information and then spin up a deployment instantly. That easy!

```bash
now rauchg/slackin
```

Other platforms:

- [Heroku](https://heroku.com/deploy?template=https://github.com/rauchg/slackin/tree/master)
- [Azure](https://azuredeploy.net/)
- [OpenShift](https://github.com/rauchg/slackin/wiki/OpenShift)
- [IBM Bluemix](https://bluemix.net/deploy?repository=https://github.com/rauchg/slackin)

### Tips

Your team id is what you use to access your login page on Slack (eg: https://**{this}**.slack.com).

You can find or generate your API test token at [api.slack.com/web](https://api.slack.com/web) – note that the user you use to generate the token must be an admin. You need to create a dedicated `@slackin-inviter` user (or similar), mark that user an admin, and use a test token from that dedicated admin user.  Note that test tokens have actual permissions so you do not need to create an OAuth 2 app. Also check out the Slack docs on [generating a test token](https://get.slack.help/hc/en-us/articles/215770388-Creating-and-regenerating-API-tokens).

**Important:** If you use Slackin in single-channel mode, you'll only be
able to invite as many external accounts as paying members you have
times 5. If you are not getting invite emails, this might be the reason.
Workaround: sign up for a free org, and set up Slackin to point to it
(all channels will be visible).

Here is where to [generate a secret and
sitekey](https://www.google.com/recaptcha/admin) for Google reCAPTCHA.

### Badges

#### Realtime ([demo](https://cldup.com/IaiPnDEAA6.gif))

```html
<script async defer src="https://slack.yourdomain.com/slackin.js"></script>
<!-- append "?" to the URL for the large version -->
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
