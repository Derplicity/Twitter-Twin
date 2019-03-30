import styled from 'styled-components';
import { globals, flexParent, flexChild } from './shared';

const Aside = styled.aside`
	${globals};
	${flexChild};
	${flexParent};

	flex-direction: column;
	width: 100%;
	background-color: rgb(21, 32, 43);
	margin-bottom: 8px;
`;

const Header = styled.div`
	${globals};
	${flexChild};
	${flexParent};

	width: 100%;
	height: 3em;
	border-bottom: 1px solid rgb(56, 68, 77);
	justify-content: space-between;
	align-items: center;
	padding: 0 10px;
`;

const Body = styled.div`
	${globals};
	${flexChild};
	${flexParent};

	width: 100%;
`;

const asideStyles = {
	Header,
	Body,
};

export default { ...Aside, ...asideStyles };
