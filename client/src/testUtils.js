export const findByTestId = (component, id) => {
	return component.find(`[data-testId='${id}']`);
};
