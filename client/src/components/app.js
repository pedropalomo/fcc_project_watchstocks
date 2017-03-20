
/// @addtogroup watchstock
/// @{
/// @file app.js
/// @brief: 
///
/// Author: Pedro Palomo Perez
/// Mail: pedro.palomoperez@gmail.com
/// Github: pedropalomo
/// Revision: 1.0

import React, { Component } from 'react';
import Header from './header';
import Chart from './chart_stocks'
import Grid from './grid'

export default class App extends Component {
  render() {
    return (
      <div>
      <Header />
      <Chart />
      <Grid />
      </div>
    );
  }
}

/// @}