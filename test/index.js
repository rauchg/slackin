import nock from 'nock';
import request from 'supertest';
import slackin from '../lib/index';

describe('slackin', () => {
  describe('POST /invite', () => {
    it("returns success for a successful invite", (done) => {
      let opts = {
        token: 'mytoken',
        org: 'myorg'
      };

      // TODO simplify mocking
      nock(`https://${opts.org}.slack.com`)
        .get('/api/rtm.start?token=mytoken')
        .reply(200, {
          team: {
            name: 'myteam',
            icon: {}
          },
          users: [{}]
        });

      nock(`https://${opts.org}.slack.com`)
        .post('/api/users.admin.invite')
        .reply(200, { ok: true });

      let app = slackin(opts);

      request(app)
        .post('/invite')
        .send({ email: 'foo@example.com' })
        // .expect('Content-Type', /json/)
        .expect(200, {})
        .end(done);
    });
  });
});
