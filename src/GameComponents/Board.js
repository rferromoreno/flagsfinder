import React, { Component } from 'react';
import Cell from './Cell';
import Status from './Status';
import { socketConnect } from 'socket.io-react';

class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cells: Array(9).fill('').map(()=>Array(9).fill('')),
      turn: false
    };
    this.props.socket.on('message', (payload) => {
      console.log("Recibiendo mensaje "+JSON.stringify(payload));
      this.updateCellInformation(payload);
    })
  }

  updateCellInformation = (payload) => {
    let { row, column, value, turn } = payload;
    let newState = this.state;
    newState.cells[row][column] = value;
    newState.turn = turn;
    this.setState(newState);
  }

  getCell = (row, column) => {
      return (<Cell key={column}
                    row={row} 
                    column={column} 
                    value={this.state.cells[row][column]} 
                    turn={this.state.turn}
                    room={this.props.room}
              />);
  }

  render() {
    let cellsArray = this.state.cells.map((item, row) => (
        <div key={row} className="board-row">
          {item.map((subitem, column) => this.getCell(row, column))}
        </div>
      )
    );

    return (
      <div>
        <Status turn={this.state.turn} />
        { cellsArray }
      </div>
    )
  }
}

export default socketConnect(Board);
