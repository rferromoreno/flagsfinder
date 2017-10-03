import React, { Component } from 'react';
import Board from './Board';
import Scores from './Scores';
import { Grid } from 'semantic-ui-react';
import { socketConnect } from 'socket.io-react';
import MessagesPanel from '../ChatComponents/MessagesPanel';
import { withRouter } from 'react-router-dom';

class Game extends Component {
	constructor(props) {
    super(props);
    console.log(props);
		this.state = {
      room: this.props.match.params.id,
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
    this.props.socket.on('room:full', this.redirectToIndex);
  }

  redirectToIndex = () => {
    this.props.history.push('/');
  }
  
  componentWillMount() {
    this.props.socket.emit('join', this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.socket.emit('leave', this.props.match.params.id);
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
						room={this.state.room}
						turn={this.state.turn}
						cells={this.state.cells}
					/>
				</Grid.Column>
				<MessagesPanel width={6} room={this.state.room} />
			</Grid>
		);
	}
}

export default withRouter(socketConnect(Game));
