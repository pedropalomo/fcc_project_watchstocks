
/// @addtogroup watchstock
/// @{
/// @file stocks.js
/// @brief: 
///
/// Author: Pedro Palomo Perez
/// Mail: pedro.palomoperez@gmail.com
/// Github: pedropalomo
/// Revision: 1.0

import {
  FETCH_STOCK,
  DELETE_STOCK,
  GET_ALL_STOCKS,
  ERROR_STOCK,
  UPDATE_ADD_STOCK,
  UPDATE_DELETE_STOCK,
  FETCH_STOCK_NAMES
} from '../actions/types';

export default function(state = {}, action) {
  
  switch(action.type) {
    case FETCH_STOCK:
      console.log("action FETCH_STOCK: ", state, action.payload);
      if (state.stock_list.find(element => {return (action.payload.dataset_code == element.dataset_code);})) {
        return state;  
      }
      else {
        state.stock_list.push(action.payload);
        state.error="";
        return {...state};
      }
        
    case DELETE_STOCK:  
      console.log("action DELETE_STOCK: ", state, action.payload);
      state.stock_list = state.stock_list.filter((i)=>{return i.dataset_code !== action.payload.code});
      state.error="";
      return {...state};
      
    case GET_ALL_STOCKS:
      console.log("action GET_ALL_STOCKS: ", state, action.payload);
      return {...state, stock_list: action.payload};
      
    case ERROR_STOCK:
      console.log("action ERROR_STOCK: ", state, action.payload);
      return { ...state, error: action.payload };
      
    case FETCH_STOCK_NAMES:
      console.log("action FETCH_STOCK_NAMES: ", state, action.payload);
      return { ...state, stock_names: action.payload.stocks_list };
      return state;

  }

  return state;
}

/// @}