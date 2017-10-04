import React, { Component } from 'react';
import Cell from './Cell';
import Status from './Status';
import { socketConnect } from 'socket.io-react';
import { Grid, Segment, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class Board extends Component {
	constructor(props) {
		super(props);
		this.getCell = this.getCell.bind(this);
		this.redirectToIndex = this.redirectToIndex.bind(this);
	}

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

	redirectToIndex = e => {
		e.preventDefault();
		this.props.history.push('/');
	};

	render() {
		let { cells, turn, ended } = this.props;
		let cellsArray = cells.map((item, row) => (
			<div key={row} className="board-row">
				{item.map((subitem, column) => this.getCell(row, column))}
			</div>
		));

		return (
			<Grid.Row>
				<Segment>
					<Status turn={turn} ended={ended} socketId={this.props.socket.id}/>
				</Segment>
				<Segment textAlign="center">{cellsArray}</Segment>
				{ended && (
					<Segment textAlign="center">
						<Button fluid onClick={this.redirectToIndex}>
							Go back to lobby
						</Button>
					</Segment>
				)}
			</Grid.Row>
		);
	}
}

export default withRouter(socketConnect(Board));
