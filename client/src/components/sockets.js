
/// @addtogroup watchstock
/// @{
/// @file sockets.js
/// @brief: 
///
/// Author: Pedro Palomo Perez
/// Mail: pedro.palomoperez@gmail.com
/// Github: pedropalomo
/// Revision: 1.0

import * as actions from '../actions/index';
import io from 'socket.io-client';

 
export default function (store) {
  const socket = io.connect('https://fcc-watchstocks-pedropalomo.c9users.io:8081');
 
  socket.on('update_fetch', message => {
    console.log("update_fetch: ", message);
    store.dispatch(actions.updateFetchStock(message));
  });
  
  
  socket.on('update_delete', message => {
    console.log("update_delete: ", message);
    store.dispatch(actions.updateDeleteStock(message));
  });
}

/// @}