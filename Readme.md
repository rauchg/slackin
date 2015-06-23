
# slackin

A little server that enables public access
to a Slack server. Like Freenode, but on Slack.

It provides

- A landing page you can point users to fill in their
  emails and receive an invite (`http://slack.yourdomain.com`)
- An `<iframe>` badge to embed on any website
  that shows connected users in *realtime* with socket.io.
- A SVG badge that works well from static mediums
  (like GitHub README pages)

Read more about the [motivations and history](http://rauchg.com/slackin) behind Slackin.

## How to use

### Server

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/rauchg/slackin/tree/0.5.1)

Or install it and launch it on your server:

```bash
$ npm install -g slackin
$ slackin "your-slack-subdomain" "your-slack-token"
```

You can find your API token at [api.slack.com/web](https://api.slack.com/web) – note that the user you use to generate the token must be an admin. You may want to create a dedicated `@slackin-inviter` user (or similar) for this.

The available options are:

```
Usage: slackin [options] <slack-subdomain> <api-token>

Options:

  -h, --help               output usage information
  -V, --version            output the version number
  -p, --port <port>        Port to listen on [$PORT or 3000]
  -c, --channels [<chan>]  One or more comma-separated channel names to allow single-channel guests [$SLACK_CHANNELS]
  -i, --interval <int>     How frequently (ms) to poll Slack [$SLACK_INTERVAL or 1000]
  -s, --silent             Do not print out warns or errors
```

**Important: if you use Slackin in single-channel mode, you'll only be
able to invite as many external accounts as paying members you have
times 5. If you are not getting invite emails, this might be the reason.
Workaround: sign up for a free org, and set up Slackin to point to it
(all channels will be visible).**

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
  channels: 'channel,channel,...' // for single channel mode
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
