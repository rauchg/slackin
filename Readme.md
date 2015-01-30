
# slackin

Let people invite themselves to your Slack.

[![](https://cldup.com/WIbawiqp0Q.png)](http://slack.socket.io)

You get:

- A landing page you can point users to
  (`http://slack.yourdomain.com`)
- An `<iframe>` badge to embed on any website
  that shows connected users in *realtime* with socket.io.
- A SVG badge that works well from static mediums
  (like GitHub README pages)

## How to use

### Server

Deploy it to Heroku:

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

Or install and launch it locally:

```bash
$ npm install -g slackin
$ slackin "your-slack-org-subdomain" "api-token"
```

You can find your API token at [api.slack.com/web](https://api.slack.com/web)

```
Usage: slackin [options] <slack-subdomain> <api-token>

Options:

  -h, --help            output usage information
  -V, --version         output the version number
  -p, --port <port>     Port to listen on [$PORT or 3000]
  -c, --channel <chan>  Single channel guest invite [$SLACK_CHANNEL]
  -i, --interval <int>  How frequently (ms) to poll Slack [$SLACK_INTERVAL or 1000]
  -s, --silent          Do not print out warns or errors
```

### Realtime Badge

[![](https://cldup.com/IaiPnDEAA6.gif)](http://slack.socket.io)

```html
<script async defer src="http://slackin.yourhost.com/slackin.js"></script>
```

or for the large version, append `?large`:

```html
<script async defer src="http://slackin.yourhost.com/slackin.js?large"></script>
```

### SVG

[![](https://cldup.com/jWUT4QFLnq.png)](http://slack.socket.io)

```html
<img src="http://slackin.yourhost.com/badge.svg">
```

### Landing page

[![](https://cldup.com/WIbawiqp0Q.png)](http://slack.socket.io)

Point to `http://slackin.yourhost.com`.

**Note:** the image for the logo of the landing page
is retrieved from the Slack API. If your organization
doesn't have one configured, it won't be shown.

## API

Requiring `slackin` as a module will return
a `Function` that creates a `HTTP.Server` instance
that you can manipulate.

```js
require('slackin')({
  token: 'yourtoken', // required
  interval: 1000,
  org: 'your-slack-subdomain', // required
  channel: 'channel' // for single channel mode,
  silent: false // suppresses warnings
}).listen(3000);
```

This will show response times from Slack and how many
online users you have on the console.

By default logging is enabled.

## Credits

- The SVG badge generation was taken from the
excellent [shields](https://github.com/badges/shields) project.
- The button CSS is based on 
[github-buttons](https://github.com/mdo/github-buttons).

## License

MIT
