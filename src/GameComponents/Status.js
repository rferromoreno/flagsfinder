import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';

class Status extends Component {
 
  shouldComponentUpdate(nextProps, nextState) {
    // Only re-render when the turn changed or game ended
    return (nextProps.turn !== this.props.turn) || (nextProps.ended !== this.props.ended);
  }

  render() {
    if (this.props.ended) {
      return (
        <div>
          Game ended
        </div>
      )
    } else {
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
}

export default socketConnect(Status);