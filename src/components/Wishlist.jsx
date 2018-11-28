import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import WishlistItem from './WishlistItem';
import actions from '../actions';


class Wishlist extends React.Component {
  static defaultProps = {
    wishlist: [],
  }

  static propTypes = {
    actions: PropTypes.shape({
      wishlist: PropTypes.func.isRequired,
    }).isRequired,
    collections: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
    })).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    wishlist: PropTypes.array,
  }

  constructor(props) {
    super(props);

    this.onDropdownToggleButtonClick = this.onDropdownToggleButtonClick.bind(this);

    this.state = {
      open: false,
    };
  }

  componentWillMount() {
    if (this.props.wishlist.length > 0 && this.props.collections.length === 0) {
      this.props.actions.wishlist();
    }
  }

  onDropdownToggleButtonClick() {
    this.setState(state => ({ open: ! state.open }));
  }

  render() {
    return (
      <div className="component wishlist">
        <button type="button" className="btn-toggle" onClick={ this.onDropdownToggleButtonClick }>
          <i className="fas fa-heart" />
          <span className="text">お気に入り</span>
        </button>

        <div className={ classnames('dropdown', { show: this.state.open }) }>
          { this.props.collections && this.props.collections.map(sale => (
            <WishlistItem key={ sale.id } sale={ sale } />
          )) }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  collections: Object.values(_.pick(state.sales.collections, state.sales.wishlist) || {}),
  wishlist: state.sales.wishlist,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
