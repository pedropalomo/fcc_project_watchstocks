/// @addtogroup watchstock-server
/// @{
/// @file test_helper.js
/// @brief: 
///
/// Author: Pedro Palomo Perez
/// Mail: pedro.palomoperez@gmail.com
/// Github: pedropalomo
/// Revision: 1.0


const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before(done => {
  
  mongoose.connect('mongodb://localhost/stocks_test');
  mongoose.connection
    .once('open', () => {
      
      const stock_collection   = mongoose.connection.collections.stocks;
      
      stock_collection.drop(() => {
        done();
      });  
      
    })
    .on('error', error => {
      console.warn('Warning', error);
    });
  
});

beforeEach(done => {
  
  done();
  
});

/// @}