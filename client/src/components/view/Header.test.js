import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId } from '../../testUtils';

import { HeaderView as Component } from './Header';

const setUp = (props = {}) => {
  const enzymeWrapper = shallow(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
      HEADER VIEW
******************** */
describe('<HeaderView />', () => {
  /* ********************
         COMPONENT
  ******************** */
  describe('Component', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(initialProps);

      wrapper = enzymeWrapper;
      passedProps = props;
    });

    /* ********************
            RENDER
    ******************** */
    describe('render()', () => {
      it('should render without errors', () => {
        expect(findByTestId(wrapper, 'HeaderView').length).toEqual(1);
      });

      it('should render <NavbarContainer />', () => {
        expect(findByTestId(wrapper, 'NavbarContainer').length).toEqual(1);
      });
    });
  });
});
