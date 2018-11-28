import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Header from '../../src/components/Header';


describe('<Header />', () => {
  it('should render successfully', () => {
    const wrapper = shallow(<Header />);

    expect(wrapper.find('header')).to.have.lengthOf(1);
    expect(wrapper.find('header .logo')).to.have.lengthOf(1);
  });
});
