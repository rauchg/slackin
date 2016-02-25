import nock from 'nock';
import assert from 'assert';
import invite from '../lib/slack-invite';

describe('slack-invite', () => {
  describe('.invite()', () => {
    var opts;

    before(() => {
      opts = {
        channel: 'mychannel',
        email: 'user@example.com',
        org: 'myorg',
        token: 'mytoken'
      };
    });

    it("succeeds when ok", (done) => {
      nock(`https://${opts.org}.slack.com`).
        post('/api/users.admin.invite').
        reply(200, { ok: true });

      invite(opts, (err) => {
        assert.equal(err, null);
        done();
      });
    });

    it("passes along an error message", (done) => {
      nock(`https://${opts.org}.slack.com`).
        post('/api/users.admin.invite').
        reply(200, {
          ok: false,
          error: "other error"
        });

      invite(opts, (err) => {
        assert.notEqual(err, null);
        assert.equal(err.message, "other error");
        done();
      });
    });
  });
});
