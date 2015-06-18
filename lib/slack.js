
import request from 'superagent';
import { EventEmitter } from 'events';

export default class SlackData extends EventEmitter {

  constructor({ token, interval, org: host }){
    this.host = host;
    this.token = token;
    this.interval = interval;
    this.ready = false;
    this.org = {};
    this.users = {};
    this.channelsByName = {};
    this.fetch();
  }

  fetch(){
    request
    .get(`https://${this.host}.slack.com/api/rtm.start`)
    .query({ token: this.token })
    .end((err, res) => {
      this.onres(err, res);
    });
    this.emit('fetch');
  }

  getChannelId(name){
    let channel = this.channelsByName[name];
    return channel ? channel.id: null;
  }

  retry(){
    let interval = this.interval * 2;
    setTimeout(this.fetch.bind(this), interval);
    this.emit('retry');
  }

  onres(err, res){
    if (err) {
      this.emit('error', err);
      return this.retry();
    }

    // reset the list of channels
    this.channelsByName = {};
    (res.body.channels || []).forEach(channel => {
      this.channelsByName[channel.name] = channel;
    });

    let users = res.body.users;

    if (!users) {
      let err = new Error(`Invalid Slack response: ${res.status}`);
      this.emit('error', err);
      return this.retry();
    }

    // remove slackbot and bots from users
    // slackbot is not a bot, go figure!
    users = users.filter(x => {
      return x.id != "USLACKBOT" && !x.is_bot && !x.deleted;
    });

    let total = users.length;
    let active = users.filter(user => {
      return 'active' == user.presence;
    }).length;

    if (this.users) {
      if (total != this.users.total) {
        this.emit('change', 'total', total);
      }
      if (active != this.users.active) {
        this.emit('change', 'active', active);
      }
    }

    this.users.total = total;
    this.users.active = active;

    let team = res.body.team;
    this.org.name = team.name;
    if (!team.icon.image_default) {
      this.org.logo = team.icon.image_132;
    }

    if (!this.ready) {
      this.ready = true;
      this.emit('ready');
    }

    setTimeout(this.fetch.bind(this), this.interval);
    this.emit('data');
  }

}
