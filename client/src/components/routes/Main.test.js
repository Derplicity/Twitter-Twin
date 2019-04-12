import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId } from '../../testUtils';

import Component from './Main';

const setUp = () => {
  const enzymeWrapper = shallow(<Component />);
  return {
    enzymeWrapper,
  };
};

/* ********************
      MAIN ROUTES
******************** */
describe('<MainRoutes />', () => {
  let wrapper;

  beforeEach(() => {
    const { enzymeWrapper } = setUp();

    wrapper = enzymeWrapper;
  });

  it('should render without errors', () => {
    expect(findByTestId(wrapper, 'MainRoutes').length).toEqual(1);
  });

  it('should render correct number of routes', () => {
    expect(wrapper.find('Route').length).toEqual(3);
  });
});
