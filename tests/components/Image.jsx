import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Image from '../../src/components/Image';


describe('<Image />', () => {
  it('should render successfully', () => {
    const wrapper = shallow(<Image url="https://localhost:8000/test/" />);

    expect(wrapper.find('img')).to.have.lengthOf(1);
    expect(wrapper.find('img[src="https://localhost:8000/test/"]')).to.have.lengthOf(1);
  });

  it('should render the url with correct parameters', () => {
    const url = 'https://localhost:8000/test/{NAME}/{RATIO}/{WIDTH}';
    const wrapper = shallow(<Image url={ url } width={ 800 } />);

    expect(wrapper.find('img[src="https://localhost:8000/test/default/1.236/800"]')).to.have.lengthOf(1);
  });
});
