import React, { Component } from 'react';

class Cell extends Component {
  constructor() {
    super();
    this.state = {
      dirty: false,
      value: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    if (this.state.dirty) // nothing to do, button already clicked.
      return ;
    
    this.setState({dirty: true, value: 'X'});
  }

  render() {
    return (
      <button className="square" onClick={this.handleClick}>
        {this.state.value}
      </button>
    )
  }
}

export default Cell;