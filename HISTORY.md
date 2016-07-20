
0.13.0 / 2016-07-20
===================

  * index: add `/data` endpoint to get data through a JSON API

0.12.0 / 2016-07-20
===================

  * add options cors support
  * slack: improve error handling

0.11.3 / 2016-07-19
===================

  * package: don't forget about assets

0.11.2 / 2016-07-19
===================

  * package: fix broken `main`

0.11.1 / 2016-07-19
===================

  * package: fix usecase of `require('slackin')`

0.11.0 / 2016-07-19
===================

  * index: expose express app as `app` on the returned value of `slackin`

0.10.3 / 2016-07-19
===================

  * package: only publish `bin` and `dist`

0.10.2 / 2016-07-19
===================

  * package: remove postinstall

0.10.1 / 2016-07-19
===================

  * moving babel and gulp into dev deps [@rauchg]
  * package: remove `start` as it requires ENV stuff [@rauchg]

0.10.0 / 2016-07-19
===================

  * package: bump `socket.io` for security fixes

0.9.0 / 2016-07-19
==================

  * Important bug fixes (#208) [@leo]
  * Switch to args, lint code and clean up (#200) [@leo]
  * Update docs with more clear token generation info
  * Change heroku deploy to master
  * Update Dockerfile to match Procfile
  * issue #169, add turnary assignment for client sdk channels
  * Change case on the "already invited" message
  * Update Readme.md
  * Fix TypeError when submitting w/o SLACK_CHANNELS config

0.8.3 / 2016-03-08
==================

  * fix postMessage({}, '*') causes slackin to throw [@laughinghan]
  * add IBM Bluemix Deploy badge [@kevinSuttle]
  * add `?large` to `/iframe` and `/iframe/dialog` [@laughinghan]
  * convert dialog dimensions to em/rem for adjustability #prepwork [@laughinghan]
  * fix redirecting already-registered users from iframe dialog [@laughinghan]
  * add "or sign in" link to iframe too [@laughinghan]
  * render a hidden form field for a single channel [@nickstenning]
  * add .travis.yml [@jszwedko]
  * fix test for successful invite [@jszwedko]
  * update `babel-register` module name in mocha opts [@jszwedko]
  * update readme for babel 6 change [@danreeves]
  * shorten already-invited message [@MaxWofford]
  * add success message for already signed up users [@MaxWofford]
  * fix max listeners warnings [Hardeep Shoker]

0.8.2 / 2016-01-13
==================

  * use better supported anonymous function syntax [WouterSioen]
  * bump socket.io

0.8.1 / 2016-01-06
==================

  * index: fix `import` order issue

0.8.0 / 2016-01-06
==================

  * bump socket.io to 1.4.0 for sec advisory
  * add deploy to Azure Button
  * build: Update builds to use gulp and babel6 (Fixes #122)
  * adds instructions for deploying to Cloud Foundry
  * redirect signed up users to Slack
  * fix --path option parsing

0.7.3 / 2015-11-29
==================

  * package: bump `socket.io` to fix build issue

0.7.2 / 2015-11-29
==================

  * fix rendering of badge in non-chrome

0.7.1 / 2015-11-19
==================

  * fix inline badge styles

0.7.0 / 2015-11-19
==================

  * badge: make badge work for users with lots of users
  * splash: fix hover color – thank goodness
  * relative path hosting support
  * fix tests
  * add support for codes of conduct

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
