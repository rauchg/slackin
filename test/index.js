import nock from 'nock';
import request from 'supertest';
import slackin from '../lib/index';

describe('slackin', () => {
  describe('POST /invite', () => {
    let mockNumUsers = (org) => {
      nock(`https://${org}.slack.com`)
        .get('/api/rtm.start?token=mytoken')
        .reply(200, {
          channels: [{}],
          team: {
            name: 'myteam',
            icon: {}
          },
          users: [{}]
        });
    };

    it("returns success for a successful invite", (done) => {
      let opts = {
        token: 'mytoken',
        org: 'myorg'
      };

      // TODO simplify mocking
      mockNumUsers(opts.org);
      nock(`https://${opts.org}.slack.com`)
        .post('/api/users.admin.invite')
        .reply(200, { ok: true });

      let app = slackin(opts);

      request(app)
        .post('/invite')
        .send({ email: 'foo@example.com' })
        .expect('Content-Type', /json/)
        .expect(200, { msg: 'success' })
        .end(done);
    });

    it("returns a failure for a failure message", (done) => {
      let opts = {
        token: 'mytoken',
        org: 'myorg'
      };

      // TODO simplify mocking
      mockNumUsers(opts.org);
      nock(`https://${opts.org}.slack.com`)
        .post('/api/users.admin.invite')
        .reply(200, {
          ok: false,
          error: "other error"
        });

      let app = slackin(opts);

      request(app)
        .post('/invite')
        .send({ email: 'foo@example.com' })
        .expect('Content-Type', /json/)
        .expect(400, { msg: "other error" })
        .end(done);
    });
  });
});
