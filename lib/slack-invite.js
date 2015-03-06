
import request from 'superagent';
import util from 'util';

export default function invite({ org, token, email, channel }, fn){
  let data = { email, token };

  if (channel) {
    data.channel = channel;
    data.channels = channel;
    data.ultra_restricted = 1;
    data.set_active = true;
    data._attempts = 1;
  }

  console.log(`Requesting invite with data=${util.inspect(data)}`);

  request
  .post(`https://${org}.slack.com/api/users.admin.invite`)
  .type('form')
  .send(data)
  .end(function(err, res){
    console.log(`Invitation request response: err=${err} res.status=${res.status} res.body.ok=${res.body.ok}`);
    if (err) return fn(err);
    if (200 != res.status) {
      fn(new Error(`Invalid response ${res.status}.`));
      return;
    }
    if (!res.body.ok) {
      fn(new Error(`Error inviting ${email}: ${res.body.error}.`));
      return;
    }
    fn(null);
  });
}
