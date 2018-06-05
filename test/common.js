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
      let promise, expectation;
      promise = [
        Promise.resolve('1'),
        Promise.resolve('2')
      ];
      expectation = [{
        'v': '1',
        'status': 'resolved'
      }, {
        'v': '2',
        'status': 'resolved'
      }];

      common.mapReflect(promise).should.eventually.eql(expectation).notify(done);
    });

    it('should return all with correct status when some resolved and some rejected - but function always resolves', (done) => {
      let err, promise, expectation;
      err = new Error('message');
      promise = [
        Promise.resolve('1'),
        Promise.reject(err)
      ];
      expectation = [{
        'v': '1',
        'status': 'resolved'
      }, {
        'e': err,
        'status': 'rejected'
      }];
      common.mapReflect(promise).should.eventually.eql(expectation).notify(done);
    });

    it('should return all with `rejected` when all promises are rejected - but function always resolves', (done) => {
      let err1, err2, promise, expectation;
      err1 = new Error('message-1');
      err2 = new Error('message-2');
      promise = [
        Promise.reject(err1),
        Promise.reject(err2)
      ];
      expectation = [{
        'e': err1,
        'status': 'rejected'
      }, {
        'e': err2,
        'status': 'rejected'
      }];
      common.mapReflect(promise).should.eventually.eql(expectation).notify(done);
    });
  });
});
