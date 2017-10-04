import React, { Component } from 'react';

class Status extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		// Only re-render when the turn changed or game ended
		return nextProps.turn !== this.props.turn || nextProps.ended !== this.props.ended;
	}

	render() {
		let message;
		if (this.props.ended) {
			message = 'Game ended';
		} else if (this.props.turn === null) {
			message = 'Waiting for an opponent';
		} else if (this.props.turn === this.props.socketId) {
			message = 'Your turn';
		} else {
			message = "Opponent's turn";
		}
		return <div>{message}</div>;
	}
}

export default Status;
