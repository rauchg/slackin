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
API_URL="http://localhost:3000" \
RECAPTCHA_SITE_KEY="example" \
RECAPTCHA_SECRET_KEY="example" \
SLACK_OAUTH_ACCESS_TOKEN="example" \
SLACK_LEGACY_TOKEN="example" \
SLACK_CHANNELS="general, contributors" \
SLACK_COC="https://github.com/zeit/next.js/blob/canary/CODE_OF_CONDUCT.md" \
yarn dev
```

- `API_URL` is the absolute URL used by slackin in production, or localhost, used for SSR requests
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

## Deployment to production

[ZEIT Now](https://zeit.co/home) is used for production with the following, already included, `now.json`:

```json
{
  "version": 2,
  "build": {
    "env": {
      "API_URL": "@slackin-api-url",
      "RECAPTCHA_SITE_KEY": "@slackin-recaptcha-site-key",
      "RECAPTCHA_SECRET_KEY": "@slackin-recaptcha-secret-key",
      "SLACK_OAUTH_ACCESS_TOKEN": "@slackin-slack-oauth-access-token",
      "SLACK_LEGACY_TOKEN": "@slackin-slack-legacy-token",
      "SLACK_COC": "https://github.com/zeit/next.js/blob/canary/CODE_OF_CONDUCT.md",
      "SLACK_CHANNELS": "general,test-channel"
    }
  }
}
```

The same rules for the local `dev.sh` are used, but here we use [Now Secrets](https://zeit.co/docs/v2/environment-variables-and-secrets) instead of hard-coded secrets.

For example, to add the secret for `API_URL` you'll have to do the following:

```bash
now secrets add @slackin-api-url https://mydomain.com
```

And the same goes for every other secret.

Once the secrets are in place, you only have to run `now`:

```bash
now
```

## Caught a Bug?

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Follow the [getting started](#getting-started) steps to run the app
3. Add the changes and create a PR from your fork to this repo
