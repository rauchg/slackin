import assert from 'assert';
import nock from 'nock';
import request from 'supertest';
import slackin, { restrictChannels } from '../lib/index';

describe('slackin', () => {
  describe('.restrictChannels()', () => {
    it("returns the same list when the query is empty", () => {
      let results = restrictChannels(['foo', 'bar'], {query: {}});
      assert.deepEqual(results, ['foo', 'bar']);
    });

    it("returns the same list when the channel isn't in the list", () => {
      let results = restrictChannels(['foo', 'bar'], {query: {channel: 'baz'}});
      assert.deepEqual(results, ['foo', 'bar']);
    });

    it("returns undefined when there are no channels to restrict", () => {
      let results = restrictChannels(undefined, {query: {channel: 'foo'}});
      assert.equal(results, undefined);
    });

    it("returns undefined when there is an empty list of channels to restrict", () => {
      let results = restrictChannels([], {query: {channel: 'foo'}});
      assert.deepEqual(results, []);
    });
  });

  describe('POST /invite', () => {
    beforeEach(() => {
      nock('https://myorg.slack.com')
        .get('/api/users.list')
        .query({token: 'mytoken', presence: '1'})
        .query({token: 'mytoken'})
        .reply(200, {
          ok: true,
          members: [{}]
        });

      nock('https://myorg.slack.com')
        .get('/api/channels.list?token=mytoken')
        .reply(200, {
          ok: true,
          channels: [{}]
        });

      nock('https://myorg.slack.com')
        .get('/api/team.info?token=mytoken')
        .reply(200, {
          ok: true,
          team: {icon: {}}
        })
    });

    it("returns success for a successful invite", (done) => {
      let opts = {
        token: 'mytoken',
        org: 'myorg'
      };

      // TODO simplify mocking
      nock(`https://${opts.org}.slack.com`)
        .post('/api/users.admin.invite')
        .reply(200, { ok: true });

      let app = slackin(opts);

      request(app)
        .post('/invite')
        .send({ email: 'foo@example.com' })
        .expect('Content-Type', /json/)
        .expect(200, { msg: 'WOOT. Check your email!' })
        .end(done);
    });

    it("returns a failure for a failure message", (done) => {
      let opts = {
        token: 'mytoken',
        org: 'myorg'
      };

      // TODO simplify mocking
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
