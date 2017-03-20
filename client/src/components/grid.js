
/// @addtogroup watchstock
/// @{
/// @file grid.js
/// @brief: 
///
/// Author: Pedro Palomo Perez
/// Mail: pedro.palomoperez@gmail.com
/// Github: pedropalomo
/// Revision: 1.0

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import injectTapEventPlugin from 'react-tap-event-plugin';

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DeleteIcon from '../../style/delete_icon'
import { deleteStock, getCurrentStocks } from '../actions/index';


// Special trick to avoid warning: "Unknown prop `onTouchTap` on <button> tag"
injectTapEventPlugin();


class Grid extends Component {


  // ---------------------------------------------------------------------------
  /// @brief:  
  /// @param[in,out] name:  
  constructor(props) {
    super(props);

    this.state = { company: '' };
    this.onClicDelete = this.onClicDelete.bind(this);
  }

  // ---------------------------------------------------------------------------
  /// @brief:  
  /// @param[in,out] name:
  onClicDelete (id) {
    this.props.deleteStock(id);
  }

  // ---------------------------------------------------------------------------
  /// @brief:  
  /// @param[in,out] name:
  componentWillMount() {
    this.props.getCurrentStocks();
  }

  // ---------------------------------------------------------------------------
  /// @brief:  
  /// @param[in,out] name:
  render() {
    
    var styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: 800,
        height: 'auto',
        overflowY: 'auto',
      },
    };
    
    var tilesData = 'images/real-madrid.png';
    const {stocks} = this.props;
    
    
    if (!Array.isArray(stocks.stock_list)) {
      return <div>Not stocks</div>;
    }

    return (
       <MuiThemeProvider>
          <div style={styles.root}>
            <GridList cellHeight={180} style={styles.gridList} cols={6}>
              <Subheader>Stocks</Subheader>
              {stocks.stock_list.map((tile) => (
                <GridTile
                  key={tile.dataset_code}
                  title={tile.name}
                  subtitle={<span>by <b>{tile.dataset_code}</b></span>}
                  titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 1000%,rgba(0,0,0,0.3) 70%,rgba(0,10,20,0) 100%)"
                  actionIcon={<IconButton onClick={() => this.onClicDelete(tile.dataset_code)}> <DeleteIcon color="white" /></IconButton>}>
                  <img src={tile.url_logo} />
                </GridTile>
              ))}
            </GridList>
          </div>
        </MuiThemeProvider>
    );
  }
}


function mapStateToProps(state) {
  return { stocks: state.stocks
  };
}

export default connect(mapStateToProps, { deleteStock, getCurrentStocks })(Grid);

/// @}