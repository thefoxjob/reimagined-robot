import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Sale from '../components/Sale';
import actions from '../actions';


class Sales extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      sales: PropTypes.func.isRequired,
    }).isRequired,
    sales: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
    })).isRequired,
  }

  componentWillMount() {
    this.props.actions.sales();
  }

  render() {
    return (
      <div className="page sales">
        <Header />

        <div className="body">
          { this.props.sales && this.props.sales.length > 0 && (
            <div className="sales">
              <div className="container">

                <div className="row">
                  { this.props.sales.map(sale => <Sale key={ sale.id } id={ sale.id } column={ 3 } />) }
                </div>
              </div>
            </div>
          ) }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sales: Object.values(state.sales.collections || {}),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sales);
