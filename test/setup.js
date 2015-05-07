import nock from 'nock';

nock.disableNetConnect();
// allow websockets
nock.enableNetConnect(/127\.0\.0\.1:\d+/);
