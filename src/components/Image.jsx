import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';


const Image = (props) => {
  const params = {
    name: 'default',
    ratio: 1.236,
    width: props.width,
  };

  const url = props.url.replace(/\{\w*\}/gm, match => params[match.replace(/\{|\}/gm, '').toLowerCase()]);
    
  return <img src={ url } className={ classnames('img-fluid', props.className) } />;
};

Image.defaultProps = {
  width: 400,
};

Image.propTypes = {
  width: PropTypes.number,
  url: PropTypes.string.isRequired,
};

export default Image;
