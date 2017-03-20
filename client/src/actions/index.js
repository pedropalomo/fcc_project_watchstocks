/// @addtogroup watchstock-client
/// @{
/// @file index.js
/// @brief: 
///
/// Author: Pedro Palomo Perez
/// Mail: pedro.palomoperez@gmail.com
/// Github: pedropalomo
/// Revision: 1.0

import axios from 'axios';
import { browserHistory } from 'react-router';
import { FETCH_STOCK,
  DELETE_STOCK,
  ERROR_STOCK,
  GET_ALL_STOCKS,
  UPDATE_ADD_STOCK,
  UPDATE_DELETE_STOCK,
  FETCH_STOCK_NAMES
} from './types';



const ROOT_URL = 'https://fcc-watchstocks-pedropalomo.c9users.io:8081';


// ---------------------------------------------------------------------------
/// @brief:  
/// @param[in,out] name:
export function stockError(error) {
    
  return {
      type: ERROR_STOCK,
      payload: error
  }
}


// ---------------------------------------------------------------------------
/// @brief:  
/// @param[in,out] name:
export function fetchStock(id) {
  
  var current_date = new Date();
  var one_year_before = new Date(current_date);
  one_year_before.setMonth(one_year_before.getMonth() - 12);
  
  var request_data = {
    code: id,
    start_date: one_year_before,
    end_date: current_date
  };  

  return function(dispatch) {
        axios.post(`${ROOT_URL}/`, request_data)
            .then(response => {
              
                dispatch({ type: FETCH_STOCK,
                          payload: response.data});
            })
            .catch(() => {
                dispatch(stockError('Error: '+ id + ' is already represented in the chart'));
            })
    }
}

// ---------------------------------------------------------------------------
/// @brief:  
/// @param[in,out] name:
export function fetchStockNames(id) {
  
  
  return function(dispatch) {
        axios.get(`${ROOT_URL}/list`, {})
            .then(response => {
              
                //if (!response.data.hasOwnProperty('error_message'))
              
                dispatch({ type: FETCH_STOCK_NAMES,
                          payload: response.data});
            })
            .catch(() => {
                dispatch(stockError('error: fetchStock'));
            })
    }
}


// ---------------------------------------------------------------------------
/// @brief:  
/// @param[in,out] name:
export function updateFetchStock(data) {
  
  return { 
           type: FETCH_STOCK,
           payload: data
         };
}

// ---------------------------------------------------------------------------
/// @brief:  
/// @param[in,out] name:
export function deleteStock(id) {
  
  var request_data = {
    code: id
  };  
  
  return function(dispatch) {
        axios.post(`${ROOT_URL}/delete`, request_data)
            .then(response => {
                
                dispatch({ type: DELETE_STOCK,
                          payload: {code: id}});
            })
            .catch(() => {
                dispatch(stockError('error: deleteStock'));
            })
    }    
}

// ---------------------------------------------------------------------------
/// @brief:  
/// @param[in,out] name:
export function updateDeleteStock(id) {

  return { 
            type: DELETE_STOCK,
            payload: {code: id}
         }
}

// ---------------------------------------------------------------------------
/// @brief:  
/// @param[in,out] name:
export function getCurrentStocks() {
  
  return function(dispatch) {
        axios.get(`${ROOT_URL}/all`, {})
            .then(response => {

                dispatch({ type: GET_ALL_STOCKS,
                          payload:  response.data});
            })
            .catch(() => {
                dispatch(stockError('error: deleteStock'));
            })
    }    
}

/// @}