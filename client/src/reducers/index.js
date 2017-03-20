
/// @addtogroup watchstock-client
/// @{
/// @file index.js
/// @brief: 
///
/// Author: Pedro Palomo Perez
/// Mail: pedro.palomoperez@gmail.com
/// Github: pedropalomo
/// Revision: 1.0


import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import stocksReducer from './stocks';

const rootReducer = combineReducers({
  stocks: stocksReducer
});

export default rootReducer;


/// @}

