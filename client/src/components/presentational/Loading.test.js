import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId } from '../../testUtils';

import { LoadingPresentator as Component } from './Loading';

const setUp = (props = {}) => {
  const wrapper = shallow(<Component {...props} />);
  return wrapper;
};

describe('<LoadingPresentator>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setUp();
  });

  it('should render without errors', () => {
    expect(findByTestId(wrapper, 'LoadingPresentator').length).toEqual(1);
  });

  it('should render loading icon', () => {
    const icon = findByTestId(wrapper, 'loadingIcon');
    expect(icon.length).toEqual(1);
  });
});
