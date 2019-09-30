![](https://github.com/zeit/art/blob/e081cf46e6609b51ac485dcc337ac6644c0da5e7/slackin/repo-banner.png)

## Features

- A landing page you can point users to fill in their emails and receive an invite (`https://slack.yourdomain.com`)
- A SVG badge that works well from static mediums (like GitHub README pages)
- Abuse prevention via [Google reCAPTCHA v3](https://www.google.com/recaptcha/intro/v3.html)

## Getting started

Download the code:

```bash
git clone https://github.com/rauchg/slackin.git
cd slackin
```

Create a new file called `dev.sh` in the root and fill it out with your credentials:

```bash
RECAPTCHA_SITE_KEY="example" \
RECAPTCHA_SECRET_KEY="example" \
SLACK_OAUTH_ACCESS_TOKEN="example" \
SLACK_LEGACY_TOKEN="example" \
SLACK_CHANNELS="general, contributors" \
SLACK_COC="https://github.com/zeit/next.js/blob/canary/CODE_OF_CONDUCT.md" \
yarn dev
```

- You can get your reCAPTCHA keys [here](https://www.google.com/recaptcha/admin/create), we use reCAPTCHA V3
- For Slack you'll need a [legacy token](https://api.slack.com/custom-integrations/legacy-tokens). You can also [create an OAuth app](https://api.slack.com/apps?new_app=1) and add the required permissions: `channels:read`, `users:read`, `team:read`. Then the OAuth app will be used for most Slack API calls instead of the less secure legacy token, but keep in mind the legacy token is still required to [handle invites](https://github.com/ErikKalkoken/slackApiDoc/blob/master/users.admin.invite.md)
- `SLACK_COC` is a link to the code of conduct for your Slack. It's not required

Install modules and run:

```bash
yarn
./dev.sh
```

### Badge

#### SVG ([demo](https://cldup.com/jWUT4QFLnq.png))

```html
<img src="https://slack.yourdomain.com/badge.svg" />
```

## Caught a Bug?

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Follow the [getting started](#getting-started) steps to run the app
3. Add the changes and create a PR from your fork to this repo
