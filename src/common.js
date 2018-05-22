/**
 * Created by ashish on 1/2/17.
 */
let reflect,
  mapReflect;

reflect = (promise) => {
  return promise.then(function(v) {
    return {v: v, status: 'resolved'};
  }, function(e) {
    return {e: e, status: 'rejected'};
  });
};

mapReflect = function(promises) {
  return Promise.all(promises.map(reflect));
};

module.exports = {reflect, mapReflect};
