import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId, checkProps } from '../../testUtils';

import { TweetVideoContainer as Component } from './TweetVideo';

const setUp = (props = {}) => {
  const enzymeWrapper = shallow(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
 TWEET VIDEO CONTAINER
******************** */
describe('<TweetVideoContainer />', () => {
  /* ********************
      CHECK PROPTYPES
  ******************** */
  describe('Check PropTypes', () => {
    it('should not throw a warning', () => {
      const expectedProps = {
        media_url: 'https://test.com/image',
        media_type: 'video',
        content_url: 'https://test.com/video',
        content_type: 'mp4',
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
        media_url: 'https://test.com/image',
        media_type: 'video',
        content_url: 'https://test.com/video',
        content_type: 'mp4',
      };

      const { enzymeWrapper, props } = setUp(initialProps);

      wrapper = enzymeWrapper;
      passedProps = props;
    });

    /* ********************
          CONSTRUCTOR
    ******************** */
    // describe('constructor()', () => {
    //   it('should set state', () => {
    //
    //   });
    // });

    /* ********************
             RENDER
    ******************** */
    describe('render()', () => {
      it('should render without errors', () => {
        expect(findByTestId(wrapper, 'TweetVideoContainer').length).toEqual(1);
      });

      it('should not render if content url is missing', () => {
        wrapper.setProps({ content_url: null });

        expect(wrapper.instance().render()).toBeNull();
      });
    });
  });
});
