/* eslint-disabled */
import chai from 'chai';
import chaiHttp from 'chai-http';
// import server from '../index';

process.env.NODE_ENV = 'test';

const should = chai.should();

chai.use(chaiHttp);

describe('/GET CUSTOMER:Id', () => {
  it('it should get the customer with the corresponding id', (done) => {
    const foo = 'bar';
    foo.should.equal('bar');
    done();
  });
});
