import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId } from '../../testUtils';

import Component from './NotFound';

const setUp = () => {
  const enzymeWrapper = shallow(<Component />);
  return {
    enzymeWrapper,
  };
};

/* ********************
       NOT FOUND
******************** */
describe('<NotFoundView />', () => {
  let wrapper;

  beforeEach(() => {
    const { enzymeWrapper } = setUp();

    wrapper = enzymeWrapper;
  });

  it('should render without errors', () => {
    expect(findByTestId(wrapper, 'NotFoundView').length).toEqual(1);
  });
});
