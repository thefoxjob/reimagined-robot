import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';


export const LikeButton = props => {
  const onLikeButtonClick = (e) => {
    e.preventDefault();

    if (props.liked) {
      props.actions.unlike(props.id);
    } else {
      props.actions.like(props.id);
    }
  };

  return (
    <button type="button" className="component like-button btn-like" onClick={ onLikeButtonClick }>
      <i className={ classnames('icon fa-heart', props.liked ? 'fas' : 'far') } />
    </button>
  )
};

LikeButton.defaultProps = {
  liked: false,
};

LikeButton.propTypes = {
  id: PropTypes.string.isRequired,
  liked: PropTypes.bool,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(null, mapDispatchToProps)(LikeButton);
