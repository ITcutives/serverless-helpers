/**
 * Created by ashish on 1/2/17.
 */
const reflect = (promise) => promise.then((v) => ({ v, status: 'resolved' }), (e) => ({ e, status: 'rejected' }));

const mapReflect = (promises) => Promise.all(promises.map(reflect));

module.exports = { reflect, mapReflect };
