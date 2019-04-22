import React from 'react';
import { mount } from 'enzyme';

import LinkCard from './LinkCard';

const setUp = (Component, props = {}) => {
  const enzymeWrapper = mount(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
    LINK CARD STYLES
******************** */
describe('<LinkCardStyles />', () => {
  /* ********************
          LINKCARD
  ******************** */
  describe('LinkCard', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(LinkCard, initialProps);

      wrapper = enzymeWrapper;
      passedProps = props;
    });

    /* ********************
             RENDER
    ******************** */
    describe('render()', () => {
      it('should render without errors', () => {
        expect(wrapper.exists()).toBeTruthy();
      });
    });
  });
});
