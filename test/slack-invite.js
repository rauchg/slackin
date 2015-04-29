import nock from 'nock';
import assert from 'assert';
import invite from '../lib/slack-invite';

describe('slack-invite', () => {
  describe('.invite()', () => {
    it("succeeds when ok", (done) => {
      var opts = {
        channel: 'mychannel',
        email: 'user@example.com',
        org: 'myorg',
        token: 'mytoken'
      };

      nock(`https://${opts.org}.slack.com`).post('/api/users.admin.invite').reply(200);

      invite(opts, (err) => {
        assert.equal(err, null);
        done();
      });
    });
  });
});
