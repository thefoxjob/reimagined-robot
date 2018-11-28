import React from 'react';
import configureStore from 'redux-mock-store';
import deepcopy from 'deepcopy';
import { Provider } from 'react-redux';
import { expect } from 'chai';
import { mount } from 'enzyme';

import Wishlist from '../../src/components/Wishlist';


describe('<Wishlist />', () => {
  const mock = configureStore();
  const state = {
    sales: {
      collections: {
        1: {
          access: {
            exclusive: false,
          },
          id: 1,
          images: {
            url_template: 'https://cdn1.qa.gilt.jp/cdn_images/sales/85208256/{NAME}/{RATIO}/{WIDTH}?v=it5ds3ao',
          },
          lifetime: {
            begins_at: '2016-09-29T12:00:00.000Z',
            ends_at: '2016-10-02T18:00:00.000Z',
          },
          liked: false,
          name: 'Test Sale',
          newly_started: false,
        },
      },
      wishlist: [],
    },
  };

  it('should render successfully', () => {
    const store = mock(state);
    const wrapper = mount(<Provider store={ store }><Wishlist /></Provider>);
    expect(wrapper.find('.component.wishlist')).to.have.lengthOf(1);
    expect(wrapper.find('.component.wishlist .dropdown').hasClass('show')).equal(false);
  });

  it('should show dropdown when click on the toggle button', () => {
    const store = mock(state);
    const wrapper = mount(<Provider store={ store }><Wishlist /></Provider>);
    expect(wrapper.find('.component.wishlist')).to.have.lengthOf(1);
    wrapper.find('.component.wishlist .btn-toggle').simulate('click');
    expect(wrapper.find('.component.wishlist .dropdown').hasClass('show')).equal(true);
  });

  it('should contain 0 wishlist items', () => {
    const store = mock(state);
    const wrapper = mount(<Provider store={ store }><Wishlist /></Provider>);
    expect(wrapper.find('.component.wishlist')).to.have.lengthOf(1);
    expect(wrapper.find('.component.wishlist .component.wishlist-item')).to.have.lengthOf(0);
  });

  it('should contain 1 wishlist items', () => {
    const copy = deepcopy(state);
    copy.sales.wishlist.push(1);

    const store = mock(copy);
    const wrapper = mount(<Provider store={ store }><Wishlist /></Provider>);
    expect(wrapper.find('.component.wishlist')).to.have.lengthOf(1);
    expect(wrapper.find('.component.wishlist .component.wishlist-item')).to.have.lengthOf(1);
  });
});
