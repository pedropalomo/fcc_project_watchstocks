
/// @addtogroup watchstock
/// @{
/// @file chart_stocks.js
/// @brief: 
///
/// Author: Pedro Palomo Perez
/// Mail: pedro.palomoperez@gmail.com
/// Github: pedropalomo
/// Revision: 1.0

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import {Line} from 'react-chartjs-2';



class ChartStocks extends Component {
  
  
  // ---------------------------------------------------------------------------
  /// @brief:  
  /// @param[in,out] name:  
  constructor(props) {
    super(props);
    
    this.setOption = this.setOption.bind(this);
    this.state = { selectedOption: 'YEAR' };
  }
  
  
  // ---------------------------------------------------------------------------
  /// @brief:  
  /// @param[in,out] name:
  componentWillMount() {
    
  }
 

  // ---------------------------------------------------------------------------
  /// @brief:  
  /// @param[in,out] name: 
  setOption(event) {
    
    console.log(event.target.value);
        this.setState({
      selectedOption: event.target.value
    });
  }
  
  
  // ---------------------------------------------------------------------------
  /// @brief:  
  /// @param[in,out] name:
  render() {
    
    const type = 'line';
    const options = {
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                            displayFormats: {
                            quarter: 'MMM YYYY'
                            }
                          },
                    position: 'bottom'
                }]
          }
    };
    const {stocks} = this.props;
    var  data = {
              datasets: []
            };
    
    if (Array.isArray(stocks.stock_list)) {
  
      stocks.stock_list.map( (company) => {
      
      
          var end_date = new Date();
          var begin_date = new Date(end_date);
          
          switch (this.state.selectedOption)
          {
            case 'WEEK': 
              begin_date.setDate(begin_date.getDate() - 7);
              break;

            case 'MONTH': 
              begin_date.setMonth(begin_date.getMonth() - 1);
              break;
            
            case 'YEAR': 
              begin_date.setMonth(begin_date.getMonth() - 12);
              break;
          }
          
          var data_set = company.data.filter(obj => {
            var tmp = new Date(obj.date);
            return ((tmp.valueOf() >= begin_date.valueOf()) && 
                    (tmp.valueOf() <= end_date.valueOf()));
          });
      
      
          var data_set = data_set.map(obj => {
            return {x: obj.date, y: obj.value};
          });
          
          data.datasets.push(
            {
              label: company.dataset_code,
              borderColor: company.color,
              data: data_set
            }
          );
      });

      return (
        <div>
          <div onChange={this.setOption.bind(this)}>
            <input type="radio" value="WEEK" name="gender" 
            checked={this.state.selectedOption === 'WEEK'} />Week  <a/>
            
            <input type="radio" value="MONTH" name="gender" 
            checked={this.state.selectedOption === 'MONTH'} />Month  <a/>
            
            <input type="radio" value="YEAR" name="gender" 
            checked={this.state.selectedOption === 'YEAR'}/>Year   
          </div>
          <h2>General Chart: </h2>
          
          <Line type={type} data={data} options={options} redraw />
        </div>
      );
    } else {
       return <div/>
    }
  }
}


function mapStateToProps(state) {
  return { stocks: state.stocks
  };
}

export default connect(mapStateToProps, { })(ChartStocks);

/// @}