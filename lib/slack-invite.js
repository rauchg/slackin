
import request from 'superagent';

export default function invite({ org, token, email, channel }, fn){
  let data = { email, token };

  if (channel) {
    data.channel = channel;
    data.ultra_restricted = 1;
    data.set_active = true;
  }

  request
  .post(`https://${org}.slack.com/api/users.admin.invite`)
  .type('form')
  .send(data)
  .end(function(err, res){
    if (err) return fn(err);
    if (200 != res.status) {
      fn(new Error(`Invalid response ${res.status}.`));
      return;
    }
    fn(null);
  });
}
