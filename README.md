# serverless-helpers

[![Build Status](https://travis-ci.com/ITcutives/serverless-helpers.svg?branch=master)](https://travis-ci.com/ITcutives/serverless-helpers)

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

```ecmascript 6
module.exports.handler = (event, context, cb) => {
  const request = Request.normaliseLambdaRequest(event);
  const response = new Response();
  
  //... handle request, eg.
  handleEvent(request, response)
    .then(response => LambdaResponseFormatter.finish(cb, response))
    .catch(error => LambdaResponseFormatter.errorHandler(cb, error));
};
```

### boom-to-jsonapi

**Require**

```ecmascript 6
const boomToJsonAPI = require('@itcutives/serverless-helpers/src/boom-to-jsonapi');
```

**Unclassified Error**

```ecmascript 6
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

```ecmascript 6
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

```ecmascript 6
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
