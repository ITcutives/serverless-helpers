/**
 * Created by ashish on 3/7/17.
 */
const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

const common = require('../src/common');

chai.use(sinonChai);
chai.use(chaiAsPromised);

chai.should();

describe('common', () => {
  describe('mapReflect', () => {
    it('should return all with `resolved` when all promises are resolved - but function always resolves', (done) => {
      const promise = [
        Promise.resolve('1'),
        Promise.resolve('2'),
      ];
      const expectation = [{
        v: '1',
        status: 'resolved',
      }, {
        v: '2',
        status: 'resolved',
      }];

      common.mapReflect(promise).should.eventually.eql(expectation).notify(done);
    });

    it('should return all with correct status when some resolved and some rejected - but function always resolves', (done) => {
      const err = new Error('message');
      const promise = [
        Promise.resolve('1'),
        Promise.reject(err),
      ];
      const expectation = [{
        v: '1',
        status: 'resolved',
      }, {
        e: err,
        status: 'rejected',
      }];
      common.mapReflect(promise).should.eventually.eql(expectation).notify(done);
    });

    it('should return all with `rejected` when all promises are rejected - but function always resolves', (done) => {
      const err1 = new Error('message-1');
      const err2 = new Error('message-2');
      const promise = [
        Promise.reject(err1),
        Promise.reject(err2),
      ];
      const expectation = [{
        e: err1,
        status: 'rejected',
      }, {
        e: err2,
        status: 'rejected',
      }];
      common.mapReflect(promise).should.eventually.eql(expectation).notify(done);
    });
  });
});
