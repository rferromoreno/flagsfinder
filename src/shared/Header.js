import React from 'react';
import { Container, Menu } from 'semantic-ui-react';

const HeaderComponent = () => (
	<Menu attached="top" inverted>
		<Container>
			<Menu.Item as="a" header>
				FlagsFinder
			</Menu.Item>
			<Menu.Item as="a">
				<a href="https://github.com/rferromoreno/flagsfinder">Source Code</a>
			</Menu.Item>
		</Container>
	</Menu>
);

export default HeaderComponent;
