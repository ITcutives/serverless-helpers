/**
 * Created by ashish on 3/7/17.
 */
const common = require('../src/common');

describe('common', () => {
  describe('mapReflect', () => {
    it('should return all with `resolved` when all promises are resolved - but function always resolves', async () => {
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

      expect(await common.mapReflect(promise)).toEqual(expectation);
    });

    it('should return all with correct status when some resolved and some rejected - but function always resolves', async () => {
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
      expect(await common.mapReflect(promise)).toEqual(expectation);
    });

    it('should return all with `rejected` when all promises are rejected - but function always resolves', async () => {
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
      expect(await common.mapReflect(promise)).toEqual(expectation);
    });
  });
});
