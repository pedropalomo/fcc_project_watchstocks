
/// @addtogroup watchstock-server
/// @{
/// @file stocks.js
/// @brief: 
///
/// Author: Pedro Palomo Perez
/// Mail: pedro.palomoperez@gmail.com
/// Github: pedropalomo
/// Revision: 1.0

var http = require('http');
var https = require('https');
const assert = require('assert');
const Request = require("request");
const Stock = require('../models/stock_mdl');
const stock_list = require('./stock_names');
const socket = require('../app');

const quandl_key='ha-7_C88sseKEf5NQ7UR';
const microsoft_key1='1aa2b5ea4c784dfeaec2d3dd17b41058';
const microsoft_key2='33e78bf8e1bf4b89b2c6fe5c3995b786';


// ---------------------------------------------------------------------------
/// @brief:  
/// @param[in,out] name:
var getRandomColor = function() {
     var letters = '0123456789ABCDEF';
     var color = '#';
     for (var i = 0; i < 6; i++) {
       color += letters[Math.floor(Math.random() * 16)];
     }

     return color;
}

// ---------------------------------------------------------------------------
/// @brief:  
/// @param[in,out] name:
exports.getStocksList = function (req, res, next){
 
   res.json(stock_list);
}

// ---------------------------------------------------------------------------
/// @brief:  
/// @param[in,out] name:
exports.getLogoUrlTest = function (req, res, next){
 
  var code=req.body.code;
  var logo_host = 'https://api.cognitive.microsoft.com';
  var logo_request= '/bing/v5.0/images/search'+ 
                        '?q=' + code + '%20logo%20nasdaq'+  
                        '&count=1'; 

  var req = Request(
        {
            url: logo_host + logo_request,
            method: 'POST',
            headers: {                        
                'Content-Type': 'multipart/form-data',
                'Ocp-Apim-Subscription-Key': microsoft_key1,
            }
        }, function (error, response, body) {
            if (error) 
                res(error); //en caso de que algo salga mal, retornamos al cliente el error

            // si todo sale bien, devolvemos al cliente la respuesta del API
            var json = JSON.parse(body);
            //console.log ("--->>>>", body, json);
            res.json(json);
        });

}

// ---------------------------------------------------------------------------
/// @brief:  
/// @param[in,out] name:
exports.addStock= function(req, res, next) {

  var stock_period='daily';
  var stock_column=4;
  var stock_transform='diff';
  var req_props = req.body;
  
  var stock_request= 'https://www.quandl.com/api/v3/datasets/WIKI/'+ req_props.code +  
                        '.json?' + 
                        'api_key=' + quandl_key +
                        '&column_index=' + stock_column +
                        '&start_date=' + req_props.start_date + 
                        '&end_date=' + req_props.end_date;

  // console.log("request: ", stock_request);

  https.get(stock_request, (resp) => {
    var body = '';

    resp.on('data', function (chunk) {
        body += chunk;
    });

    resp.on('error', function(err) {
       console.log('error in http request')
    });

    resp.on('end', function () {
        var json = JSON.parse(body);
        
        if (!json.hasOwnProperty('quandl_error'))
        {
          // Store data in the 'Stock' collection
          var stockProps = {
              dataset_code : json.dataset.dataset_code,
              name         : json.dataset.name,
              start_date   : new Date(json.dataset.start_date),
              end_date     : new Date(json.dataset.end_date),
              color        : getRandomColor(),
              url_logo     : 'na',
              data         : json.dataset.data.map(val => 
                                  {return {date : val[0] , value : val[1] } ;})
          };
             
          Stock.create(stockProps)
            .then(stock => console.log("created new stock"))
            .catch(next)
          
          res.json(stockProps);
        }
        else {
          res.status(500).send({ error: 'company not found!' });
        }
    });
  });
}

// ---------------------------------------------------------------------------
/// @brief:  
/// @param[in,out] name:
exports.deleteStock= function(req, res, next) {

  var stockProps = req.body;
          
  //console.log("---->",stockProps);         
          
  Stock.remove({ dataset_code: stockProps.code })
      .then(stock => {
        res.status(204).send(stock);
        socket.fordwardMessage('update_delete', stockProps.code);
      })
      .catch(next);
}

// ---------------------------------------------------------------------------
/// @brief:  
/// @param[in,out] name:
exports.getStocks= function(req, res, next) {

  Stock.find({})
      .sort({ dataset_code: 1 })
      .then((stocks) => { 
        res.json(stocks);})
      .catch(next);
}


// ---------------------------------------------------------------------------
/// @brief:  
/// @param[in,out] name:
var addLogoStock= function(req, res, next, logo_url) {

  var stock_period='daily';
  var stock_column=4;
  var stock_transform='diff';
  var req_props = req.body;
  
  //console.log(req.body);
  
  var stock_request= 'https://www.quandl.com/api/v3/datasets/WIKI/'+ req_props.code +  
                        '.json?' + 
                        'api_key=' + quandl_key +
                        '&column_index=' + stock_column +
                        '&start_date=' + req_props.start_date + 
                        '&end_date=' + req_props.end_date;

  console.log("request: ", stock_request);
  
  https.get(stock_request, (resp) => {
    var body = '';

    resp.on('data', function (chunk) {
        body += chunk;
    });

    resp.on('error', function(err) {
       console.log('error in http request')
    });

    resp.on('end', function () {
        var json = JSON.parse(body);
        
        if (!json.hasOwnProperty('quandl_error'))
        {
          // Store data in the 'Stock' collection
          var stockProps = {
              dataset_code : json.dataset.dataset_code,
              name         : json.dataset.name,
              start_date   : new Date(json.dataset.start_date),
              end_date     : new Date(json.dataset.end_date),
              color        : getRandomColor(),
              url_logo     : logo_url,
              data         : json.dataset.data.map(val => 
                                  {return {date : val[0] , value : val[1] } ;})
          };
             
          Stock.create(stockProps)
            .then(stock => console.log("created new stock"))
            .catch(next)
          
          res.json(stockProps);
          socket.fordwardMessage('update_fetch', stockProps);
        }
        else {
          res.status(500).send({ error: 'company not found!' });
        }
    });
  });
}


// ---------------------------------------------------------------------------
/// @brief:  
/// @param[in,out] name:
exports.getLogoUrl = function (req, res, next){
 
  var code=req.body.code;
  var logo_host = 'https://api.cognitive.microsoft.com';
  var logo_request= '/bing/v5.0/images/search'+ 
                        '?q=' + code + '%20logo%20icon'+  
                        '&count=1'; 

  // console.log('getLogoUrl',logo_host + logo_request);  

  Stock.findOne({ dataset_code:  req.body.code })
    .then((stock) => {

      if (stock) {
        console.log('company already exists')
        res.status(500).send({ error: 'company already exists!' }); 
      } 
      else {
        var request = Request(
        {
            url: logo_host + logo_request,
            method: 'POST',
            headers: {                        
                'Content-Type': 'multipart/form-data',
                'Ocp-Apim-Subscription-Key': microsoft_key1,
            }
        }, function (error, response, body) {
            if (error) 
                res(error); //en caso de que algo salga mal, retornamos al cliente el error

            // si todo sale bien, devolvemos al cliente la respuesta del API
            var json = JSON.parse(body);
            addLogoStock(req, res, next, json.value[0].contentUrl ); 
        });

      }
    });
}

/// @}