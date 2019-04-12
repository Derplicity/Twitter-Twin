import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId } from './testUtils';

import Component from './App';

const setUp = () => {
  const enzymeWrapper = shallow(<Component />);
  return {
    enzymeWrapper,
  };
};

/* ********************
         APP
******************** */
describe('<App />', () => {
  let wrapper;

  beforeEach(() => {
    const { enzymeWrapper } = setUp();

    wrapper = enzymeWrapper;
  });

  it('should render without errors', () => {
    expect(findByTestId(wrapper, 'App').length).toEqual(1);
  });
});
