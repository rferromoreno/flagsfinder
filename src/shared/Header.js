import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

const HeaderComponent = () => (
	<Menu attached="top" inverted>
		<Container>
			<Menu.Item as="a" header>
				<Link to="/">FlagsFinder</Link>
			</Menu.Item>
			<Menu.Item as="a">
				<a href="https://github.com/rferromoreno/flagsfinder">Source Code</a>
			</Menu.Item>
			<Menu.Item as="a">
				<Link to="/about">About</Link>
			</Menu.Item>
		</Container>
	</Menu>
);

export default HeaderComponent;
