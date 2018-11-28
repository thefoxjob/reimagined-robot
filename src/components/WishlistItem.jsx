import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Image from './Image';
import LikeButton from './LikeButton';


const WishlistItem = (props) => {
  let date = null;

  if (moment().isBetween(props.sale.lifetime.begins_at, props.sale.lifetime.ends_at)) {
    const duration = moment.duration(moment(props.sale.lifetime.ends_at).diff(Date.now));

    if (Math.floor(duration.asMonths())) {
      date = `残り${ Math.floor(duration.asMonth()) }月`;
    } else if (Math.floor(duration.asDays())) {
      date = `残り${ Math.floor(duration.asMonth()) }日`;
    } else {
      date = `残り${ Math.floor(duration.asHours()) }時間`;
    }
  } else if (moment().isAfter(props.sale.lifetime.ends_at)) {
    date = <span className="expire">終了しました</span>;
  } else {
    date = <span className="next">まもなくスタート</span>;
  }

  return (
    <div className="component wishlist-item">
      <LikeButton id={ props.sale.id } liked={ props.sale.liked } />
      <div className="image">
        <Image url={ props.sale.images.url_template } />
      </div>
      <div className="information">
        <span className="name">{ props.sale.name }</span>
        <span className="status">{ date }</span>
      </div>
    </div>
  );
};

WishlistItem.propTypes = {
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

export default WishlistItem;
