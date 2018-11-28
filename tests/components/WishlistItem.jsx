import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import WishlistItem from '../../src/components/WishlistItem';


describe('<WishlistItem />', () => {
  const sale = {
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
    liked: true,
    name: 'Test Sale',
    newly_started: false,
  };

  it('should render successfully', () => {
    const wrapper = shallow(<WishlistItem sale={ sale } />);
    expect(wrapper.find('.component.wishlist-item')).to.have.lengthOf(1);
    expect(wrapper.find('.component.wishlist-item .information .name').text()).to.equal('Test Sale');
    expect(wrapper.find('.component.wishlist-item .information .status').text()).to.equal('終了しました');
  });
});
