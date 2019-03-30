import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NavItem from './NavItem';
import NavDropdown from './NavDropdown';
import SearchDropdown from './SearchDropdown';
import Loading from './Loading';

import {
	NavbarWrapper,
	NavbarNav,
	SearchForm,
	Search,
	SearchBox,
	SearchClear,
} from '../styled-components';

const Navbar = ({
	user,
	search,
	handleSearchInput,
	handleSearchSubmit,
	clearSearchInput,
	isDropped,
	handleDrop,
	setNode,
	handleClickSubmit,
}) => (
	<NavbarWrapper role='navigation'>
		<NavbarNav left>
			<NavItem exact={true} to='/home'>
				<FontAwesomeIcon icon={['fas', 'home']} />
			</NavItem>
			<NavItem exact={false} to='/explore'>
				<FontAwesomeIcon icon={['fas', 'hashtag']} />
			</NavItem>
			<NavItem exact={false} to='/notifications'>
				<FontAwesomeIcon icon={['fas', 'bell']} />
			</NavItem>
			<NavItem exact={false} to='/messages'>
				<FontAwesomeIcon icon={['fas', 'envelope']} />
			</NavItem>
		</NavbarNav>
		<SearchForm
			id='search-form'
			role='search'
			autoComplete='off'
			ref={node => setNode(node)}
		>
			<Search>
				<SearchBox
					id='searchInput'
					onFocus={handleDrop}
					type='text'
					name='search'
					placeholder='Search Twitter'
					value={search.input}
					onChange={handleSearchInput}
					onKeyDown={handleSearchSubmit}
					autoComplete='off'
				/>
				<FontAwesomeIcon icon={['fas', 'search']} />
				{isDropped && search.input !== '' ? (
					<SearchClear role='button' onClick={clearSearchInput}>
						<FontAwesomeIcon icon={['fas', 'times-circle']} />
					</SearchClear>
				) : null}
				{isDropped ? (
					<SearchDropdown
						users={search.users}
						trends={search.trends}
						handleClickSubmit={handleClickSubmit}
					/>
				) : null}
			</Search>
		</SearchForm>
		<NavbarNav right>
			{user ? <NavDropdown user={user} /> : <Loading />}
		</NavbarNav>
	</NavbarWrapper>
);

Navbar.propTypes = {
	user: PropTypes.object,
	search: PropTypes.object.isRequired,
	handleSearchInput: PropTypes.func.isRequired,
	handleSearchSubmit: PropTypes.func.isRequired,
};

export default Navbar;
