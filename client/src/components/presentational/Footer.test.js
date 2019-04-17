import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId } from '../../testUtils';

import { FooterPresentator as Component } from './Footer';

const setUp = (props = {}) => {
  const wrapper = shallow(<Component {...props} />);
  return wrapper;
};

describe('<Footer>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setUp();
  });

  it('should render without errors', () => {
    expect(findByTestId(wrapper, 'FooterPresentator').length).toBe(1);
  });

  it('should render all links', () => {
    const links = findByTestId(wrapper, 'footerLink');
    expect(links.length).toBe(4);
  });
});
