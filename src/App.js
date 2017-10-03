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

/*
class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      playing: false,
      room: null
    }
    this.setGame=this.setGame.bind(this);
    this.props.socket.on('game:created:ok', (payload) => {
      this.setState({
        playing: true,
        room: payload.room    
      });
    });
  }

  setGame() {
    this.props.socket.emit('game:create', this.props.socket.id);
  }

  render() {
    return (
      <div className="App">
      {
        this.state.playing ?
         <Game room={this.state.room}/> :
         <Chat setGame={this.setGame}/>
      }
      </div>
    );
  }
}
*/
