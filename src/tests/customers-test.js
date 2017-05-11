/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server, { baseApiUrl } from '../index';
import {
  MISSING_UNIQUE_INTERNAL,
  MISSING_UNIQUE_MESSAGE
} from '../middleware/unique-transaction-messages'

// TODO: Need to handle a test configuration for a test database

process.env.NODE_ENV = 'test';
const should = chai.should();
chai.use(chaiHttp);

describe('Customers', () => {
  before((done) => { // Before each test we empty the database
    server.on('appServerStarted', () => {
      done();
    });
  });

  describe('/GET CUSTOMER:Id', () => {
    it('it should get customer corresponding to that Id', (done) => {
      // const foo = 'bar';
      // foo.should.equal('bar');
      // done();
      chai.request(server)
        .get(`${baseApiUrl}/users/502a0ff8-0511-45ea-93d5-5cd611d79581`)
        .set('X-Unique-Transaction-ID', '1')
        .end((err, res) => {
          res.body.data.should.be.a('object');
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/GET CUSTOMER:Id no X-Unique-Transaction-ID', () => {
    it('it should get bad request because X-Unique-Transaction-ID is not present in the headers', (done) => {
      // const foo = 'bar';
      // foo.should.equal('bar');
      // done();
      chai.request(server)
        .get(`${baseApiUrl}/users/502a0ff8-0511-45ea-93d5-5cd611d79581`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.result.code.should.equal(400);
          res.body.result.message.should.equal(MISSING_UNIQUE_MESSAGE);
          res.body.result.internal_code.should.equal(MISSING_UNIQUE_INTERNAL);
          done();
        });
    });
  });
});
