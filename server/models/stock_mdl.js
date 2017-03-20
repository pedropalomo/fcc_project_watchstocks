
/// @addtogroup watchstock-server
/// @{
/// @file stock_mdl.js
/// @brief: 
///
/// Author: Pedro Palomo Perez
/// Mail: pedro.palomoperez@gmail.com
/// Github: pedropalomo
/// Revision: 1.0

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ValueSchema = new Schema({
  date: { type: Date,  required: true},
  value: { type: Number, required: true }
});

const StockSchema = new Schema({
  dataset_code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: false
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  color: {
    type: String,
    default: false
  },
  url_logo: {
    type: String,
    default: false
  },
  data: [ValueSchema]
});

const StockMdl = mongoose.model('stock', StockSchema);

module.exports = StockMdl;

/// @}