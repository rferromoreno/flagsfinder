import React, { Component } from 'react';
import Board from './Board';
import Scores from './Scores';
import { Grid } from 'semantic-ui-react';
import { socketConnect } from 'socket.io-react';
import MessagesPanel from '../ChatComponents/MessagesPanel';

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cells: Array(9)
				.fill('')
				.map(() => Array(9).fill('')),
			turn: false,
			flagsLeft: null,
			playerOneScore: null,
			playerTwoScore: null,
			ended: false
		};
		this.props.socket.on('message', payload => {
			console.log('Recibiendo mensaje ' + JSON.stringify(payload));
			this.updateCellInformation(payload);
		});
	}

	updateCellInformation = payload => {
		let { row, column } = payload;
		let newState = this.state;
		newState.cells[row][column] = payload.value;
		newState.turn = payload.turn;
		newState.playerOneScore = payload.playerOneScore;
		newState.playerTwoScore = payload.playerTwoScore;
		newState.flagsLeft = payload.flagsLeft;
		newState.ended = payload.ended;
		this.setState(newState);
	};

	render() {
		return (
			<Grid>
				<Grid.Column width={3}>
					<Scores
						playerOneScore={this.state.playerOneScore}
						playerTwoScore={this.state.playerTwoScore}
						flagsLeft={this.state.flagsLeft}
					/>
				</Grid.Column>
				<Grid.Column width={7}>
					<Board
						ended={this.state.ended}
						room={this.props.room}
						turn={this.state.turn}
						cells={this.state.cells}
					/>
				</Grid.Column>
				<MessagesPanel width={6} />
			</Grid>
		);
	}
}

export default socketConnect(Game);
