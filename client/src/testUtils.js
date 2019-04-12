import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import checkPropTypes from 'check-prop-types';

export const mockStore = configureMockStore([thunk]);

export const findByTestId = (component, id) => {
  return component.find(`[data-testid='${id}']`);
};

export const checkProps = (component, expectedProps) => {
  return checkPropTypes(
    component.propTypes,
    expectedProps,
    'props',
    component.name,
  );
};
