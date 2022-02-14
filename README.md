# serverless-helpers

[![Build Status](https://travis-ci.com/ITcutives/serverless-helpers.svg?branch=master)](https://travis-ci.com/ITcutives/serverless-helpers) [![Greenkeeper badge](https://badges.greenkeeper.io/ITcutives/serverless-helpers.svg)](https://greenkeeper.io/)

Serverless Request/Response Handlers

## Usage

### `Request`, `Response`, and `LambdaResponseFormatter`

**Require**

```ecmascript 6
const Request = require('@itcutives/serverless-helpers/src/request');
const Response = require('@itcutives/serverless-helpers/src/response');
const LambdaResponseFormatter = require('@itcutives/serverless-helpers/src/lambdaResponseFormatter');

```

**Usage**

```js
module.exports.handler = async () => {
  const request = REQ.normaliseLambdaRequest(event);
  const response = new RES();

  try {
    //... open db connection, handle request etc ... 
    const resp = await handleEvent(request, response);
    // response.respond(<status-code>, <response-body>, <headers>);
    // eg. response.respond(200, JSON.stringify({test: 1}), { 'content-type': 'application/json' });
    return LambdaResponseFormatter.responseHandler(resp);
  } catch (e) {
    return LambdaResponseFormatter.errorHandler(e);
  }
};
```

### `LambdaResponseFormatter` middleware

To handle the clean up operations before responding. such as close db connection etc...

```js
const LambdaResponseFormatter = require('@itcutives/serverless-helpers/src/lambdaResponseFormatter');

class ResponseHandler extends LambdaResponseFormatter {
  static async middleware(response) {
    // add remove header etc.
    // close db connection
    return true;
  }
}

module.exports = ResponseHandler;
```

Once you have above, your `handler` function should use `ResponseHandler` class instead of `LambdaResponseFormatter`

### boom-to-jsonapi

**Require**

```js
const boomToJsonAPI = require('@itcutives/serverless-helpers/src/boom-to-jsonapi');
```

**Unclassified Error**

```js
boomToJsonAPI(new Error('random error'));
// {
//   errors: [{
//     status: '500',
//     title: 'Internal Server Error',
//     detail: 'An internal server error occurred',
//     code: undefined
//   }]
// }
```

**Boom Error**

```js
boomToJsonAPI(Boom.badRequest('BAD Request'));
// {
//   errors: [{
//     status: '400',
//     title: 'Bad Request',
//     detail: 'BAD Request',
//     code: undefined
//   }]
// }
```

**Boom Error with Code**

```js
boomToJsonAPI(Boom.badRequest('CODE :Some Error:it happened'));
// {
//   errors: [{
//     status: '400',
//     title: 'Bad Request',
//     detail: 'Some Error:it happened',
//     code: 'CODE'
//   }]
// }
```

## Example

```bash
cd example
# install dependencies
npm i
# run api offline
npm run offline
```

- to see Success Response: `http://localhost:3000/v1/success`

- to see Error Response: `http://localhost:3000/v1/error`
