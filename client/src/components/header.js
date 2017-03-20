
/// @addtogroup watchstock
/// @{
/// @file header.js
/// @brief: 
///
/// Author: Pedro Palomo Perez
/// Mail: pedro.palomoperez@gmail.com
/// Github: pedropalomo
/// Revision: 1.0


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router'
import { fetchStock, fetchStockNames } from '../actions/index';


class Header extends Component {

  // ---------------------------------------------------------------------------
  /// @brief:  
  /// @param[in,out] name:  
  constructor(props) {
    super(props);

    this.state = { company: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  // ---------------------------------------------------------------------------
  /// @brief:  
  /// @param[in,out] name:
  componentWillMount() {
      
      this.props.fetchStockNames();
  }
    
  // ---------------------------------------------------------------------------
  /// @brief:  
  /// @param[in,out] name:
  onInputChange(event) {
    this.setState({ company: event.target.value });
  }


  // ---------------------------------------------------------------------------
  /// @brief:  
  /// @param[in,out] name::
  onFormSubmit(event) {
    event.preventDefault();

    // We need to go and fetch weather data
    console.log("onFormSubmit: ", this.state.company);
    
    this.props.fetchStock(this.state.company.toLocaleUpperCase());
    this.setState({ company: '' });
  }
  
  
  //----------------------------------------------------------------------------
  /// @brief:  
  /// @param[in,out] name:
  renderOptions() {

     return this.props.stocks.stock_names.map ((option) => {
        return <option value={option.code}>{option.code + ' -- ' + option.name }</option>
      })
  }
  
  
  // ---------------------------------------------------------------------------
  /// @brief:  
  /// @param[in,out] name:
  render() {
    
    if (this.props.stocks.stock_names) {
    
    return (
      <div>
        <form  onSubmit={this.onFormSubmit}>
          <label>
          Pick your favourite option:   
          <br/>
          <select id="soflow" 
                  value={this.state.company} 
                  onChange={this.onInputChange}>
          
          <option value="" hidden> -- select an option -- </option>
          {this.renderOptions()}
          <option value="new_option">Insert other option...</option>
          </select>
          </label>
          <a>    </a>
          <button type="submit" className="button_submit btn btn-success">Submit</button>
        </form>
      </div>
      );
      
      }
      else {
        return <div/>
      }
  }
}


function mapStateToProps(state) {
  return { stocks: state.stocks
  };
}

export default connect(mapStateToProps, {fetchStock, fetchStockNames })(Header);

/// @}
