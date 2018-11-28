import React from 'react';
import configureStore from 'redux-mock-store';
import deepcopy from 'deepcopy';
import moment from 'moment';
import { Provider } from 'react-redux';
import { expect } from 'chai';
import { mount } from 'enzyme';

import Sale from '../../src/components/Sale';
import actions from '../../src/actions';


describe('<Sale />', () => {
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
    },
  };

  it('should render successfully', () => {
    const store = mock(state);
    const wrapper = mount(<Provider store={ store }><Sale id="1" column={ 1 } /></Provider>);
    expect(wrapper.find('.component.sale')).to.have.lengthOf(1);
    expect(wrapper.find('.component.sale .information h3').text()).to.equal('Test Sale');
    expect(wrapper.find('.component.sale .information .status .date').text()).to.equal('終了しました');
    expect(wrapper.find('.component.sale .information .status .exclusive')).to.have.lengthOf(0);
    expect(wrapper.find('.component.sale .information .new')).to.have.lengthOf(0);
    expect(wrapper.find('.component.sale .btn-like .fa-heart')).to.have.lengthOf(1);
    expect(wrapper.find('.component.sale .btn-like .fa-heart.far')).to.have.lengthOf(1);
    expect(wrapper.find('.component.sale .btn-like .fa-heart.fas')).to.have.lengthOf(0);
  });

  it('should show the sale is starting', () => {
    const copy = deepcopy(state);
    copy.sales.collections[1].lifetime.begins_at = moment().add(7, 'days').toISOString();
    copy.sales.collections[1].lifetime.ends_at = moment().add(10, 'days').toISOString();

    const store = mock(copy);
    const wrapper = mount(<Provider store={ store }><Sale id="1" column={ 1 } /></Provider>);
    expect(wrapper.find('.component.sale')).to.have.lengthOf(1);
    expect(wrapper.find('.component.sale .information .status .date').text()).to.equal('まもなくスタート');
  });

  it('should show sale is left 1 month to expire', () => {
    const copy = deepcopy(state);
    copy.sales.collections[1].lifetime.begins_at = moment().subtract(7, 'days').toISOString();
    copy.sales.collections[1].lifetime.ends_at = moment().add(31, 'days').toISOString();

    const store = mock(copy);
    const wrapper = mount(<Provider store={ store }><Sale id="1" column={ 1 } /></Provider>);
    expect(wrapper.find('.component.sale')).to.have.lengthOf(1);
    expect(wrapper.find('.component.sale .information .status .date').text()).to.equal('残り1月');
  });

  it('should show sale is left 20 days to expire', () => {
    const copy = deepcopy(state);
    copy.sales.collections[1].lifetime.begins_at = moment().subtract(7, 'days').toISOString();
    copy.sales.collections[1].lifetime.ends_at = moment().add(21, 'days').toISOString();

    const store = mock(copy);
    const wrapper = mount(<Provider store={ store }><Sale id="1" column={ 1 } /></Provider>);
    expect(wrapper.find('.component.sale')).to.have.lengthOf(1);
    expect(wrapper.find('.component.sale .information .status .date').text()).to.equal('残り20日');
  });

  it('should show sale is left 2 hours to expire', () => {
    const copy = deepcopy(state);
    copy.sales.collections[1].lifetime.begins_at = moment().subtract(7, 'days').toISOString();
    copy.sales.collections[1].lifetime.ends_at = moment().add(3, 'hours').toISOString();

    const store = mock(copy);
    const wrapper = mount(<Provider store={ store }><Sale id="1" column={ 1 } /></Provider>);
    expect(wrapper.find('.component.sale')).to.have.lengthOf(1);
    expect(wrapper.find('.component.sale .information .status .date').text()).to.equal('残り2時間');
  });

  it('should show the new label', () => {
    const copy = deepcopy(state);
    copy.sales.collections[1].newly_started = true;

    const store = mock(copy);
    const wrapper = mount(<Provider store={ store }><Sale id="1" column={ 1 } /></Provider>);
    expect(wrapper.find('.component.sale')).to.have.lengthOf(1);
    expect(wrapper.find('.component.sale .information .new')).to.have.lengthOf(1);
  });

  it('should show the member only', () => {
    const copy = deepcopy(state);
    copy.sales.collections[1].access.exclusive = true;

    const store = mock(copy);
    const wrapper = mount(<Provider store={ store }><Sale id="1" column={ 1 } /></Provider>);
    expect(wrapper.find('.component.sale')).to.have.lengthOf(1);
    expect(wrapper.find('.component.sale .information .status .exclusive')).to.have.lengthOf(1);
    expect(wrapper.find('.component.sale .information .status .exclusive').text()).equal('Member Only');
  });
});
