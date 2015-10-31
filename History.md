
0.6.0 / 2015-10-05
==================

  * use faster API methods: users.list to get presence
  * fix polling interval increase
  * allow hosting slackin under a path (eg: /slack)
  * fix for deployment instructions
  * add already registered link
  * use SLACK_CHANNELS instead of SLACK_CHANNEL on Heroku
  * standardize use of example host
  * allow hosting at a subfolder

0.5.1 / 2015-06-23
==================

  * added safety check for channels.
  * fix counting deleted users

0.5.0 / 2015-05-07
==================

  * allow for multiple guest channels [afeld]
  * add important notes to README
  * better error handling and tests [afeld]
  * add Slack favicon and better title [frabrunelle]
  * error when the token account is not an admin [martypenner]
  * added Dockerfile [darron]

0.4.0 / 2015-04-10
==================

 * use SVG Heroku button
 * fixed svg dimensions issues
 * exclude bots (and slackbot) from users count
 * improve mobile zoom
 * use `<input type="email">`
 * fix for single-channel guests invitation parameter name

0.3.1 / 2015-03-16
==================

 * fix meta tags for mobile support

0.3.0 / 2015-03-06
==================

 * update `babel`, fix all scenarios

0.2.9 / 2015-03-03
==================

 * package: bump `socket.io`

0.2.8 / 2015-02-03
==================

 * bump socket.io

0.2.7 / 2015-02-02
==================

 * support for custom css

0.2.6 / 2015-02-01
==================

 * fix issue with 6to5 and `-g install`

0.2.5 / 2015-02-01
==================

 * fix single channel invites to be ultra restricted

0.2.4 / 2015-02-01
==================

 * bump 6to5

0.2.3 / 2015-02-01
==================

 * fixed heroku button

0.2.2 / 2015-01-30
==================

 * fixed ability to `require('slackin')`

0.2.1 / 2015-01-30
==================

 * improved startup speed by leveraging pre-compilation

0.2.0 / 2015-01-30
==================

 * improved CLI interface [buildkite]
 * support for ENV vars [buildkite]
 * deploy to heroku button [buildkite]

0.1.2 / 2015-01-28
==================

 * fix bin name [brianloweswords]

0.1.1 / 2015-01-26
==================

 * fix typo

0.1.0 / 2015-01-26
==================

 * initial release
