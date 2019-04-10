import styled from 'styled-components';
import { globals, flexParent, flexChild, interactive } from './shared';
import Header from './Tweet.Header';

const Tweet = styled.article`
	${globals};
	${flexParent};
	flex-direction: column;
	padding: 1rem 10px;
	outline: none;
`;

const Wrapper = styled.div`
	${globals};
	border-color: rgb(56, 68, 77);
	border-width: 0 0 1px;
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

export const Aside = styled.div`
	${globals};
	${flexChild};
	${flexParent};
	flex-direction: column;
	max-width: 49px;
	margin: 0 5px;
	align-items: flex-end;
	flex-grow: 1;
	flex-shrink: 0;
	flex-basis: 0;
`;

export const Main = styled.div`
	${globals};
	${flexChild};
	${flexParent};
	flex-direction: column;
	margin: 0 5px;
	flex-grow: 7;
	flex-shrink: 0;
	flex-basis: 0;
`;

const Skeleton = styled.div`
	${globals};
	${flexChild};
	${flexParent};
	margin: 0 -5px;
`;

const Content = styled.div`
	${globals};
	${flexChild};
	${flexParent};
	flex-direction: column;
	margin-top: -1px;
`;

const Actions = styled.div`
	${globals};
	${flexChild};
	${flexParent};
	max-width: 345px;
	margin-top: 10px;
	margin-bottom: -5px;
	justify-content: space-between;
`;

const tweetStyles = {
	Wrapper,
	Header,
	Interactive,
	Aside,
	Main,
	Skeleton,
	Content,
	Actions,
};

export default { ...Tweet, ...tweetStyles };
