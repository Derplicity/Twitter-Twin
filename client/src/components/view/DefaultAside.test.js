import React from 'react';
import { shallow } from 'enzyme';
import { checkProps, findByTestId } from '../../testUtils';

import { DefaultAsideView as Component } from './DefaultAside';

const setUp = (props = {}) => {
  const enzymeWrapper = shallow(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
   DEFAULT ASIDE VIEW
******************** */
describe('<DefaultAsideView />', () => {
  /* ********************
      CHECK PROPTYPES
  ******************** */
  describe('Check PropTypes', () => {
    it('should not throw a warning', () => {
      const expectedProps = {
        suggested_users: [{ id: '0123456789' }],
        getSuggestedUsers: jest.fn(),
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
        suggested_users: [],
        getSuggestedUsers: jest.fn(),
      };

      const { enzymeWrapper, props } = setUp(initialProps);

      wrapper = enzymeWrapper;
      passedProps = props;
    });

    /* ********************
      COMPONENT DID MOUNT
    ******************** */
    describe('componenDidMount()', () => {
      it('should call getSuggestedUsers()', () => {
        const getSuggestedUsers = () =>
          passedProps.getSuggestedUsers.mock.calls.length;

        // Already called when shallow render was created
        expect(getSuggestedUsers()).toEqual(1);
        wrapper.instance().componentDidMount();
        expect(getSuggestedUsers()).toEqual(2);
      });
    });

    /* ********************
            RENDER
    ******************** */
    describe('render()', () => {
      it('should render without errors', () => {
        expect(findByTestId(wrapper, 'DefaultAsideView').length).toEqual(1);
      });

      it('should render <UserListContainer /> based on props', () => {
        const userList = () => findByTestId(wrapper, 'UserListContainer');

        // suggested_users.length === 0 -> no render
        expect(userList().length).toEqual(0);

        // suggested_users.length !== 0 -> render
        wrapper.setProps({ suggested_users: [{ id: '0123456789' }] });
        expect(userList().length).toEqual(1);
      });
    });
  });
});
