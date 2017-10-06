import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Header from './shared/Header';
import Footer from './shared/Footer';
import ChatPage from './ChatComponents/Chat';
import GamePage from './GameComponents/Game';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

class App extends Component {
	render() {
		return (
			<div>
				<Header />
				<Container fluid style={{ marginTop: '3em' }}>
					<Switch>
						<Route exact path="/" component={ChatPage} />
						<Route path="/room/:id" component={GamePage} />
					</Switch>
				</Container>
				<Footer />
			</div>
		);
	}
}

export default App;

