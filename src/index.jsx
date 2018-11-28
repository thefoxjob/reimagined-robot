import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Application from './Application';
import store from './store';
import './styles/index.scss';


ReactDOM.render(
  <Provider store={ store }>
    <Application />
  </Provider>,
  document.getElementById('main')
);
