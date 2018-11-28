/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Image from './Image';
import LikeButton from './LikeButton';


export const Sale = (props) => {
  let date = null;

  if (moment().isBetween(props.sale.lifetime.begins_at, props.sale.lifetime.ends_at)) {
    const duration = moment.duration(moment(props.sale.lifetime.ends_at).diff(Date.now()));

    if (Math.floor(duration.asMonths())) {
      date = `残り${ Math.floor(duration.asMonths()) }月`;
    } else if (Math.floor(duration.asDays())) {
      date = `残り${ Math.floor(duration.asDays()) }日`;
    } else {
      date = `残り${ Math.floor(duration.asHours()) }時間`;
    }
  } else if (moment().isAfter(props.sale.lifetime.ends_at)) {
    date = <span className="expire">終了しました</span>;
  } else {
    date = <span className="next">まもなくスタート</span>;
  }

  return (
    <div className={ `component sale col-lg-${ Math.floor(12 / props.column) }` }>
      <a className="link" onClick={ e => e.preventDefault() } href="#">
        <div className="image">
          <LikeButton id={ props.sale.id } liked={ props.sale.liked } />

          <Image url={ props.sale.images.url_template } />
        </div>

        <div className="information">
          { props.sale.newly_started && <span className="new">New</span> }

          <div className="text-center">
            <h3>{ props.sale.name }</h3>

            <div className="status">
              <span className="date">{ date }</span>
              { props.sale.access.exclusive && (
                <span className="exclusive">
                  <i className="fas fa-lock" />
                  Member Only
                </span>
              ) }
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

Sale.defaultProps = {
  column: 1,
};

Sale.propTypes = {
  column: PropTypes.number,
  sale: PropTypes.shape({
    access: PropTypes.shape({
      exclusive: PropTypes.bool,
    }).isRequired,
    id: PropTypes.string.isRequired,
    images: PropTypes.shape({
      url_template: PropTypes.string,
    }).isRequired,
    lifetime: PropTypes.shape({
      begins_at: PropTypes.string,
      ends_at: PropTypes.string,
    }),
    liked: PropTypes.bool,
    name: PropTypes.string.isRequired,
    newly_started: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = (state, props) => ({
  sale: state.sales.collections[props.id],
});

export default connect(mapStateToProps)(Sale);
