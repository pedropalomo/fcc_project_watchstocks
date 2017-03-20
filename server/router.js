
const path = require('path');
const stocks = require('./services/stocks');

module.exports = function (app) {

  app.post('/', stocks.getLogoUrl, function(req, res){ });
  
  app.get('/all', stocks.getStocks, function(req, res){ });
  
  app.post('/delete', stocks.deleteStock, function(req, res){ });
  
  app.get('/list', stocks.getStocksList, function(req, res){ });
  
  app.get('/logo', stocks.getLogoUrlTest, function(req, res){ });

};