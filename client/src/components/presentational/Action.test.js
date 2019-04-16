import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId, checkProps } from '../../testUtils';

import { ActionPresentator as Component } from './Action';

const setUp = (props = {}) => {
  const enzymeWrapper = shallow(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
   ACTION PRESENTATOR
******************** */
describe('<ActionPresentator />', () => {
  /* ********************
      CHECK PROPTYPES
  ******************** */
  describe('Check PropTypes', () => {
    it('should not throw a warning', () => {
      const expectedProps = {
        type: 'heart',
        isSmall: false,
        isActive: false,
        count: 0,
        onAction: jest.fn(),
      };

      expect(checkProps(Component, expectedProps)).toBeUndefined();
    });
  });

  /* ********************
         COMPONENT
  ******************** */
  describe('Component', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {
        type: 'heart',
        isSmall: false,
        isActive: false,
        count: 0,
        onAction: jest.fn(),
      };

      const { enzymeWrapper, props } = setUp(initialProps);

      wrapper = enzymeWrapper;
      passedProps = props;
    });

    /* ********************
             RENDER
    ******************** */
    describe('render()', () => {
      it('should render without errors', () => {
        expect(findByTestId(wrapper, 'ActionPresentator').length).toEqual(1);
      });

      it('should not render if type prop is not present', () => {
        wrapper.setProps({ type: null });

        expect(findByTestId(wrapper, 'ActionPresentator').length).toEqual(0);
      });

      it('should render an interactive wrapper with correct props', () => {
        const interactive = findByTestId(wrapper, 'interactiveWrapper');
        const props = interactive.props();

        // Exists with props
        expect(interactive.length).toEqual(1);
        expect(props.transitionto).toBeDefined();

        // Click handler calles correct function with param
        expect(passedProps.onAction).toHaveBeenCalledTimes(0);
        interactive.simulate('click');
        expect(passedProps.onAction).toHaveBeenCalledTimes(1);
        expect(passedProps.onAction).toHaveBeenCalledWith(passedProps.type);
      });

      it('should render an icon bubble with correct props', () => {
        const bubble = findByTestId(wrapper, 'iconBubble');
        const props = bubble.props();

        // Exists with props
        expect(bubble.length).toEqual(1);
        expect(props.transitionto).toBeDefined();
      });

      it('should render an icon wrapper with correct props', () => {
        const iconWrapper = findByTestId(wrapper, 'iconWrapper');
        const props = iconWrapper.props();

        // Exists with props
        expect(iconWrapper.length).toEqual(1);
        expect(props.small).toEqual(passedProps.isSmall);
      });

      it('should render an icon with correct props', () => {
        const icon = findByTestId(wrapper, 'icon');
        const props = icon.props();

        // Exists with props
        expect(icon.length).toEqual(1);
        expect(props.color).toBeDefined();
        expect(props.icon[1]).toEqual(passedProps.type); // ['constant', type]
      });

      it('should render count text based on props with correct text', () => {
        const countText = () => findByTestId(wrapper, 'countText');

        // Should not render
        wrapper.setProps({ count: 0 });
        expect(countText().length).toEqual(0);

        // Should render with text
        wrapper.setProps({ count: 27 });
        expect(countText().length).toEqual(1);
        expect(countText.text).toEqual(wrapper.props().count);
      });
    });
  });
});
