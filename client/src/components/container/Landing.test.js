import React from 'react';
import { shallow } from 'enzyme';
import { checkProps, findByTestId } from '../../testUtils';

import { LandingContainer as Component } from './Landing';

import io from 'socket.io-client';

jest.mock('socket.io-client');

io.mockImplementation(() => {
  return {
    on: jest.fn((text, cb) => cb()),
  };
});

const setUp = (props = {}) => {
  const enzymeWrapper = shallow(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
   LANDING CONTAINER
******************** */
describe('<LandingContainer />', () => {
  /* ********************
      CHECK PROPTYPES
  ******************** */
  describe('Check PropTypes', () => {
    it('should not throw a warning', () => {
      const expectedProps = {
        isAuthenticated: true,
        setUserAuth: jest.fn(),
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
        isAuthenticated: false,
        setUserAuth: jest.fn(),
      };

      const { enzymeWrapper, props } = setUp(initialProps);

      wrapper = enzymeWrapper;
      passedProps = props;
    });

    /* ********************
          CONSTRUCTOR
    ******************** */
    describe('constructor()', () => {
      it('should set the initial state and variables', () => {
        const expectedState = {
          disabled: false,
        };

        expect(wrapper.state()).toEqual(expectedState);
        expect(wrapper.instance().check).toBeDefined();
        expect(wrapper.instance().socket).toBeDefined();
      });
    });

    /* ********************
       COMPONENT DID MOUNT
    ******************** */
    describe('componentDidMount()', () => {
      it('should set up a listener that closes popup and sets user auth on successful call', () => {
        const popup = (wrapper.instance().popup = {
          close: jest.fn(),
        });

        // Already called when shallow render created
        expect(wrapper.instance().socket.on).toHaveBeenCalledTimes(1);
        expect(passedProps.setUserAuth).toHaveBeenCalledTimes(1);
        expect(popup.close).toHaveBeenCalledTimes(0); // Wasn't called initially as the mock function
        wrapper.instance().componentDidMount();
        expect(wrapper.instance().socket.on).toHaveBeenCalledTimes(2);
        expect(passedProps.setUserAuth).toHaveBeenCalledTimes(2);
        expect(popup.close).toHaveBeenCalledTimes(1);
      });
    });

    /* ********************
     COMPONENT WILL UNMOUNT
    ******************** */
    describe('componentWillUnmount()', () => {
      it('should call clearInterval() with this.check id', () => {
        jest.useFakeTimers();

        const id = (wrapper.instance().check = setInterval(
          () => 'test',
          99999,
        ));

        wrapper.instance().componentWillUnmount();
        expect(clearInterval).toHaveBeenCalledWith(id);
      });
    });

    /* ********************
          CHECK POPUP
    ******************** */
    describe('checkPopup()', () => {
      it('should call clearInterval() with this.check id and enable button when popup is closed', () => {
        jest.useFakeTimers();

        const checkPopup = wrapper.instance().checkPopup;
        const disabled = () => wrapper.state().disabled;
        const id = (wrapper.instance().check = setInterval(
          () => 'test',
          99999,
        ));

        // Disable Button
        const reset = () => wrapper.setState({ disabled: true });

        // Not called when popup is open
        reset();
        wrapper.instance().popup = { closed: false };
        checkPopup();
        expect(clearInterval).not.toHaveBeenCalledWith(id);
        expect(disabled()).toEqual(true);

        // Called when popup does not exist
        reset();
        wrapper.instance().popup = undefined;
        checkPopup();
        expect(clearInterval).toHaveBeenCalledWith(id);
        expect(disabled()).toEqual(false);

        // Called when popup is closed
        reset();
        wrapper.instance().popup = { closed: true };
        checkPopup();
        expect(clearInterval).toHaveBeenCalledWith(id);
        expect(disabled()).toEqual(false);

        // Called when popup.closed does not exist
        reset();
        wrapper.instance().popup = { closed: undefined };
        checkPopup();
        expect(clearInterval).toHaveBeenCalledWith(id);
        expect(disabled()).toEqual(false);
      });
    });

    /* ********************
           OPEN POPUP
    ******************** */
    describe('openPopup()', () => {
      it('should open a popup', () => {
        // Mock window.open()
        const open = (global.open = jest.fn());

        wrapper.instance().openPopup();
        expect(open).toHaveBeenCalledTimes(1);
      });
    });

    /* ********************
           START AUTH
    ******************** */
    describe('startAuth()', () => {
      it('should call openPopup(), setInterval() for this.check, and disable the button', () => {
        jest.useFakeTimers();

        const _this = wrapper.instance();
        const popupInit = (_this.popup = undefined);
        const checkInit = (_this.check = null);
        const e = {
          preventDefault: jest.fn(),
        };

        _this.openPopup = jest.fn(() => 'test');
        _this.checkPopup = jest.fn();
        _this.setState = jest.fn();

        // Should not pass conditional
        wrapper.setState({ disabled: true });

        _this.startAuth(e);
        expect(e.preventDefault).toHaveBeenCalledTimes(0);
        expect(_this.popup).toEqual(popupInit);
        expect(_this.check).toEqual(checkInit);
        expect(setInterval).toHaveBeenCalledTimes(0);
        expect(_this.setState).toHaveBeenCalledTimes(0);

        // Should pass conditional and run all
        wrapper.setState({ disabled: false });

        _this.startAuth(e);
        expect(e.preventDefault).toHaveBeenCalledTimes(1);
        expect(_this.popup).toEqual(_this.openPopup());
        expect(_this.check).not.toEqual(checkInit);
        expect(setInterval).toHaveBeenCalledTimes(1);
        expect(setInterval).toHaveBeenCalledWith(_this.checkPopup, 1000);
        expect(_this.setState).toHaveBeenCalledTimes(1);
      });
    });

    /* ********************
			        RENDER
			******************** */
    describe('render()', () => {
      it('should render without errors', () => {
        expect(findByTestId(wrapper, 'LandingContainer').length).toEqual(1);
      });

      it('should render <AuthButton /> based on props / with correct props', () => {
        const authButton = () => findByTestId(wrapper, 'AuthButtonPresentator');
        const startAuth = wrapper.instance().startAuth;
        const disabled = wrapper.state().disabled;

        // Should not render authButton
        wrapper.setProps({ isAuthenticated: true });
        expect(authButton().length).toEqual(0);

        // Should render AuthButton with props
        wrapper.setProps({ isAuthenticated: false });
        expect(authButton().length).toEqual(1);
        expect(authButton().props().onClick).toEqual(startAuth);
        expect(authButton().props().disabled).toEqual(disabled);
      });

      it('should render <Redirect /> based on props', () => {
        const redirect = () => findByTestId(wrapper, 'redirect');

        // Should not render redirect
        wrapper.setProps({ isAuthenticated: false });
        expect(redirect().length).toEqual(0);

        // Should render redirect
        wrapper.setProps({ isAuthenticated: true });
        expect(redirect().length).toEqual(1);
        expect(redirect().props().to).toEqual({ pathname: '/home' });
      });
    });
  });
});
