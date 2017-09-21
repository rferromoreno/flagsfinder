import React, { Component } from 'react';
import Cell from './Cell';

class Board extends Component {

  constructor() {
    super();
    this.state = {
      cells: Array(9).fill(0).map(()=>Array(9).fill(0))
    };
  }

  getCell = (id, row, column) => {
      return (<Cell key={id} row={row} column={column}/>);
  }

  render() {
    let cellsArray = this.state.cells.map((item, row) => (
        <div className="board-row">
          {item.map((subitem, column) => this.getCell(subitem.id, row, column))}
        </div>
      )
    );

    return (
      <div>
        { cellsArray }
      </div>
    )
  }
}

export default Board;
