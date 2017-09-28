import React, { Component } from 'react';
import Board from './Board';

class Game extends Component {

  render() {
    return (
      <Board room={this.props.room} />
    )
  }
}

export default Game;
