/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import uuid from 'uuid';
import server, { baseApiUrl } from '../index';
import {
  MISSING_UNIQUE_INTERNAL,
  MISSING_UNIQUE_MESSAGE,
} from '../middleware/unique-transaction-messages';
import customerModel from '../models/customer';

// TODO: Need to handle a test configuration for a test database

process.env.NODE_ENV = 'test';
const should = chai.should();
chai.use(chaiHttp);
let token = '';

describe('Customers', () => {
  before((done) => { // Before each test we empty the database
    server.on('appServerStarted', () => {
      const customerSet = customerModel(server.db);
      customerSet.destroy({ where: { ssn: '017365678' } })
        .then((rowDeleted) => {
          chai.request(server)
            .post(`${baseApiUrl}/authenticate`)
            .send({
              username: 'testuser',
              password: '12345678'
            })
            .end((err, res) => {
              token = res.body.token;
              done();
            });
        })
    });
  });

  describe('/GET CUSTOMERS:Id', () => {
    it('It should get customer corresponding to that Id', (done) => {
      // const foo = 'bar';
      // foo.should.equal('bar');
      // done();
      chai.request(server)
        .get(`${baseApiUrl}/users/502a0ff8-0511-45ea-93d5-5cd611d79581`)
        .set('X-Unique-Transaction-ID', uuid.v4())
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.body.data.should.be.a('object');
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/GET CUSTOMERS:Id no X-Unique-Transaction-ID', () => {
    it('It should get bad request because X-Unique-Transaction-ID is not present in the headers', (done) => {
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

  describe('POST CUSTOMERS', () => {
    it('It should add a new customer', (done) => {
      const newCustomer = {
        ssn: '017365678',
        firstName: 'Jessica',
        surname: 'Hall',
        address1: '803 22th St N 3 1',
        city: 'New York',
        stateCode: 'NY',
        postalCode: '74586',
        countryCode: 'USA',
        birthDate: '1990-12-22',
        mobilePhoneNumber: '5551133899',
        emailAddress: 'jessicamail@mail.com',
        driverLicense: '657654321012345',
        driverLicenseIssueLocation: 'NY',
        driverLicenseIssueDate: '2015-12-02',
        driverLicenseExpirationDate: '2022-12-02',
        thirdPartyUserId: 'user3@example.com',
      };
      chai.request(server)
        .post(`${baseApiUrl}/users`)
        .set('X-Unique-Transaction-ID', uuid.v4())
        .set('Authorization', `Bearer ${token}`)
        .send(newCustomer)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });
});
