import React from 'react';
import { shallow } from 'enzyme';
import { checkProps, findByTestId } from '../../testUtils';

import { ClickController as Component } from './ClickController';

const setUp = (props = {}) => {
  const enzymeWrapper = shallow(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
    CLICK CONTROLLER
******************** */
describe('<ClickController />', () => {
  /* ********************
      CHECK PROPTYPES
  ******************** */
  describe('Check PropTypes', () => {
    it('should not throw a warning', () => {
      const expectedProps = {
        children: <div />,
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
        children: <div />,
      };

      const { enzymeWrapper, props } = setUp(initialProps);

      wrapper = enzymeWrapper;
      passedProps = props;
    });

    /* ********************
          CONSTRUCTOR
    ******************** */
    describe('constructor()', () => {
      it('should set the initial state', () => {
        const expectedState = {
          isOutside: false,
        };

        expect(wrapper.state()).toEqual(expectedState);
      });
    });

    /* ********************
     COMPONENT WILL UNMOUNT
    ******************** */
    describe('componentWillUnmount()', () => {
      it('should call stopClickListen()', () => {
        const stopClickListenMock = (wrapper.instance().stopClickListen = jest.fn());
        const stopClickListen = () => stopClickListenMock.mock.calls.length;

        expect(stopClickListen()).toEqual(0);
        wrapper.instance().componentWillUnmount();
        expect(stopClickListen()).toEqual(1);
      });
    });

    /* ********************
      SET CLICK CONTAINER
    ******************** */
    describe('setClickContainer()', () => {
      it('should set clickContainer to the input param', () => {
        const clickContainer = () => wrapper.instance().clickContainer;
        const expectedValue = 'test';

        expect(clickContainer()).toBeUndefined();
        wrapper.instance().setClickContainer(expectedValue);
        expect(clickContainer()).toEqual(expectedValue);
      });
    });

    /* ********************
       START CLICK LISTEN
    ******************** */
    describe('startClickListen()', () => {
      it('should set state and add event listener', () => {
        const addEventListener = (document.addEventListener = jest.fn());

        wrapper.setState({ isOutside: true });

        expect(addEventListener).toHaveBeenCalledTimes(0);
        wrapper.instance().startClickListen();
        expect(wrapper.state().isOutside).toBeFalsy();
        expect(addEventListener).toHaveBeenCalledTimes(1);
        expect(addEventListener).toHaveBeenCalledWith(
          'mousedown',
          wrapper.instance().handleClick,
          false,
        );
      });
    });

    /* ********************
       STOP CLICK LISTEN
    ******************** */
    describe('stopClickListen()', () => {
      it('should remove event listener', () => {
        const removeEventListener = (document.removeEventListener = jest.fn());

        expect(removeEventListener).toHaveBeenCalledTimes(0);
        wrapper.instance().stopClickListen();
        expect(removeEventListener).toHaveBeenCalledTimes(1);
        expect(removeEventListener).toHaveBeenCalledWith(
          'mousedown',
          wrapper.instance().handleClick,
          false,
        );
      });
    });

    /* ********************
          HANDLE CLICK
    ******************** */
    describe('handleClick()', () => {
      it('should return null if clicked element is within the container, else set state and call stopClickListen()', () => {
        wrapper.instance().clickContainer = shallow(
          <div>
            <span />
          </div>,
        );

        let e = {
          target: <span />,
        };

        // Container contains e.target -> return null
        expect(wrapper.instance().handleClick(e)).toBeNull();

        const stopClickListen = (wrapper.instance().stopClickListen = jest.fn());

        wrapper.setState({ isOutside: false });

        e = {
          target: <input />,
        };

        // Container does not contain e.target -> set state and stop listener
        wrapper.instance().handleClick(e);
        expect(wrapper.state().isOutside).toBeTruthy();
        expect(stopClickListen).toHaveBeenCalledTimes(1);
      });
    });

    /* ********************
			        RENDER
			******************** */
    describe('render()', () => {
      it('should call React.cloneElement() with correct paramaters', () => {
        const cloneElement = (React.cloneElement = jest.fn());

        wrapper.instance().render();
        expect(cloneElement).toHaveBeenCalledTimes(1);
        expect(cloneElement).toHaveBeenCalledWith(passedProps.children, {
          setClickContainer: wrapper.instance().setClickContainer,
          startClickListen: wrapper.instance().startClickListen,
          stopClickListen: wrapper.instance().stopClickListen,
          isOutside: wrapper.state().isOutside,
        });
      });
    });
  });
});
