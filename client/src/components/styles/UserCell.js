import styled from 'styled-components';
import { globals, flexParent, flexChild, interactive } from './shared';

const UserCell = styled.div`
	${globals};
	${flexParent};
	${flexChild};

	width: 100%;
	justify-content: center;
	align-items: center;
	flex-shrink: 0;
	flex-grow: 1;
	margin: 0 -5px;
`;

const Wrapper = styled.div`
	${globals};
	${flexParent};
	${flexChild};

	padding: 15px 10px;
	border-color: rgb(56, 68, 77);
	border-width: 0 0 1px;
	flex-shrink: 0;
	flex-grow: 1;
	width: 100%;
`;

const Image = styled.div`
	${globals};
	${flexParent};
	${flexChild};

	max-width: 49px;
	align-items: flex-start;
	flex-shrink: 0;
	flex-grow: 1;
	flex-basis: 0;
	margin: 0 5px;
`;

const Content = styled.div`
	${globals};
	${flexParent};
	${flexChild};

	justify-content: space-between;
	align-items: center;
	flex-shrink: 0;
	flex-grow: 4;
	flex-basis: 0;
	margin: 0 5px;
`;

const Header = styled.div`
	${globals};
	${flexParent};
	${flexChild};

	flex-direction: column;
	justify-content: center;
	max-width: 100%;
`;

const Button = styled.div`
	${globals};
	${flexParent};
	${flexChild};

	min-width: 80px;
	align-self: flex-start;
	margin-left: 10px;
`;

const Interactive = styled.div`
	${globals};
	${interactive};
	transition-property: background-color;

	&:hover {
		background-color: ${props =>
			props.transitionto === 'blueGrey__light'
				? 'rgb(24, 36, 48)'
				: props.transitionto === 'blueGrey__lighter'
				? 'rgba(29, 161, 242, 0.1)'
				: null};
	}
`;

const userCellStyles = {
	Wrapper,
	Image,
	Content,
	Header,
	Button,
	Interactive,
};

export default { ...UserCell, ...userCellStyles };
