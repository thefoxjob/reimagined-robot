import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { expect } from 'chai';
import { mount } from 'enzyme';

import LikeButton from '../../src/components/LikeButton';
import actions from '../../src/actions';
import reducers from '../../src/reducers';


describe('<LikeButton />', () => {
  const mock = configureStore();
  const state = {
    sales: {
      collections: {
        1: {
          liked: false,
        },
      },
    },
  };

  it('should render successfully', () => {
    const store = mock(state);
    const wrapper = mount(<Provider store={ store }><LikeButton id="1" liked={ false } /></Provider>);
    expect(wrapper.find('.component.like-button')).to.have.lengthOf(1);
    expect(wrapper.find('.component.like-button .icon.fa-heart.far')).to.have.lengthOf(1);
    expect(wrapper.find('.component.like-button .icon.fa-heart.fas')).to.have.lengthOf(0);
  });
});
