/// @addtogroup watchstock-server
/// @{
/// @file index.js
/// @brief: 
///
/// Author: Pedro Palomo Perez
/// Mail: pedro.palomoperez@gmail.com
/// Github: pedropalomo
/// Revision: 1.0

const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');


const Stock = mongoose.model('stock');

describe('Stocks controller', () => {

  
  it ('Post new stock in the collection FB', (done) => {

    var current_date = new Date();
    var one_year_before = new Date(current_date);
    one_year_before.setMonth(one_year_before.getMonth() - 12);
    
    var request_data = {
      code: "FB",
      start_date: one_year_before,
      end_date: current_date
    };
    

    request(app)
      .post('/')
      .send(request_data)
      .end((err, res) => {
       
          console.log("Sent request", res.body);
          done();
    });
  });
  
  
  it ('Post new stock in the collection GOOGL', (done) => {

    var request_data = {
      code: "GOOGL",
      start_date: '2014-12-21',
      end_date: '2014-12-31'
    };

    request(app)
      .post('/')
      .send(request_data)
      .end((err, res) => {
       
          console.log("Sent request", res.body);
          done();
    });
  });
  
  it ('Post new stock in the collection GOOGL repeated', (done) => {

    var request_data = {
      code: "GOOGL",
      start_date: '2014-12-21',
      end_date: '2014-12-31'
    };

    request(app)
      .post('/')
      .send(request_data)
      .end((err, res) => {
       
          console.log("Sent request", res.body);
          done();
    });
  });

  it ('Get all the stocks in the collection ', (done) => {
    
    request(app)
      .get('/all')
      .send()
      .end((err, res) => {
       
          //console.log("Sent request", res.body);
          done();
    });
  });
  

  it ('Delete stock in the collection ', (done) => {
    
    var request_data = {
      code: "FB",
    };
    
    request(app)
        .post('/delete')
        .send(request_data)
        .end((err, res) => {
         
            //console.log("Sent request", res.body);
            done();
    });
  });
  
  it ('Get logo from microsoft API', (done) => {

    var request_data = {
      code: "FB",
      start_date: '2014-12-21',
      end_date: '2014-12-31'
    };

    request(app)
      .get('/logo')
      .send(request_data)
      .end((err, res) => {
       
          //console.log("Sent request", res.body.value[0]);
          done();
    });
  });
  
  it ('Get logo from GOOGL API', (done) => {

      var request_data = {
        code: "GOOGL",
        start_date: '2014-12-21',
        end_date: '2014-12-31'
      };
  
      request(app)
        .get('/logo')
        .send(request_data)
        .end((err, res) => {
         
            //console.log("Sent request", res.body.value[0]);
            done();
      });
  });
  
    it ('Get list of stocks', (done) => {

      request(app)
        .get('/list')
        .send()
        .end((err, res) => {
         
          console.log("Sent request", res.body);
          done();
      });
  });
});


/// @}