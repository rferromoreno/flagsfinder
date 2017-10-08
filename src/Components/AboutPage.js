import React from 'react';
import { Container, Divider, Header, List } from 'semantic-ui-react';

const AboutPage = props => (
	<Container text style={{ marginTop: '2em' }}>
		<Header as="h1">About</Header>
		<Divider />
		<Header as="h2">Game Rules</Header>
		<p>
			<List bulleted>
				<List.Item>
					There are 11 flags over a 9x9 board, represented as the letter "<strong>F</strong>".{' '}
				</List.Item>
				<List.Item>The objective of the game is finding the most of them (i.e. 6 flags). </List.Item>
				<List.Item>To make a move, just click on a blank cell. </List.Item>
				<List.Item>If you find a flag, then you can play again. Else, it's your oppponent's turn. </List.Item>
				<List.Item>
					If you don't find a flag, a number will be shown on the cell. The number represents the count of
					flags on adjacent cells.{' '}
				</List.Item>
			</List>
		</p>
		<p>Enjoy, and have fun :)</p>
		<Divider />
		<Header as="h2">What is this?</Header>
		<p>
			This project was made for the course "Ingeniería de Aplicaciones Web" at Universidad Nacional del Sur, as a
			final project.
		</p>
		<p>
			Comments, pull requests, or any type of issues are welcome. Please, visit
			<a href="https://github.com/rferromoreno/flagsfinder">the repository page on GitHub</a>.
		</p>
	</Container>
);

export default AboutPage;
