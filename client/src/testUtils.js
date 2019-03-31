import checkPropTypes from 'check-prop-types';

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
