import React, { Component } from 'react';
import './App.css';
import Game from './GameComponents/Game';
import Chat from './ChatComponents/Chat';
import { socketConnect } from 'socket.io-react';

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

export default socketConnect(App);
