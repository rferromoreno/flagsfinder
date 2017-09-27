import React, { Component } from 'react';
import './App.css';
import Game from './GameComponents/Game';
import Chat from './ChatComponents/Chat';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      playing: false
    }
  }

  render() {
    return (
      <div className="App">
      {
        this.state.playing ?
         <Game/> :
         <Chat/>
      }
      </div>
    );
  }
}

export default App;
