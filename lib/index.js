
// es6 runtime requirements
require('6to5/polyfill');

// their code
import express from 'express';
import sockets from 'socket.io';
import { json } from 'body-parser';
import { Server as http } from 'http';
import remail from 'email-regex';
import dom from 'vd';

// our code
import Slack from './slack';
import invite from './slack-invite';
import badge from './badge';
import splash from './splash';
import iframe from './iframe';
import log from './log';

export default function slackin({
  token,
  interval = 1000, // jshint ignore:line
  org,
  css,
  channel,
  silent = false // jshint ignore:line
}){
  // must haves
  if (!token) throw new Error('Must provide a `token`.');
  if (!org) throw new Error('Must provide an `org`.');

  // sanitize channel name
  if (channel && '#' == channel[0]) channel = channel.substr(1);

  // setup app
  let app = express();
  let srv = http(app);
  let assets = __dirname + '/assets';

  // fetch data
  let slack = new Slack({ token, interval, org, channel });

  // capture stats
  log(slack, silent);

  // middleware for waiting for slack
  app.use((req, res, next) => {
    if (slack.ready) return next();
    slack.once('ready', next);
  });

  // splash page
  app.get('/', (req, res) => {
    let { name, logo } = slack.org;
    let { active, total } = slack.users;
    if (!name) return res.send(404);
    let page = dom('html',
      dom('head',
        dom('title', 'Join us on Slack!'),
        css && dom('link rel=stylsheet', { href: css })
      ),
      splash({ css, name, logo, channel, active, total })
    );
    res.type('html');
    res.send(page.toHTML());
  });

  // static files
  app.use('/assets', express.static(assets));

  // invite endpoint
  app.post('/invite', json(), (req, res, next) => {
    if (channel && !slack.channel) {
      return res
      .status(500)
      .send({ msg: `Channel not found "${channel}"` });
    }

    let email = req.body.email;

    if (!email) {
      return res
      .status(400)
      .send({ msg: 'No email provided' });
    }

    if (!remail().test(email)) {
      return res
      .status(400)
      .send({ msg: 'Invalid email' });
    }

    let chanId = slack.channel ? slack.channel.id : null;
    invite({ token, org, email, channel: chanId }, function(err){
      if (err) return next(err);
      res.status(200).end();
    });
  });

  // iframe
  app.get('/iframe', (req, res) => {
    let large = 'large' in req.query;
    let { active, total } = slack.users;
    res.type('html');
    res.send(iframe({ active, total, large }).toHTML());
  });

  app.get('/iframe/dialog', (req, res) => {
    let { name } = slack.org;
    let { active, total } = slack.users;
    if (!name) return res.send(404);
    let dom = splash({ name, channel, active, total, iframe: true });
    res.type('html');
    res.send(dom.toHTML());
  });

  // badge js
  app.use('/slackin.js', express.static(assets + '/badge.js'));

  // badge rendering
  app.get('/badge.svg', (req, res) => {
    res.type('svg');
    res.send(badge(slack.users).toHTML());
  });

  // realtime
  sockets(srv).on('connection', socket => {
    socket.emit('data', slack.users);
    let change = (key, val) => socket.emit(key, val);
    slack.on('change', change);
    socket.on('disconnect', () => {
      slack.removeListener('change', change);
    });
  });

  return srv;
}
