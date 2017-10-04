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
		this.state = {
			room: this.props.match.params.id,
			roomJoined: false,
			cells: Array(9)
				.fill('')
				.map(() => Array(9).fill('')),
			turn: false,
			flagsLeft: null,
			playerOneScore: null,
			playerTwoScore: null,
			ended: false
		};
		this.props.socket.on('message', this.updateCellInformation);
		this.props.socket.on('status', this.updateStatusInformation);
		this.props.socket.on('room:full', this.redirectToIndex);
		this.props.socket.on('room:joined', this.setRoomJoined);
	}

	setRoomJoined = () => {
		this.setState({ roomJoined: true });
	};

	redirectToIndex = () => {
		this.props.history.push('/');
	};

	componentWillMount() {
		this.props.socket.emit('join', this.props.match.params.id);
	}

	componentWillUnmount() {
		this.props.socket.emit('leave', this.props.match.params.id);
	}

	updateCellInformation = payload => {
		let newState = this.state;
		let { row, column, value } = payload;
		newState.cells[row][column] = value;
		newState.turn = payload.turn;
		newState.playerOneScore = payload.playerOneScore;
		newState.playerTwoScore = payload.playerTwoScore;
		newState.flagsLeft = payload.flagsLeft;
		newState.ended = payload.ended;
		this.setState(newState);
	};

	updateStatusInformation = payload => {
		this.setState({ ...payload });
	};

	render() {
		if (!this.state.roomJoined) {
			return null;
		} else {
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
}

export default withRouter(socketConnect(Game));
