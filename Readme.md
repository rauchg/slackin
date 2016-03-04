
# slackin

A little server that enables public access
to a Slack server. Like Freenode, but on Slack.

It provides

- A landing page you can point users to fill in their
  emails and receive an invite (`https://slack.yourdomain.com`)
- An `<iframe>` badge to embed on any website
  that shows connected users in *realtime* with socket.io.
- A SVG badge that works well from static mediums
  (like GitHub README pages)

Read more about the [motivations and history](http://rauchg.com/slackin) behind Slackin.

## How to use

### Server

#### Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/rauchg/slackin/tree/0.8.2)

#### Azure

[![Deploy to Azure](http://azuredeploy.net/deploybutton.svg)](https://azuredeploy.net/)

#### OpenShift

[Follow these instructions.](https://github.com/rauchg/slackin/wiki/OpenShift)

#### Cloud Foundry

##### IBM Bluemix
[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/rauchg/slackin)

For other CloudFoundry providers, [follow these instructions.](https://github.com/pivotal-cf/slackin/wiki/Cloud-Foundry)

#### Custom

Install it and launch it on your server:

```bash
$ npm install -g slackin
$ slackin "your-team-id" "your-slack-token"
```

Your team id is what you use to access your login page on Slack (eg: https://**{this}**.slack.com).

You can find your API token at [api.slack.com/web](https://api.slack.com/web) – note that the user you use to generate the token must be an admin. You need to create a dedicated `@slackin-inviter` user (or similar), mark that user an admin, and use a token from that dedicated admin user.

The available options are:

```
Usage: slackin [options] <team-id> <api-token>

Options:

  -h, --help                 output usage information
  -V, --version              output the version number
  -p, --port <port>          Port to listen on [$PORT or 3000]
  -h, --hostname <hostname>  Hostname to listen on [$HOSTNAME or 0.0.0.0]
  -c, --channels [<chan>]    One or more comma-separated channel names to allow single-channel guests [$SLACK_CHANNELS]
  -c, --channel <chan>       Single channel guest invite (deprecated) [$SLACK_CHANNEL]
  -i, --interval <int>       How frequently (ms) to poll Slack [$SLACK_INTERVAL or 5000]
  -P, --path                 Path to serve slackin under
  -s, --silent               Do not print out warns or errors
  -c, --css <file>           Full URL to a custom CSS file to use on the main page
```

**Important: if you use Slackin in single-channel mode, you'll only be
able to invite as many external accounts as paying members you have
times 5. If you are not getting invite emails, this might be the reason.
Workaround: sign up for a free org, and set up Slackin to point to it
(all channels will be visible).**

### Realtime Badge

[![](https://cldup.com/IaiPnDEAA6.gif)](http://slack.socket.io)

```html
<script async defer src="https://slack.yourdomain.com/slackin.js"></script>
```

or for the large version, append `?large`:

```html
<script async defer src="https://slack.yourdomain.com/slackin.js?large"></script>
```

### SVG

[![](https://cldup.com/jWUT4QFLnq.png)](http://slack.socket.io)

```html
<img src="https://slack.yourdomain.com/badge.svg">
```

Done in Markdown this looks like:

    [![Slack Status](https://slack.yourdomain.com/badge.svg)](https://yourdomain.com)

### Landing page

[![](https://cldup.com/WIbawiqp0Q.png)](http://slack.socket.io)

Point to `https://slack.yourdomain.com`.

**Note:** the image for the logo of the landing page
is retrieved from the Slack API. If your organization
doesn't have one configured, it won't be shown.

## API

Requiring `slackin` as a module will return
a `Function` that creates a `HTTP.Server` instance
that you can manipulate.

```js
require('slackin').default({
  token: 'yourtoken', // required
  interval: 1000,
  org: 'your-slack-subdomain', // required
  path: '/some/path/you/host/slackin/under/', // defaults to '/'
  channels: 'channel,channel,...' // for single channel mode
  silent: false // suppresses warnings
}).listen(3000);
```

This will show response times from Slack and how many
online users you have on the console.

By default logging is enabled.

## Developing

Slackin's server side code is written in ES6. It uses babel to transpile the 
ES6 code to a format node understands. After cloning Slackin, you should 
install the prerequisite node libraries with npm:

```bash
$ npm install
```

After the libraries install, the postinstall script will run `gulp` to invoke
babel on the source. It is important to run `gulp` manually after updating any 
files in lib/ to update the versions in node/.

## Credits

- The SVG badge generation was taken from the
excellent [shields](https://github.com/badges/shields) project.
- The button CSS is based on
[github-buttons](https://github.com/mdo/github-buttons).

## License

MIT
