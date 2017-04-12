'use strict';

var responses = require('../../components/responses');

module.exports = {
  
   bad_request: {
    statusCode: 400,
    code: responses.kstaddresses400.code,
    message: 'Blocks - Bad request'
  },

  internal_ddbb_error: {
    statusCode: 500,
    code: responses.kstgeneral500.code,
    message: 'Blocks - Internal ddbb error'
  },

  eth_web3_error: {
  	statusCode: 512,
  	code: responses.ksteth512.code,
  	message: 'Blocks - Ethereum web3 error'
  },

  eth_web3_ok: {
  	statusCode: 200,
  	code: responses.ksteth200.code,
  	message: 'Blocks - Ethereum web3 operation successful'
  }

};
