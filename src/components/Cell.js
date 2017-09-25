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

    if (this.props.turn !== this.props.socket.id)
      return ;  // not your turn, sorry.

    if (this.state.dirty) 
      return ;  // nothing to do, button already clicked.
    
    this.setState({dirty: true}, () => {
      let { row, column } = this.props;
      this.props.socket.emit('message', { row, column });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({dirty: true});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Only re-render when the value changed. Not when turn changes
    return nextProps.value !== this.props.value;
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