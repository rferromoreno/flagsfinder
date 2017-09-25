import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';

class Status extends Component {
 
  shouldComponentUpdate(nextProps, nextState) {
    // Only re-render when the turn changed. 
    return nextProps.turn !== this.props.turn;
  }

  render() {
    return (
      <div>
        {
          this.props.turn === this.props.socket.id ?
          "Your turn" :
          "Opponent's turn"
        }
      </div>
    )
  }
}

export default socketConnect(Status);