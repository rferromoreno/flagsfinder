import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dirty: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    if (this.state.dirty) // nothing to do, button already clicked.
      return ;
    
    let { row, column } = this.props;
    this.props.socket.emit('message', { row, column });
    this.setState({dirty: true});
  }

  render() {
    return (
      <button className="square" onClick={this.handleClick}>
        {this.props.value}
      </button>
    )
  }
}

export default socketConnect(Cell);