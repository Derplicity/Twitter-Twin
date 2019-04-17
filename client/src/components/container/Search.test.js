import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId, checkProps } from '../../testUtils';

import { SearchContainer as Component } from './Search';

const setUp = (props = {}) => {
  const enzymeWrapper = shallow(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
    SEARCH CONTAINER
******************** */
describe('<SearchContainer />', () => {
  /* ********************
      CHECK PROPTYPES
  ******************** */
  describe('Check PropTypes', () => {
    it('should not throw a warning', () => {
      const expectedProps = {
        users: [{ id_str: '0123456789' }],
        trends: [{ id_str: '1234567890' }],
        isOutside: false,
        getUsers: jest.fn(),
        getTrends: jest.fn(),
        startClickListen: jest.fn(),
        stopClickListen: jest.fn(),
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
        users: [{ id_str: '0123456789' }],
        trends: [{ id_str: '1234567890' }],
        isOutside: false,
        getUsers: jest.fn(),
        getTrends: jest.fn(),
        startClickListen: jest.fn(),
        stopClickListen: jest.fn(),

        history: [],
      };

      const { enzymeWrapper, props } = setUp(initialProps);

      wrapper = enzymeWrapper;
      passedProps = props;
    });

    /* ********************
           CONSTRUCTOR
    ******************** */
    describe('constructor()', () => {
      it('should set initial state and variables', () => {
        const expectedState = {
          input: '',
          isOpen: false,
        };

        expect(wrapper.state()).toEqual(expectedState);
        expect(wrapper.instance().timer).toBeDefined();
      });
    });

    /* ********************
      COMPONENT DID UPDATE
    ******************** */
    describe('componentDidUpdate()', () => {
      it('should alter state if props changed', () => {
        let prevProps = { isOutside: false };

        wrapper.setState({ isOpen: true });

        // Props did not change -> no state change
        wrapper.setProps(prevProps);
        wrapper.instance().componentDidUpdate(prevProps);
        expect(wrapper.state().isOpen).toBeTruthy();

        wrapper.setState({ isOpen: false });

        // Props did not change -> no state change
        wrapper.setProps(prevProps);
        wrapper.instance().componentDidUpdate(prevProps);
        expect(wrapper.state().isOpen).toBeFalsy();

        // Props changed -> state change
        wrapper.setProps({ isOutside: true });
        wrapper.instance().componentDidUpdate(prevProps);
        expect(wrapper.state().isOpen).toBeFalsy();

        prevProps = { isOutside: true };

        // Props changed -> state change
        wrapper.setProps({ isOutside: false });
        wrapper.instance().componentDidUpdate(prevProps);
        expect(wrapper.state().isOpen).toBeTruthy();
      });
    });

    /* ********************
          HANDLE OPEN
    ******************** */
    describe('handleOpen()', () => {
      it('should focus the <input />, set state, and start listening for click', () => {
        const input = (wrapper.instance().input = {
          focus: jest.fn(),
        });

        const focus = () => input.focus.mock.calls.length;
        const startClickListen = () =>
          passedProps.startClickListen.mock.calls.length;

        wrapper.setState({ isOpen: false });

        expect(focus()).toEqual(0);
        expect(wrapper.state().isOpen).toBeFalsy();
        expect(startClickListen()).toEqual(0);
        wrapper.instance().handleOpen();
        expect(focus()).toEqual(1);
        expect(wrapper.state().isOpen).toBeTruthy();
        expect(startClickListen()).toEqual(1);
      });
    });

    /* ********************
          HANDLE CLOSE
    ******************** */
    describe('handleClose()', () => {
      it('should unfocus the <input />, set state, and stop listening for click', () => {
        const input = (wrapper.instance().input = {
          blur: jest.fn(),
        });

        const blur = () => input.blur.mock.calls.length;
        const stopClickListen = () =>
          passedProps.stopClickListen.mock.calls.length;

        wrapper.setState({ isOpen: true });

        expect(blur()).toEqual(0);
        expect(wrapper.state().isOpen).toBeTruthy();
        expect(stopClickListen()).toEqual(0);
        wrapper.instance().handleClose();
        expect(blur()).toEqual(1);
        expect(wrapper.state().isOpen).toBeFalsy();
        expect(stopClickListen()).toEqual(1);
      });
    });

    /* ********************
          HANDLE INPUT
    ******************** */
    describe('handleInput()', () => {
      it('should clear prev timer, set state, and start new timer that calls getData()', () => {
        jest.useFakeTimers();

        const id = (wrapper.instance().timer = setTimeout(() => 'test', 99999));

        const getData = (wrapper.instance().getData = jest.fn());

        const e = {
          target: { value: 'test' },
        };

        wrapper.setState({ input: '' });

        expect(wrapper.state().input).toEqual('');
        wrapper.instance().handleInput(e);
        expect(clearTimeout).toHaveBeenCalledWith(id);
        expect(wrapper.state().input).toEqual(e.target.value);
        expect(wrapper.instance().timer).not.toEqual(id);
        expect(setTimeout).toHaveBeenCalledTimes(2); // Already called once above ^
        expect(setTimeout).toHaveBeenCalledWith(getData, 500);
      });
    });

    /* ********************
          CLEAR INPUT
    ******************** */
    describe('clearInput()', () => {
      it('should refocus <input />, clear users/trends props, and reset input state', () => {
        const input = (wrapper.instance().input = {
          focus: jest.fn(),
        });

        const focus = () => input.focus.mock.calls.length;
        const getUsers = () => passedProps.getUsers.mock.calls.length;
        const getTrends = () => passedProps.getTrends.mock.calls.length;

        wrapper.setState({ input: 'test' });

        expect(wrapper.state().input).toEqual('test');
        expect(focus()).toEqual(0);
        expect(getUsers()).toEqual(0);
        expect(getTrends()).toEqual(0);
        wrapper.instance().clearInput();
        expect(wrapper.state().input).toEqual('');
        expect(focus()).toEqual(1);
        expect(getUsers()).toEqual(1);
        expect(getTrends()).toEqual(1);
      });
    });

    /* ********************
           GET DATA
    ******************** */
    describe('getData()', () => {
      it('should call getUsers() and getTrends() with input from state', () => {
        const getUsers = passedProps.getUsers;
        const getTrends = passedProps.getTrends;

        const expectedInput = 'test';

        wrapper.setState({ input: expectedInput });

        wrapper.instance().getData();
        expect(getUsers).toHaveBeenCalledTimes(1);
        expect(getUsers).toHaveBeenCalledWith(expectedInput);
        expect(getTrends).toHaveBeenCalledTimes(1);
        expect(getTrends).toHaveBeenCalledWith(expectedInput);
      });
    });

    /* ********************
          HANDLE SUBMIT
    ******************** */
    describe('handleSubmit()', () => {
      it('should call preventDefault(), change url path if input, and call handleClose(); based on e', () => {
        const handleCloseMock = (wrapper.instance().handleClose = jest.fn());
        const expectedHistory = () => [
          `/search?q=${encodeURIComponent(expectedInput)}`,
        ];

        const preventDefault = () => e.preventDefault.mock.calls.length;
        const props = () => wrapper.instance().props;
        const handleClose = () => handleCloseMock.mock.calls.length;
        const reset = () => {
          wrapper.setState({ input: expectedInput });
          wrapper.setProps({ history: [] });
        };

        let expectedInput = 'test me';
        let e = {
          preventDefault: jest.fn(),
          keyCode: 13,
          shiftKey: false,
        };

        expect(handleClose()).toEqual(0);
        expect(preventDefault()).toEqual(0);

        // Passes conditional and changes url
        reset();
        wrapper.instance().handleSubmit(e);
        expect(preventDefault()).toEqual(1);
        expect(props().history).toEqual(expectedHistory());
        expect(handleClose()).toEqual(1);

        expectedInput = '';

        // Passes conditional but does not change url
        reset();
        wrapper.instance().handleSubmit(e);
        expect(preventDefault()).toEqual(2);
        expect(props().history).toEqual([]);
        expect(handleClose()).toEqual(2);

        e.keyCode = 12;

        // Does not pass conditional nor change url
        reset();
        wrapper.instance().handleSubmit(e);
        expect(preventDefault()).toEqual(2);
        expect(props().history).toEqual([]);
        expect(handleClose()).toEqual(2);

        e.shiftKey = true;

        // Does not pass conditional nor change url
        reset();
        wrapper.instance().handleSubmit(e);
        expect(preventDefault()).toEqual(2);
        expect(props().history).toEqual([]);
        expect(handleClose()).toEqual(2);

        e.keyCode = 13;

        // Does not pass conditional nor change url
        reset();
        wrapper.instance().handleSubmit(e);
        expect(preventDefault()).toEqual(2);
        expect(props().history).toEqual([]);
        expect(handleClose()).toEqual(2);
      });
    });

    /* ********************
       HANDLE DROP CLICK
    ******************** */
    describe('handleDropClick()', () => {
      it('should call clearInput() and handleClose()', () => {
        const clearInputMock = (wrapper.instance().clearInput = jest.fn());
        const handleCloseMock = (wrapper.instance().handleClose = jest.fn());

        const clearInput = () => clearInputMock.mock.calls.length;
        const handleClose = () => handleCloseMock.mock.calls.length;

        expect(clearInput()).toEqual(0);
        expect(handleClose()).toEqual(0);
        wrapper.instance().handleDropClick();
        expect(clearInput()).toEqual(1);
        expect(handleClose()).toEqual(1);
      });
    });

    /* ********************
             RENDER
    ******************** */
    describe('render()', () => {
      it('should render without errors', () => {
        expect(findByTestId(wrapper, 'SearchContainer').length).toEqual(1);
      });

      it('should render an <input /> with correct props', () => {
        const input = findByTestId(wrapper, 'input');
        const props = input.props();

        expect(input.length).toEqual(1);
        expect(props.onFocus).toEqual(wrapper.instance().handleOpen);
        expect(props.value).toEqual(wrapper.state().input);
        expect(props.onChange).toEqual(wrapper.instance().handleInput);
        expect(props.onKeyDown).toEqual(wrapper.instance().handleSubmit);
      });

      it('should render clear button based on props / with correct props', () => {
        const clearButton = () => findByTestId(wrapper, 'clear-button');

        // !isOpen && input.length === 0 -> no render
        wrapper.setState({ isOpen: false, input: '' });
        expect(clearButton().length).toEqual(0);

        // isOpen && input.length === 0 -> no render
        wrapper.setState({ isOpen: true });
        expect(clearButton().length).toEqual(0);

        // isOpen && input.length !== 0 -> render
        wrapper.setState({ input: 'test' });

        const props = clearButton().props();

        expect(clearButton().length).toEqual(1);
        expect(props.onClick).toEqual(wrapper.instance().clearInput);

        // !isOpen && input.length !== 0 -> no render
        wrapper.setState({ isOpen: false });
        expect(clearButton().length).toEqual(0);
      });

      it('should render <SearchDropdown /> based on props / with correct props', () => {
        const searchDropdown = () => findByTestId(wrapper, 'SearchDropdown');

        wrapper.setState({ isOpen: false });
        expect(searchDropdown().length).toEqual(0);

        wrapper.setState({ isOpen: true });

        const props = searchDropdown().props();

        expect(searchDropdown().length).toEqual(1);
        expect(props.users).toEqual(passedProps.users);
        expect(props.trends).toEqual(passedProps.trends);
        expect(props.handleClickSubmit).toEqual(
          wrapper.instance().handleDropClick,
        );
      });
    });
  });
});
