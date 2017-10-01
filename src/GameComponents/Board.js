import React, { Component } from 'react';
import Cell from './Cell';
import Status from './Status';
import { socketConnect } from 'socket.io-react';
import { Grid, Segment } from 'semantic-ui-react';

class Board extends Component {
	getCell = (row, column) => {
		let { turn, room, cells, ended } = this.props;
		return (
			<Cell
				key={column}
				row={row}
				column={column}
				value={cells[row][column]}
				turn={turn}
				room={room}
				ended={ended}
			/>
		);
	};

	render() {
		let { cells, turn, ended } = this.props;
		let cellsArray = cells.map((item, row) => (
			<div key={row} className="board-row">
				{item.map((subitem, column) => this.getCell(row, column))}
			</div>
		));

		return (
			<Grid.Row stretched>
				<Segment>
					<Status turn={turn} ended={ended} />
				</Segment>
				<Segment textAlign='center'>{cellsArray}</Segment>
			</Grid.Row>
		);
	}
}

export default socketConnect(Board);
