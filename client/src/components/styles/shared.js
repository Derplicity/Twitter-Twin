import { css } from 'styled-components';

export const globals = css`
	display: block;
	position: relative;
	min-width: 0;
	min-height: 0;
	background-color: rgba(0, 0, 0, 0);
	background-image: none;
	background-repeat: no-repeat;
	background-position: center center;
	border-color: rgba(0, 0, 0, 0);
	border-style: solid;
	border-width: 0;
	border-radius: 0;
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
		Ubuntu, 'Helvetica Neue', sans-serif;
	font-size: 15px;
	font-style: normal;
	font-weight: 400;
	color: rgb(255, 255, 255);
	line-height: 1.3125;
	letter-spacing: normal;
	text-decoration: none;
	text-transformation: none;
	text-align: left;
	list-style: none;
	pointer-events: none;

	&:hover {
		text-decoration: none;
	}
`;

export const flexParent = css`
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: stretch;
	align-content: stretch;
`;

export const flexChild = css`
	order: 0;
	flex-grow: 0;
	flex-shrink: 1;
	flex-basis: auto;
`;

export const interactive = css`
	cursor: pointer;
	pointer-events: auto;
	transition-property: none;
	transition-duration: 0.2s;
`;
