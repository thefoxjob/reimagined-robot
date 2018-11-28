import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Sales from './pages/Sales';
import actions from './actions';


const Application = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ Sales } />
    </Switch>
  </BrowserRouter>
);

export default Application;
